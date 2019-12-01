#version 300 es
precision highp float;

in vec4 position;

out vec4 v_position;
out vec2 v_uv;

void main() {
  gl_Position = position;
  v_uv = position.xy*0.5 + vec2(0.5);
}