import { cross, subtract, normalize } from "./twgl/v3";
import { loadText, loadBytes } from "./util";

let utf8 = new TextDecoder("utf-8");
const OVERHANG = 0.001;

type v3 = [number, number, number];

export enum Direction {
  Left = 0,
  Right = 1,
  Bottom = 2,
  Up = 3,
  Back = 4,
  Forward = 5
}

export let NormalVectors = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1]
].map(v => new Int32Array(v));

function verticeHash(v: Int32Array, normalInd: number): number {
  return v[0] + (v[1] << 10) + (v[2] << 20) + (normalInd << 30);
}

export type VoxArraysData = {
  vertices: Float32Array;
  triangles: Uint32Array;
  normals: Float32Array;
  colors: Int32Array;
};

export function quadsToArrays(
  quads: VoxQuad[],
  transform?: (quad: VoxQuad, vertice: v3) => v3
): VoxArraysData {
  let quadl = quads.length;

  let colors = new Int32Array(quadl * 4);
  let normals = new Float32Array(quadl * 12);
  let vertices = new Float32Array(quadl * 12);
  let triangles = new Uint32Array(quadl * 6);

  for (let quadi = 0; quadi < quadl; quadi++) {
    let quad = quads[quadi];
    let triInd = quadi * 4;

    let color = quad.color;

    colors.set([color, color, color, color], quadi * 4);

    triangles.set(
      [triInd, triInd + 1, triInd + 3, triInd + 2, triInd + 3, triInd + 1],
      quadi * 6
    );
    let quadVertices = transform
      ? quad.vertices.map(v => transform(quad, v))
      : quad.vertices;

    let normal = [
      ...normalize(
        cross(
          subtract(quadVertices[1], quadVertices[0]),
          subtract(quadVertices[3], quadVertices[0])
        )
      )
    ];

    normals.set([normal, normal, normal, normal].flat(), quadi * 12);

    vertices.set(quadVertices.flat(), quadi * 12);
  }

  return { vertices, triangles, normals, colors };
}

export type VoxQuad = {
  vertices: v3[];
  color: number;
};

export function createQuad(
  corner: v3,
  sizes: [number, number],
  normalInd: number,
  color: number
) {
  let quadAxes = [
    ((normalInd - (normalInd % 2) + 2) % 6) + 1,
    ((normalInd - (normalInd % 2) + 4) % 6) + 1
  ].map(v => NormalVectors[v]);

  let vertices: v3[] = [0, 1, 3, 2].map(
    vi =>
      corner.map(
        (r, i) =>
          r +
          quadAxes[0][i] * (vi & 1 ? OVERHANG + sizes[0] : -OVERHANG) +
          quadAxes[1][i] * (vi & 2 ? OVERHANG + sizes[1] : -OVERHANG)
      ) as v3
  );

  if (normalInd % 2 == 0) {
    [vertices[1], vertices[3]] = [vertices[3], vertices[1]];
  }

  return { vertices, color };
}

export class VoxBody {
  quads: VoxQuad[] = [];
  group = 0;

  constructor(public box: VoxBox) {}

  addQuad(
    cornerInd: number,
    normal: number,
    sizes: [number, number],
    color: number
  ) {
    let corner = this.box.cellCoords(cornerInd);

    if (normal % 2) {
      let normalVector = NormalVectors[normal];
      corner = corner.map((c, i) => c + normalVector[i]);
    }

    let argb = this.box.palette[color];

    this.quads.push(
      createQuad([corner[0], corner[1], corner[2]], sizes, normal, argb)
    );
  }
}

export class VoxBox {
  sizes = new Int32Array(3);
  palette!: Uint32Array;
  xyzi!: Uint8Array;
  bounds = new Int32Array(6);
  box!: Int32Array;
  neighbors!: Int32Array;
  groups!: Int32Array;
  groupsNumber = 0;
  byOne!: Int32Array;
  bodies: VoxBody[] = [];
  displacement!: Int32Array;

  cellCoords(c: number): Int32Array {
    let w = this.sizes[0];
    let wh = this.sizes[0] * this.sizes[1];
    let x = c % w;
    let y = ((c - x) % wh) / w;
    let z = Math.floor(c / wh);
    return new Int32Array([
      x + this.displacement[0],
      y + this.displacement[1],
      z + this.displacement[2]
    ]);
  }

  load(path: string): Promise<VoxBox> {
    return new Promise(resolve => {
      loadBytes(path).then(res => {
        readChunk(this, res, 8);
        let xyzi = this.xyzi;
        let l = xyzi.length;

        this.bounds[1] = this.sizes[0];
        this.bounds[3] = this.sizes[1];
        this.bounds[5] = this.sizes[2];

        let bounds = new Int32Array([1e6, -1e6, 1e6, -1e6, 1e6, -1e6]);
        this.bounds = bounds;

        for (let i = 0; i < l; i += 4) {
          let x = xyzi[i];
          let y = xyzi[i + 1];
          let z = xyzi[i + 2];
          bounds[0] = x < bounds[0] ? x : bounds[0];
          bounds[1] = x > bounds[1] ? x : bounds[1];
          bounds[2] = y < bounds[2] ? y : bounds[2];
          bounds[3] = y > bounds[3] ? y : bounds[3];
          bounds[4] = z < bounds[4] ? z : bounds[4];
          bounds[5] = z > bounds[5] ? z : bounds[5];
        }

        let displacement = new Int32Array([
          bounds[0] - 1,
          bounds[2] - 1,
          bounds[4] - 1
        ]);

        this.displacement = displacement;

        this.sizes = new Int32Array([
          bounds[1] - bounds[0] + 3,
          bounds[3] - bounds[2] + 3,
          bounds[5] - bounds[4] + 3
        ]);

        let box = (this.box = new Int32Array(
          this.sizes[0] * this.sizes[1] * this.sizes[2]
        ));
        this.box = box;

        let neighbors = new Int32Array(box.length);
        this.neighbors = neighbors;

        let w = this.sizes[0];
        let wh = this.sizes[0] * this.sizes[1];
        let whd = this.sizes[0] * this.sizes[1] * this.sizes[2];

        for (let i = 0; i < l; i += 4) {
          let x = xyzi[i] - displacement[0];
          let y = xyzi[i + 1] - displacement[1];
          let z = xyzi[i + 2] - displacement[2];
          box[x + y * w + z * wh] = xyzi[i + 3];
        }

        let groupAt = new Int32Array(box.length);
        let groupsNumber = 0;

        let byOne = new Int32Array([-1, 1, -w, w, -wh, wh]);
        let queue: number[] = [];

        let bodies = this.bodies;

        /*
        Floodfill same color. Todo:respect config
        */
        for (let root = 0; root < whd; root++) {
          if (box[root] && !groupAt[root]) {
            groupsNumber++;
            queue.push(root);
            let body = new VoxBody(this);
            bodies.push(body);
            body.group = groupsNumber;
            while (queue.length > 0) {
              let cell = queue.shift() as number;
              groupAt[cell] = groupsNumber;
              for (let axis = 0; axis < 6; axis++) {
                let neighbor = cell + byOne[axis];
                if (box[neighbor] /*== box[cell]*/) {
                  neighbors[cell] = neighbors[cell] | (1 << axis);
                  if (!groupAt[neighbor]) {
                    groupAt[neighbor] = groupAt[cell];
                    queue.push(neighbor);
                  }
                }
              }
            }
          }
        }

        for (let quadNormal = 0; quadNormal < 6; quadNormal++) {
          let quadAxes = [
            ((quadNormal - (quadNormal % 2) + 2) % 6) + 1,
            ((quadNormal - (quadNormal % 2) + 4) % 6) + 1
          ];
          let delta = quadAxes.map(n => byOne[n]);
          //console.log('a', quadNormal, delta, quadAxes.map(n=>NormalVectors[n]))
          for (let root = 0; root < whd; root++) {
            if (box[root] && (neighbors[root] & (1 << quadNormal)) == 0) {
              let blocked = [false, false];
              let sizes = [1, 1] as [number, number];
              let rootColor = box[root];
              let body = bodies[groupAt[root] - 1];
              while (!blocked[0] || !blocked[1]) {
                for (let axi = 0; axi < 2; axi++) {
                  if (!blocked[axi]) {
                    for (let i = 0; i < sizes[1 - axi]; i++) {
                      let c =
                        root + sizes[axi] * delta[axi] + i * delta[1 - axi];
                      if (
                        box[c] != rootColor ||
                        neighbors[c] & (1 << quadNormal)// || (sizes[axi] > sizes[1-axi]*4)
                      ) {
                        blocked[axi] = true;
                        break;
                      }
                    }
                    if (!blocked[axi]) sizes[axi]++;
                  }
                }
              }

              for (let i = 0; i < sizes[0]; i++)
                for (let j = 0; j < sizes[1]; j++) {
                  let c = root + i * delta[0] + j * delta[1];
                  neighbors[c] = neighbors[c] | (1 << quadNormal);
                }

              //console.log(this.palette[box[root]].toString(16))
              body.addQuad(root, quadNormal, sizes, box[root]);
            }
          }
        }

        this.groupsNumber = groupsNumber;

        this.groups = groupAt;

        //console.log(bodies[0]);
        //console.log(this);

        resolve(this);
      });
    });
  }

  get quads() {
    return this.bodies.map(b => b.quads).flat();
  }
}


export function readChunk(to:{sizes:Int32Array, palette:Uint32Array, xyzi:Uint8Array}, buf: ArrayBuffer, start: number) {
  let id = utf8.decode(new Uint8Array(buf, start, 4));
  let lengths = new Int32Array(buf, start + 4, 2);
  let chunkLength = lengths[0];
  let childLength = lengths[1];
  let dataStart = start + 12;
  let dataEnd = dataStart + chunkLength;
  let chunkEnd = dataEnd + childLength;
  //console.log(`${id} ${start}..${chunkEnd} ${chunkLength} ${childLength}`);
  switch (id) {
    case "SIZE":
      to.sizes = new Int32Array(buf, dataStart, chunkLength >> 2);
      break;
    case "RGBA":
      let rgba = new Uint8Array(buf, dataStart, chunkLength);
      to.palette = new Uint32Array(1 + (chunkLength >> 2));
      for (let i = 0; i < rgba.length; i += 4) {
        let c = (rgba[i] << 16) + (rgba[i + 1] << 8) + rgba[i + 2];
        to.palette[i / 4 + 1] = c;
      }
      break;
    case "XYZI":
      to.xyzi = new Uint8Array(buf, dataStart + 4, chunkLength - 4);
      break;
  }
  if (childLength > 0) {
    try {
      for (let i = dataEnd; i < chunkEnd; ) {
        i = readChunk(to, buf, i);
      }
    } catch (e) {
      console.warn(e);
    }
  }
  return chunkEnd;
}
