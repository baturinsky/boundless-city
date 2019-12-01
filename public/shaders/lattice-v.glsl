#version 300 es
precision highp float;

const vec3 normals[6] = vec3[](vec3(1,0,0), vec3(-1,0,0), vec3(0,1,0), vec3(0,-1,0), vec3(0,0,1), vec3(0,0,-1));
const vec2 uv[4] = vec2[](vec2(0,0), vec2(0,1), vec2(1,1), vec2(1,0));
const vec3 fullScreenQuad[6] = vec3[](vec3(-1, -1, 0), vec3(1, -1, 0), vec3(-1, 1, 0), vec3(-1, 1, 0), vec3(1, -1, 0), vec3(1, 1, 0));
const uint u255 = uint(255);

const vec3 quad[6] = vec3[](vec3(0, 0, 0), vec3(1, 0, 0), vec3(0, 1, 0), vec3(1, 0, 0), vec3(1, 1, 0), vec3(0, 1, 0));

struct Light{
  vec3 pos;
  vec4 color;
};

uniform Light u_light[1];

uniform mat4 u_worldViewProjection;

uniform vec4 u_lightColor;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;
uniform float u_time;
uniform float u_resolution;
uniform float u_scale;

out vec4 v_position;
out vec3 v_normal;
out vec4 v_color;
out vec2 v_uv;
out vec3 v_texcoord; 

void main() {  
  float id = float(gl_VertexID);
  vec3 tp = quad[int(mod(id, 6.))];
  
  float qId = floor(id / 6.);
  float axisId = mod(qId, 3.);
  float planeId = floor(qId / 3.0);

  tp.z = planeId / u_resolution;

  vec3 position = u_scale * mix(tp.zxy, mix(tp.yzx, tp.xyz, step(1.5, axisId)), step(0.5, axisId));
  vec3 normal = normals[int(axisId)*2];

  v_texcoord = position;

  vec4 a_position = vec4(position, 1);
  
  v_normal = normalize((u_world * vec4(normal, 0)).xyz);
  //v_normal = normal;
  gl_Position = u_worldViewProjection * a_position;
}
