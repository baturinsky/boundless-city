#version 300 es

precision highp float;
precision mediump sampler3D;

in vec2 v_texCoord; 

uniform float u_resolution;
uniform float u_scale;
uniform float u_time;
uniform float u_near;
uniform float u_far;
uniform mat4 u_worldViewProjection;
uniform mat4 u_inverseWorldViewProjection;
uniform mat4 u_raycastProjection;
uniform vec3 u_eye;
uniform vec3 u_toSun;
uniform float u_orbRadius;
uniform int[100] u_collected;

uniform sampler3D u_noise;

layout(location=0) out vec4 outColor;
layout(location=1) out vec3 outNormal;

//return distance(vec3(50., 0., 100.), pos) - 20.;

const float maxRange = 3000.;
const float orbChunkSize = 30.;
const float maxHeight = 200.;
const vec2 orbRange = vec2(100., 150.);

bool bit(int n, int b){
  return floor(mod(float(n) / pow(2., float(b)), 2.)) == 1.;
} 

bool collected(int b){
  return bit(u_collected[b/16], int(mod(float(b),16.)));
}

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise2d(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float height(vec2 at){
  return 200.;// - snoise2d(at * 0.001) * 50.;
}


float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

int posHash(vec2 p){
  return int(floor(hash(p) * 1000.));
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float snoise(vec3 v){ 
  return texture(u_noise, v).r;
}

vec3 nearestOrb(vec3 pos){
  vec2 chunk = round(pos.xy / orbChunkSize);
  //vec2(floor(chunk.x), floor(chunk.y))
  float h = rand(chunk) * (orbRange.y - orbRange.x) + orbRange.x;
  return vec3(chunk * orbChunkSize, h);
}

float sdf(vec3 pos){
  float scale = u_scale / u_resolution;
  float simplex = snoise(pos * vec3(1. / 500., 1./ 500., 1. / 250.) + vec3(0., 0., - u_time * .005 * 0.));
  float f = (sin(simplex * 5.) + pos.z * scale * 0.01) * 2.;
  //f += snoise2d(pos.xy / 10.) * 0.1;
  //f += sin(pos.x * 0.5) * 0.2 + sin(pos.y * 0.5) * 0.2;
  f = max(f, pos.z - height(pos.xy));

  if(pos.z < 200.){
    vec3 orb = nearestOrb(pos);
    float d = distance(orb, pos);
    f = max(10. - d, f);

    if(!collected(posHash(orb.xy))){
      f = min(d - u_orbRadius, f);
    }

  }

  return f;
}

const float normalDelta1 = 1.;
const float normalDelta2 = 0.1;

vec3 normalSdfDelta(vec3 pos, float delta){
  float a = sdf(pos);
  vec2 d = vec2(delta,0.);
  float x = sdf(pos + d.xyy) - a;
  float y = sdf(pos + d.yxy) - a;
  float z = sdf(pos + d.yyx) - a;
  return normalize(vec3(x,y,z));
}

/*vec3 normalSdf(vec3 pos){
  return normalize(normalSdfDelta(pos, 1.) * 2. + normalSdfDelta(pos, .2));
}*/

vec3 normalSdf(vec3 pos){
  return normalSdfDelta(pos, 1.);
}

float raycastDetailed(vec3 start, vec3 ray, int limit, out float nearestAngle){
  float l = 1.;  
  nearestAngle = 1000000.;

  for(int i=0; i<limit; i++){
    vec3 pos = start + ray*l;
    
    if(pos.z > maxHeight && ray.z >=0.)
      return 1000.;

    float v = sdf(pos);
    
    if(l > 1.){
      nearestAngle = min(v / l, nearestAngle);
    }

    if(l>maxRange || v>1000.)
      return 1000.;

    if(v < 0.1){
      return l;
    } else {
      //l += v * 1. * (1. + rand(ray.xy + vec2(l)));
      l += v * 1.1;
    }
  }
  return l;
  //return 100000.;
}

float raycast(vec3 start, vec3 ray, int limit){
  float nearestAngle;
  return raycastDetailed(start, ray, limit, nearestAngle);
}

void main() {
  if(gl_FragCoord.y<1. && gl_FragCoord.x<1.){
    outColor = vec4(0.);
    outNormal = vec3(0.);
    vec3 orb = nearestOrb(u_eye);
    
    float orbDist = distance(u_eye, orb);
    bool orbNearby = orbDist < 7. && (u_collected[posHash(orb.xy)] == 0);
    bool crashed = sdf(u_eye) < 0.;

    if(orbNearby)
      outColor.g = float(posHash(orb.xy));
    else if(crashed)
      outColor.r = 1.;
    return;
  }

  vec4 screenPos = vec4(v_texCoord.x * 2. - 1., v_texCoord.y * 2. - 1., 0., 1.);
  vec3 ray = normalize((u_raycastProjection * screenPos).xyz);
  float l = raycast(u_eye, ray, 300);
  vec3 pos = u_eye + ray * l;

  vec3 color = vec3(normalize(pos.xy / 1000.), 0.1);
  vec3 orb = nearestOrb(pos);

  if(l>=10000.)  {
    color = vec3(0., 0., .0);
    outNormal = vec3(0., 0., 1.); 
  } else if(distance(pos, orb) <= u_orbRadius + 0.1){
    //color = vec3(0., 5., 5.);
    color = vec3(0.);
    //color = normalize(normalSdf(pos / 15. + vec3(0., 0., -1000.))) * 10.; 
    outNormal = normalSdf(pos);;
  } else {

    //color = sin(pos / 70.) + sin(pos.yzx / 70.) + vec3(1., 0., -1.);

    color = normalize(normalSdf(pos / 10. + vec3(0., 0., -10000.)) + vec3(1.));

    //color = normalize(snoise(pos));

    //color = normalize(pos) * 5.;
    //color += vec3(0.2, 0.2, -.2);
    //color *= (10. + pow(l, 0.5)) / 10.;

    //color = vec3(1., 1., 1.);

    /*float gridWidth = 0.001;
    float gridStep = 1.;
    float minGrid = 1. + min(sin(pos.x / gridStep), min(sin(pos.y / gridStep), sin(pos.z / gridStep)));
    if(minGrid < gridWidth)
      color *= minGrid / gridWidth;*/

    /*float grid = sign(sin(pos.x / gridStep)) * sign(sin(pos.y / gridStep)) * sign(sin(pos.z / gridStep));
    if(grid<0.)
      color *= 0.9;*/

    //float grid = sin(pos.x / gridStep) + sin(pos.y / gridStep) + sin(pos.z / gridStep);
    
    //color += vec3(sin(pos.x / gridStep), sin(pos.y / gridStep), sin(pos.z / gridStep)) * 0.2;

    //color = vec3(pos.z / 100.);
    //color = normalize(color);

    //color = vec3(l / 1000., snoise(pos.yzx * 0.02), snoise(pos.zxy * 0.03));
    
    //color = vec3(1.) * l / 1000.;

    vec3 normal = normalSdf(pos);

    
    float shadowAngle;
    float shadowCast = raycastDetailed(pos + normal * 2., u_toSun, 30, shadowAngle);
    if(shadowCast < 50. && shadowCast > .1)
      color *= 0.5;
    /*else if (shadowAngle < 0.1)
      color *= 0.3 + shadowAngle * 0.7;*/

    normal = normalize(normal + 0.3 * normalSdf(pos * 10. + vec3(0., 0., -10000.) + 0.2 * normalSdf(pos.zxy * 10.23456 + vec3(45.4, 68.7, -10000.))));
    //normal = normalize(normal + 0.2 * normalize(vec3(snoise(pos / 10.), snoise(pos.yzx / 10.), snoise(pos.zxy / 10.))));


    /*float normalAngle = abs(dot(normal, ray));
    if(normalAngle < 0.2)
      color *= normalAngle * 10.;*/

    outNormal = normal; 

    //outNormal = vec4(0., 0., -1., 1.); 
    //color = normalize(vec3(sin(pos.xy / 20.), 0.1)) * 2.; 
    //color -= vec3(1., 1., 1.) * l / 5000.;
  }

  //outNormal = vec4(0., 0., 1., 1.);
  outColor = vec4(color, 1.);

  /*screenPos.z = l;
  vec4 cameraPosition = u_raycastProjection * screenPos;*/

  vec4 cameraPosition = u_worldViewProjection * vec4(pos, 1.);

  //vec4 cameraPosition = u_worldViewProjection * vec4(pos, 1.);
  
  float depth = cameraPosition.z / cameraPosition.w;
  gl_FragDepth = min(0.999999,depth);

  //gl_FragDepth = cameraPosition.z;

  //gl_FragDepth = 0.1;

}