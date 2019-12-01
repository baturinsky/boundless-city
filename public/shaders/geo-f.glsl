#version 300 es

precision highp float;
precision highp sampler3D;

uniform float u_resolution;
uniform float u_scale;
uniform float u_time;

uniform sampler3D u_noise;

in vec4 v_position;
in vec3 v_normal;
in vec4 v_color;
in vec2 v_uv;
in vec3 v_texcoord; 

layout(location=0) out vec4 outColor;
layout(location=1) out vec4 outNormal;

float rand(float n){return fract(sin(n) * 43758.5453123);}

float snoise(vec3 v){ 
  return texture(u_noise, v).r;
}

void main() {

  float scale =  u_scale / u_resolution;

  vec3 pos = v_texcoord / scale;

  /*if(sin((pos.x*23153.) + (pos.y*21711.) + (pos.z*31893.)+0.1) > -0.9){
    discard;
    return;
  }*/

  if(gl_FrontFacing)
    pos -= v_normal;

  float d = 0.001;
  vec3 ipos = vec3(floor(pos.x+d), floor(pos.y+d), floor(pos.z+d));
  //ipos = pos;

  ipos.z *= 1.5;

  //float simplex = snoise((ipos + vec3(.5) - vec3(0., 0., u_time * 10.)) * scale * 0.04);

  float simplex = snoise(ipos / 500. - vec3(0., 0., u_time * .1)) * scale;

  if(sin(simplex * 20.) * 0.2 - ipos.z * scale * 0.002 < -0.){
      discard;
  } else {
  //outColor = vec4(vec3(v_texcoord.z / u_scale), 1.);
  outColor = vec4(v_texcoord.zxy / u_scale * 2. - .6, 1.);
  outNormal = vec4(v_normal * 0.5 + 0.5, 1.);
  //outNormal = vec4(0., 0., 1., 1.);
  }    

  
}