export type V2 = [number, number];

export function round(v: V2): V2 {
  return [Math.round(v[0]), Math.round(v[1])];
}

export function pretty(v: V2): string {
  return v.join(",");
}

export function sum(a: V2, b: V2, m = 1): V2 {
  return [a[0] + b[0] * m, a[1] + b[1] * m];
}

export function sub(a: V2, b: V2): V2 {
  return [a[0] - b[0], a[1] - b[1]];
}

export function mul(a: V2, b: V2, m = 1): V2 {
  return [a[0] * b[0] * m, a[1] * b[1] * m];
}

export function inc(a: V2, b: V2, m = 1) {
  a[0] += b[0] * m;
  a[1] += b[1] * m;
}

export function length(d: V2) {
  return Math.sqrt(d[0] * d[0] + d[1] * d[1]);
}

export function norm(v: V2, scale:number = 1): V2 {
  let d = length(v) || 1;
  return [v[0] / d * scale, v[1] / d * scale];
}

export function dist(a: V2, b: V2): number {
  return length([a[0] - b[0], a[1] - b[1]]);
}

export function dot(a: V2, b: V2): number {
  return a[0] * b[0] + a[1] * b[1];
}

export function det(a: V2, b: V2): number {
  return a[0] * b[1] - a[1] * b[0];
}

export function rot(v: V2): V2 {
  return [v[1], -v[0]];
}

export function scale(v: V2, n: number): V2 {
  return [v[0] * n, v[1] * n];
}

export function along(start: V2, end: V2, step = 1) {
  let d = dist(start, end);
  let dots: V2[] = [];
  for (let i = 0; i <= d; i += step) {
    dots.push(lerp(start, end, i));
  }
  return dots;
}

export function lerp(start: V2, end: V2, amt: number): V2 {
  return [
    start[0] * (1 - amt) + amt * end[0],
    start[1] * (1 - amt) + amt * end[1]
  ];
}

/*export function angleBetween(a:V2, b:V2){
  let l = length(a) * length(b);
  if(!l)
    return 0;
  let d = Math.acos(dot(a, b) / l);
}*/

export function angleBetween(a:V2, b:V2){
  return Math.atan2(det(a,b), dot(a,b))
}

export function fromAngle(a: number): V2 {
  return [Math.cos(a), Math.sin(a)];
}

export function reflect(vel: V2, surface: V2) {
  let mn = norm(surface);
  let mr = rot(mn);
  let c1 = scale(mn, dot(vel, mn))
  let c2 = scale(mr, dot(vel, mr))
  return sub(c1, c2);
}

export function bounce(vel: V2, normal: V2): V2 {
  let surfaceAngle = Math.atan2(normal[1], normal[0]);
  let dropAngle = Math.atan2(vel[1], -vel[0]);
  let returnAngle = surfaceAngle * 2 + dropAngle + Math.PI;
  return fromAngle(returnAngle);
}

export function hitTestPipe(point: V2, prev: V2, next: V2, w: number) {
  let toNext = sub(next, prev);
  let toSide = rot(norm(toNext));
  let toA = sub(point, prev);
  let toNextL = length(toNext);
  let depth = dot(toNext, toA) / toNextL;
  let width = dot(toSide, toA);
  let inside = Math.abs(width) <= w && 0 <= depth && depth <= toNextL;
  return inside;
}

