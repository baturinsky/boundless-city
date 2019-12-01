#version 300 es

precision highp float;
precision mediump sampler3D;

in vec2 v_texCoord; 

uniform mat4 u_raycastProjection;
uniform vec3 u_toSun;

layout(location=0) out vec4 outColor;
layout(location=1) out vec3 outNormal;

vec3 skyColor(vec3 ray){
  vec3 color = (ray + 1.) * (dot(ray, u_toSun)>0.999?10.:1.);
  float aVer = degrees(atan(ray.x, ray.y));
  float aHor = degrees(atan(ray.z, length(ray.xy)));
  color *= mod(aVer, 10.) < 0.1?1.5:1.;
  color *= mod(aHor, 10.) < 0.1?1.5:1.;
  color *= mod(aVer, 5.) < 0.1?1.5:1.;
  color *= mod(aHor, 5.) < 0.1?1.5:1.;
  color *= mod(aVer, .5) < 0.05?1.5:1.;
  color *= mod(aHor, .5) < 0.05?1.5:1.;
  return color;
}

void main() {  
  vec4 screenPos = vec4(v_texCoord.x * 2. - 1., v_texCoord.y * 2. - 1., 0., 1.);
  vec3 ray = normalize((u_raycastProjection * screenPos).xyz);  

  outColor = vec4(skyColor(ray), 1.) * 0.3;
  outNormal = vec3(0.);

  gl_FragDepth = 0.999999;
}