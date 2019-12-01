import * as twgl from "./twgl/twgl-full.js";
import { v3 } from "./twgl/twgl-full.js";
import { NormalVectors, VoxBox } from "./vox.js";

export function calculateNormals(arrays: { indices; position; normals }) {
  let normals = new Float32Array(arrays.position.length);
  for (let i = 0; i < arrays.indices.length; i += 3) {
    let dots = [0, 1, 2].map(n =>
      arrays.position.slice(
        arrays.indices[i + n] * 3,
        arrays.indices[i + n] * 3 + 3
      )
    );
    let normal = v3.normalize(
      v3.cross(v3.subtract(dots[1], dots[0]), v3.subtract(dots[2], dots[0]))
    );
    for (let n = 0; n < 3; n++)
      for (let m = 0; m < 3; m++)
        normals[arrays.indices[i + n] * 3 + m] = normal[m];
  }

  arrays.normals = normals;
}

export function randomTexture(gl: WebGL2RenderingContext, size: number) {
  const tex = twgl.createTexture(gl, {
    min: gl.NEAREST,
    mag: gl.NEAREST,
    src: [].concat(
      ...[...Array(size)].map((_, i) => [
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255,
        255
      ])
    )
  });
  return tex;
}

export function abr(object:Object){
  let abrs = {}
  let keys = Object.getOwnPropertyNames(object.constructor.prototype);
  return (key:string) => {
    let reg = new RegExp(`^${key.replace(/_/g, ".*")}$`) 
    if(!abrs[key] && !object.constructor[key]){
      abrs[key] = keys.find(n => reg.test(n))
    }
    return Object.bind(object, object[key] || object[abrs[key]])
  }
}

export class OldVoxBody {
  group = 0;

  constructor(public box: VoxBox) {}

  verticesNumber = 0;
  vertices: Int32Array[] = [];
  triangles: Int32Array[] = [];
  normals: Int32Array[] = [];

  arrays(box: VoxBox) {
    return {
      position: [...new Array(this.vertices.length * 3)].map(
        (v, k) => this.vertices[Math.floor(k / 3)][k % 3]
      ),
      color: [...new Array(this.vertices.length)].map(
        (v, k) => box.palette[this.triangles[Math.floor(k / 2)][3]]
      ),
      normals: [...new Array(this.normals.length * 3)].map(
        (v, k) => this.normals[Math.floor(k / 3)][k % 3]
      ),
      indices: [...new Array(this.triangles.length * 3)].map(
        (v, k) => this.triangles[Math.floor(k / 3)][k % 3]
      )
    };
  }

  addVertice(v: Int32Array, normalInd: number) {
    let normalVec = NormalVectors[normalInd];

    this.vertices.push(v);
    this.normals.push(normalVec);
    let ind = this.verticesNumber;
    this.verticesNumber++;
    return ind;
  }

  addTriangle(vertices: [number, number, number, number]) {
    this.triangles.push(new Int32Array(vertices));
  }

  addQuad(
    cornerInd: number,
    quadNormal: number,
    sizes: number[],
    color: number
  ) {
    let corner = this.box.cellCoords(cornerInd);

    if (quadNormal % 2) {
      let normalVector = NormalVectors[quadNormal];
      corner = corner.map((c, i) => c + normalVector[i]);
    }

    let quadAxes = [
      ((quadNormal - (quadNormal % 2) + 2) % 6) + 1,
      ((quadNormal - (quadNormal % 2) + 4) % 6) + 1
    ].map(v => NormalVectors[v]);

    let vertices = [0, 1, 2, 3].map(vi =>
      corner.map(
        (r, i) =>
          r +
          (vi & 1 ? quadAxes[0][i] * sizes[0] : 0) +
          (vi & 2 ? quadAxes[1][i] * sizes[1] : 0)
      )
    ).map(v => this.addVertice(v, quadNormal));

    let [v1, v2, v4, v3] = vertices;

    if (quadNormal % 2 == 0) {
      [v2, v4] = [v4, v2];
    }

    this.addTriangle([v2, v3, v1, color]);
    this.addTriangle([v4, v1, v3, color]);
  }
}

export function checkFramebufferStatus(gl:WebGLRenderingContext, target = gl.FRAMEBUFFER){
  let status = gl.checkFramebufferStatus(target);
  for(let s of [ 
  "FRAMEBUFFER_COMPLETE",
  "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
  "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
  "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
  "FRAMEBUFFER_UNSUPPORTED",
  "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE",
  "RENDERBUFFER_SAMPLES"]){
    if(gl[s] == status)
      return s;
  }
  return "UNKNOWN";
};

/*
export class VoxArrays {
  position = [] as number[];
  color = [] as number[];
  normals = [] as number[];
  indices = [] as number[];

  constructor(o?) {
    if (o) Object.assign(this, o);
  }

  concat(a: VoxArraysData, transformPosition?: (vec: number[]) => number[]) {
    let ind = this.position.length / 3;
    let position = transformPosition
      ? [...new Array(a.position.length / 3)]
          .map((v, i) => transformPosition(a.position.slice(i * 3, i * 3 + 3)))
          .flat()
      : a.position;
    this.position = this.position.concat(position);
    this.color = this.color.concat(a.color);
    this.normals = this.normals.concat(a.normals);
    this.indices = this.indices.concat(a.indices.map(n => n + ind));
    return this;
  }
}

*/


/*
mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
		oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
		0.0,                                0.0,                                0.0,                                1.0
	);
}


*/

/*
  console.log(
    "status",
    twgl.glEnumToString(gl, gl.checkFramebufferStatus(gl.FRAMEBUFFER))
  );

*/