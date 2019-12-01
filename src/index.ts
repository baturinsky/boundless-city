import { canvas, prepareRender, blockSize } from "./render";
import Keyboard from "./Keyboard";
import { m4, v3 } from "./twgl/twgl-full";
import { Vec3 } from "./twgl/v3";
import zzfxInit from "./zzfx";
import { V2, length } from "./v2";
import { random, playFile } from "./util";

let volume = 1;
let zzfx: Function;
let upgradesDiv: HTMLElement;

let sfxDefs = {
  playerExplode: [1, 0.1, 0, 0.8, 0.05, 0.7, 4.6, 21.2, 0.4],
  explode: [3, 0.1, 1811, 0.8, 0.01, 1.9, 3, 0.5, 0.04],
  powerup: [1, 0.1, 240, 0.2, 0.85, 5.7, 0.8, 0, 0.77],
  shieldDest: [1, 0.1, 1750, 0.7, 0.05, 0.1, 1.8, 0.3, 0.18],
  blast: [1, 0.1, 5000, 1.7, 0.01, 0, 4, 0, 0.45],

  ponk: [0.5, 0.1, 1549, 0.1, 0, 0, 1.2, 48.9, 0.17],

  //UNUSED BUT COOL
  boom: [1, 0.1, 3000, 1.5, 0.01, 0, 4, 0, 0.48],
  rumble: [1, 0.1, 200, 0.7, 0.1, 0, 5, 0.1, 0.36],
  sad: [1, 0.1, 264, 1.1, 0.53, 0, 0, 0.1, 0.94],
  vwom: [1, 0.1, 1, 1, 0.11, 0, 0, 69.2, 0.95],
  pop: [1, 0.1, 21, 0.1, 0.46, 9, 0.1, 5.7, 0.12],
  swipe: [1, 0.1, 866, 0.1, 0.5, 0, 1.6, 0.4, 0.98],
  ow: [1, 0.1, 1682, 0.2, 0.66, 3, 0, 1.2, 0.69],
  wave: [1, 0.1, 1825, 1, 0.2, 0, 5, 0.2, 0.3],
  bobbleUp: [1, 0.1, 17, 1, 0.26, 0.2, 0.1, 8, 0.66]
};

function sfx(def: string) {
  if (!zzfx) zzfx = zzfxInit();
  zzfx(sfxDefs[def][0] * volume, ...sfxDefs[def].slice(1));
}

const possibleUpgrades: [string, number[]][] = [
  ["brake", [10]],
  ["boosts", [100, 200, 300, 400, 500]],
  ["boostMore", [100, 200, 300, 400, 500]],
  ["clasterFaster", [100, 200, 500, 1000, 2000]],
  ["rewind", [100, 300, 500]],
  ["rewindCheckpoint", [1000]],
  ["pickup", [500]],
  ["friction", [100, 200, 500, 1000, 2000]],
  ["time", [100, 200, 500, 1000, 2000]]
  //["lane", [1000]]
];

const upgradeDescriptions = {
  brake: "Brake on <b>right mouse click</b>",
  boosts:
    "You can accelerate with <b>left mouse click</b> up to {0/1/2/3/4/5} times per checkpoint.",
  boostMore: "You gain {0/25/50/75/100/125} more velocity when accelerating.",
  clasterFaster:
    "You gain {0/25/50/75/100/125} more velocity when collecting a cluster.",
  rewind:
    "You rewind back to previous checkpoint up to {0/1/2/3} times when crashing.",
  rewindCheckpoint: "You get 1 more rewind when reaching checkpoint.",
  pickup: "You can collect checkpoint from a longer distance",
  friction: "Air friction is reduced by {0/10%/20%/30%/40%/50%}",
  time:
    "Time limit for reaching checkpoint is increased by {0/10%/20%/30%/40%/50%}"
  //lane: "When you are in car lane, you are accelerated in the lane direction"
};

type State = {
  time: number;
  pos: Vec3;
  vel: number;
  rot: [number, number];
  smoothRot: [number, number];
};

const rad = Math.PI / 180;
const acc = 300;
const heightToSpeed = 0.3;
const friction = 0.03;
const orbSpeedBonus = 10;
const minimumVelocity = 10;
const accPerClick = 30;
const slowPerClick = 30;

let frame = 0;
let lastTime = 0;
let dir: Vec3 = [1, 0, 0];
let mouseDelta = [0, 0];
let fps = 60;
let state: State;

let lsbs = localStorage["boundlessCity"];

let storage = lsbs
  ? JSON.parse(lsbs)
  : {
      upgrades: {},
      coins: 100,
      mute: false
    };

function save(bonusCoins = 0) {
  localStorage["boundlessCity"] = JSON.stringify({
    upgrades,
    mute,
    coins: coins + bonusCoins
  });
}

let upgrades = storage.upgrades as { [key: string]: number };
let coins = storage.coins;
let mute = !!storage.mute;

function initGame() {
  state = initState();
  let g = {
    time: 0,
    timeLeft: 40 * (1 + 0.1 * (upgrades.time || 0)),
    collected: new Uint8Array(1000),
    thisRunCoins: 0,
    boosts: upgrades.boosts || 0,
    lives: (upgrades.rewind || 0) + 1,
    previousCheckpoint: initState(),
    checkpoint: [20, 0, -3] as Vec3,
    checkpoints: 0,
    over: 0,
    state
  };
  return g;
}

let game = initGame();

function upgradeCost(upgrade: string) {
  let r =
    possibleUpgrades.find(u => u[0] == upgrade)[1][upgrades[upgrade] || 0] ||
    1e9;
  //console.log(upgrade, r);
  return r;
}

function initState(): State {
  return {
    pos: [0, 0, 0],
    vel: 50,
    time: 0,
    rot: [0, 0],
    smoothRot: [0, 0]
  };
}

function active() {
  return document.pointerLockElement == canvas && !gameOver();
}

const CRASH = 1;
const TIMEOUT = 2;

const gameOverReasons = [
  "",
  "You have crashed into something solid. Or something solid has crashed into you.",
  "You have run out of time. You remember that <span style='color:#0f0'>checkpoints</span> extend time, right?"
];

function gameOver() {
  return game.over;
}

function crash() {
  sfx("bobbleUp");
  if (game.lives > 1) {
    game.lives--;
    rewind();
  } else {
    endGame(CRASH);
  }
}

function endGame(reason: number) {
  game.over = reason;
  coins += game.thisRunCoins;
  save();
  updateUpgrades();
  pause();
}

function collectCluster(hash: number) {
  //console.log(orb);
  if (game.collected[hash]) return;
  sfx("ponk");
  game.thisRunCoins += game.checkpoints + 1;
  state.vel += orbSpeedBonus * (1 + 0.25 * (upgrades.clasterFaster || 0));
  if (hash >= 0) game.collected[hash] = 1;
  save(game.thisRunCoins);
}

function fract(n) {
  return n - Math.floor(n);
}

function hash(p: [number, number]) {
  return fract(
    1e4 *
      Math.sin(17.0 * p[0] + p[1] * 0.1) *
      (0.1 + Math.abs(Math.sin(p[1] * 13.0 + p[0])))
  );
}

function remember() {
  game.previousCheckpoint = JSON.parse(JSON.stringify(state));
  game.previousCheckpoint.pos = v3
    .copy(game.checkpoint)
    .map(v => v * blockSize);
  console.log(game.previousCheckpoint);
}

function rewind() {
  Object.assign(state, JSON.parse(JSON.stringify(game.previousCheckpoint)));
  state.vel = Math.min(state.vel, 30);
  game.boosts = upgrades.boosts || 0;
  mouseDelta = [0, 0];
}

function highlightCurrentLevel(s: string, level: number) {
  s = s.replace(/\{(.*)\}/, v => {
    let vv = v.substr(1, v.length - 2).split("/");
    vv[level] = `<b style="color:white">` + vv[level] + "</b>";
    return `<span style="color:#bbb">` + vv.join("/") + "</span>";
  });
  return s;
}

function pause() {
  document.exitPointerLock();
}

function unpause() {
  canvas.requestPointerLock();
}

function collectCheckpoint() {
  sfx("powerup");
  game.checkpoints++;
  game.boosts = upgrades.boosts || 0;
  if (upgrades.rewindCheckpoint) {
    game.lives = Math.min(game.lives + 1, (upgrades.rewind || 0) + 1);
  }
  game.timeLeft += 20 * (1 + 0.1 * (upgrades.time || 0));

  let r = random(frame + v3.length(game.checkpoint));
  remember();
  let normHorDir = v3.normalize([dir[0], dir[1], 0]);
  let shift = [r(), r(), r()].map(
    (v, i) =>
      Math.floor(
        (v % 1500) / 100 -
          10 +
          (i == 2 ? -3 + game.checkpoints : normHorDir[i] * 30)
      ) *
      (1 + 0.2 * game.checkpoints)
  ) as Vec3;
  game.checkpoint = v3.add(shift, game.checkpoint).map(n => Math.floor(n));
}

function toggleMusic(){
  mute = !mute;
  if (!music) return;
  if (mute) {
    music.context.suspend();
  } else {
    music.context.resume();
  }
  save();
}

function updateUpgrades() {
  upgradesDiv.innerHTML =
    `
  <div>Level</div><div>Cost</div><div> </div><div>Upgrade</div>
  ` +
    possibleUpgrades
      .map(
        u =>
          `<div>${upgrades[u[0]] || 0}/${u[1].length}</div><div>${u[1][
            upgrades[u[0]] || 0
          ] || "MAX"}</div>      
    <button ${upgradeCost(u[0]) > coins ? "disabled" : ""} onclick="buy('${
            u[0]
          }')">Buy!</button>
    <div style="text-align: left;">${highlightCurrentLevel(
      upgradeDescriptions[u[0]],
      upgrades[u[0]] || 0
    )}</div>`
      )
      .join("") +
    `<div>Coins:</div><div class="coin">${coins}</div>
  `;
}

let loopId: number;
let music: {
  context: AudioContext;
  gain: GainNode;
};

window.onload = async e => {
  let renderHQ = await prepareRender(crash, collectCluster, 2);
  let renderLQ = await prepareRender(crash, collectCluster, 1);

  let render = renderHQ;

  let statsDiv = document.getElementById("stats");
  let orbsDiv = document.getElementById("orbs");
  let pauseDiv = document.getElementById("pause");
  let winDiv = document.getElementById("win");
  upgradesDiv = document.getElementById("upgrades");

  //<button ${upgradeCost(u[0]) > game.coins?"disabled":""}">Buy!</button>

  window["buy"] = (s: string) => {
    coins -= upgradeCost(s);
    upgrades[s] = (upgrades[s] || 0) + 1;
    save();
    updateUpgrades();
  };

  function restart() {
    game = initGame();
    renderFrame();
    runLoop();
  }

  window["restartGame"] = () => restart();

  //canvas.requestPointerLock();
  const keyboard = new Keyboard(document);

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.code == "Space") {
      if (!active()) unpause();
      else pause();
    }

    if (e.code == "KeyR") {
      restart();
      return;
    }

    if (e.code == "KeyP") {
      rewind();
      return;
    }

    if (e.code == "KeyQ") {
      render = render == renderHQ ? renderLQ : renderHQ;
      return;
    }

    if (e.code == "KeyM") {
      toggleMusic();
    }
  });

  canvas.addEventListener("mousedown", async e => {
    if (!music) {
      music = await playFile("/Boundless_City.mp3");
      if (mute) music.context.suspend();
    }
    if (!active()) canvas.requestPointerLock();
    else {
      if (e.button == 0 && game.boosts > 0) {
        game.boosts--;
        state.vel += accPerClick * (1 + (upgrades.boostMore || 0) * 0.25);
      }
      if (e.button == 2 && upgrades.brake) {
        state.vel = Math.max(state.vel - slowPerClick, minimumVelocity * 2);
      }
    }
  });

  canvas.addEventListener("mousemove", (e: MouseEvent) => {
    mouseDelta[0] += e.movementX;
    mouseDelta[1] += e.movementY;
  });

  restart();
  pause();

  updateUpgrades();

  function renderFrame() {
    render(
      state.time,
      state.pos,
      dir,
      game.collected,
      game.checkpoint,
      game.previousCheckpoint.pos.map(v => v / blockSize),
      music ? music.context.currentTime : 0
    );
  }

  function runLoop() {
    if (!loopId) loopId = window.requestAnimationFrame(loop);
  }

  function loop(frameTime: number) {
    loopId = 0;
    pauseDiv.style.visibility = !active() && !gameOver() ? "visible" : "hidden";
    frame++;

    winDiv.style.visibility = gameOver() ? "visible" : "hidden";
    if (gameOver()) {
      winDiv.innerHTML = `<h2>Run complete</h2> ${
        gameOverReasons[game.over]
      } <br/> You have collected <b>${
        game.thisRunCoins
      }</b> coins in <b>${Math.floor(
        state.time
      )} seconds!</b><br/><br/> <button onclick="restartGame()"><b>R</b>estart</button>`;
      return;
    }

    if (!active() && frame > 1) {
      runLoop();
      return;
    }

    let dTime = (frameTime - lastTime) / 1000;

    if (dTime > 0.1) dTime = 0.1;

    fps = fps * 0.99 + 0.01 / dTime;

    lastTime = frameTime;

    state.time += dTime;
    game.timeLeft -= dTime;

    if (game.timeLeft <= 0) {
      endGame(TIMEOUT);
      runLoop();
      return;
    }

    mouseDelta = mouseDelta.map(
      d => Math.sign(d) * Math.min(30, Math.abs(d) * dTime * 60)
    ) as V2;

    state.rot[0] = state.rot[0] - mouseDelta[0] * 0.1;
    state.rot[1] = Math.max(
      -89.999,
      Math.min(89.999, state.rot[1] - mouseDelta[1] * 0.1)
    );

    let turn = Math.min(1, dTime * 30);

    state.smoothRot = state.smoothRot.map(
      (prevSmooth, i) => prevSmooth * (1 - turn) + state.rot[i] * turn
    ) as V2;

    let [yaw, pitch] = state.smoothRot.map(v => v * rad);

    dir = v3.normalize([
      Math.cos(pitch) * Math.cos(yaw),
      Math.cos(pitch) * Math.sin(yaw),
      Math.sin(pitch)
    ]);

    mouseDelta = [0, 0];

    if (keyboard.pressed["KeyO"]) {
      state.vel += acc * dTime;
    }

    if (keyboard.pressed["KeyL"]) {
      state.vel = Math.max(0, state.vel - acc * dTime);
    }

    state.vel *= 1 - friction * (1 - (upgrades.friction || 0) * 0.1) * dTime;

    if (state.vel <= minimumVelocity) {
      let drop = minimumVelocity - state.vel / 100;
      state.pos[2] -= drop * heightToSpeed;
      state.vel += drop;
    }

    let delta = v3.mulScalar(dir, state.vel * dTime);
    state.vel -= delta[2] * heightToSpeed;
    state.pos = v3.add(state.pos, delta);
    if (frame % 5 == 0) {
      statsDiv.innerText = `Time: ${Math.floor(
        state.time
      )} Position: ${state.pos
        .map(n => Math.round(n))
        .join(",")} Velocity: ${Math.floor(state.vel)} FPS: ${Math.round(fps)}`;
      orbsDiv.innerHTML = `        
      <div>Coins: <span class="coin">${game.thisRunCoins}</span></div>
      <div>Mult.: <b>${game.checkpoints + 1}</b></div>
      <div>Lives: <b style="color:#0f0">${game.lives}</b></div>
      <div>Boosts: <b style="color:#f00">${game.boosts}</b></div>
      <div>Time: <b style="color:#8ff">${Math.floor(game.timeLeft)}</b></div>
      `;
    }

    if (
      v3.distance(game.checkpoint, v3.divScalar(state.pos, blockSize)) <
      1 * (1 + (upgrades.pickup || 0) * 2)
    ) {
      collectCheckpoint();
    }

    renderFrame();
    runLoop();
  }

  runLoop();
};
