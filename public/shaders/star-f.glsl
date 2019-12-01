#version 300 es
precision highp float;

in vec2 v_texCoord;
//in vec4 v_color;

layout(location=0) out vec4 outColor;
layout(location=1) out vec3 outNormal;

float rand(float n){return fract(sin(n) * 43758.5453123);}

void main() {
  //if(length(v_texCoord+vec2(0.5)) > 1.5){
  if(sin(v_texCoord.y * 200.) + sin(v_texCoord.x * 200.) > .0){
    discard;
    return;
  }
  //outColor = v_color;
  outColor = vec4(0., 1., 0., 1.);
  outNormal = vec3(0., 0., -1.);
  //gl_FragDepth = 0.99;
}