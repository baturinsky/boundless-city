#version 300 es
precision highp float;
precision highp int;

const int BASE = 1;
const int BILLBOARD = 2;
const int STAR = 4;
const int CHECKPOINT = 8;

const float PI = 3.141592653589793;
const float PI2 = 2. * PI;
const float radToDeg = 90. / PI;

uniform float u_time;
uniform float u_musicTime;
uniform sampler2D u_text;

in vec2 v_uv;
in vec3 v_position;
flat in float v_cubeID;
flat in int v_side;
flat in int v_flag;
flat in vec4 v_color;
flat in vec2 v_windows;
flat in vec2 v_windowSize;
flat in vec2 v_windowMargin;
flat in vec3 v_slot;

vec4 normal;

layout(location=0) out vec4 outEverything;

float rand(float n){return fract(sin(n) * 43758.5453123);}

float rand2(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

vec2 upolar(vec2 uv){
  return vec2(cos(uv.x * PI2), sin(uv.y * PI2)) * 0.5 + 0.5;
}

vec2 polar(vec2 uv){
  float l = distance(uv, vec2(0.5));
  uv = uv *2. - 1.;
  float a = atan(uv.x, uv.y);
  return vec2(cos(a) * l, sin(a) * l) * 0.5 + 0.5;
}

vec2 scaleUV(vec2 uv, float variant){
  return uv * vec2(rand(variant + 1.)+0.5, rand(variant + 2.)+0.5);
}

bool animationSinus(vec2 uv, float time, float variant){
  return fract(sin(uv.x * 13.)/sin(uv.y * 11.) * (.5 + rand(variant * 300.)) + 0.1 * time * (1. + variant)) > variant + 0.1;
}

bool animationCircles(vec2 uv, float time, float variant){
  return fract(sin(uv.x * 45.) * cos(uv.y *53. + variant * sin(time)) + time) * 0.8 > variant;
}

bool animationBars(vec2 uv, float time, float variant){
  return ((rand(floor(10. * (variant + uv.x - sin(time*0.1))))*.5 + .4 - uv.y) * (1.5 + sin(time *0.1) * rand(variant)) > variant)
    || fract(uv.x * 200.) > fract(uv.y * 200.) * 5.;
}

bool animationGridscape(vec2 uv, float time, float variant){
  float d = tan(uv.y + 0.3);
  return mod((uv.x - 0.5) * d,0.2)<0.01 || mod(d + time*0.5,0.2)<0.01;
}

bool animation(vec2 uv, float time, float variant){
  bool down = rand(variant*71.) > 0.5;
  if(uv.y < 0.15 && down || uv.y > 0.85 && !down )
    return 
      (texture(u_text, vec2( uv.x*0.7 + u_time*0.4, -uv.y*1.11 + (down?-0.003:0.03) + floor(variant*8.) * 0.125)).r > 0.8) 
      != (rand(variant*51.) > 0.6);

  uv = scaleUV(uv, v_cubeID);

  int v = int(floor(rand(variant * 976.) * 4.));
  switch(v){
    case 0:
      return animationSinus(uv, time, variant);
    case 1:
      return animationCircles(uv, time, variant);
    case 2:
      return animationBars(uv, time, variant);
    default:
      return animationGridscape(uv, time, variant);
  }
}

void drawBillboard(){
  vec2 d2 = abs(v_uv - 0.5);
  float d = max(d2.x, d2.y);
  bool lit = 
    d>0.48 ? true:
    d<0.48 && d>0.46 ? false:
    animation(v_uv, u_time, rand(v_cubeID * 123. + float(v_side)));
  normal.a = lit?1.:0.;
}

void drawWindows(){

  if(v_windows == vec2(0.))
    return;

  vec2 r = .5 - v_windowMargin;
  vec2 d = abs(v_uv - 0.5);

  if((v_flag & BASE) != 0){
    d.y -= v_windowMargin.y;
  }

  bool window = all(lessThan(d, r));

  vec2 wuv;
  float windowness = 1.;

  if(window){
    wuv = (v_uv - v_windowMargin) / (r * 2.);
    vec2 uv2 = mod(wuv, 1. / v_windows) * v_windows;
    vec2 wr = v_windowSize / 2.;
    vec2 wd = abs(uv2 - 0.5);
    vec2 dif = wr-wd;
    windowness = min(min(dif.x, dif.y)*50., 1.);
    window = v_side>=2 && windowness >= 0.;    
  }

  vec2 windowId;
  if(window){
    windowId = floor(wuv * v_windows);
    bool lit = v_windows == vec2(1.) || fract(rand2(windowId*0.01 + v_cubeID * 101. + float(v_side) * 0.13) * (u_time / 1000. + 1.)) > 0.3;
    if(!lit)
      window = false;
  }
  
  normal.a = (window?windowness:0.) * (.7 + sin((u_musicTime / 0.69 / 2. + mod(v_slot.x + v_slot.y, 4.) / 2. ) * PI) * .35);
}

void main() {

  if((v_flag & (STAR | CHECKPOINT)) != 0){
    if((v_flag & STAR) != 0){
      outEverything.r = 1.;
      return;
    }
    vec2 b = abs(v_uv - 0.5);
    outEverything = max(b.x, b.y)>0.47?vec4(0.,0.,0.,1.):vec4(0., 1., 0., 0.);
    return;
  }


  if(gl_FrontFacing == false){
    outEverything.b = 1.;
    return;  
  }

  if((v_flag & BILLBOARD) != 0)
    drawBillboard();
  else
    drawWindows();  

  outEverything.a = normal.a;

}

  //if(window)
    //normal = normalize(normal + rand2(floor(wuv * v_windows)) * .03);
  /*else
    normal = normalize(normal + rand2(floor(v_uv * 100.))*.1);*/

  //vec3 color = window?(v_color.rgb + vec3(0., 0.3, 0.5)) * 0.04:v_color.rgb*0.5;

  //outColor = vec4(color, v_color.a);


  //if(length(v_uv+vec2(0.5)) > 1.5){
  /*if(sin(v_uv.y * 100.) + sin(v_uv.x * 100.) > .0){
    discard;
    return;
  }*/  

  //normal.xyz = v_normal;
  //drawUV();
  
  //outEverything.xyz = normal.xyz * (gl_FrontFacing?.5:-.5) + .5;  
  //outEverything.a = normal.a;


  //outPosition = v_position;
  
  //outColor = vec4(v_uv.xy, 0., 1.);
  
  //gl_FragDepth = 0.99;


/*void drawCog(){
  vec2 dc = v_uv - vec2(0.5);
  float a = degrees(atan(dc.x, dc.y));

  outColor = gl_FrontFacing?v_color:v_color.gbra;

  if(length(dc) < (mod(a, 60.)<30.?0.3:0.4)){    
    outColor.xyz = outColor.xyz * 2.;
  } else {
    outColor.xy = v_uv;
  }
}*/

/*void drawUV(){
  outColor = vec4(v_uv, float(v_cubeID) / 1e10, v_color.a);
}*/
