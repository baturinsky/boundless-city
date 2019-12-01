#version 300 es
precision highp float;

const vec3 norm[6] = vec3[](vec3(1,0,0), vec3(-1,0,0), vec3(0,1,0), vec3(0,-1,0), vec3(0,0,1), vec3(0,0,-1));
const vec2 uv[6] = vec2[](vec2(0,0), vec2(0,1), vec2(1,1), vec2(0,0), vec2(1,1) ,vec2(1,0));
const uint u255 = uint(255);

uniform mat4 u_worldViewProjection;
//uniform float u_time;

in vec4 position;
//in uint color;

//out vec4 v_color;
out vec2 v_texCoord;

void main() {
  v_texCoord = uv[int(mod(float(gl_VertexID),6.))];
  vec4 v_position = u_worldViewProjection * position;
  //v_color = vec4(float((color>>16)&u255)/255., float((color>>8)&u255)/255., float(color&u255)/255., 1.0);
  gl_Position = v_position;
}
