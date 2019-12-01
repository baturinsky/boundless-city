#version 300 es
precision highp float;

const int r = 2;
const float rscale = 1.;
uniform sampler2D u_color;
uniform vec2 u_bufferSize;

in vec2 v_uv;

out vec4 outColor;

void main() {
  vec4 srcColor = texture(u_color, v_uv);
  vec3 color = pow(srcColor.xyz, vec3(1.0/2.2) );
  if(length(color) > 2.){
    color /= pow(length(color), 0.4);
  }
  outColor = vec4(color, 1.);
  gl_FragDepth = 0.01;
}

