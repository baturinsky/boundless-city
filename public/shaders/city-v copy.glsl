#version 300 es
precision highp float;
precision highp int;
precision mediump sampler3D;

//const vec3 norm[6] = vec3[](vec3(1,0,0), vec3(-1,0,0), vec3(0,1,0), vec3(0,-1,0), vec3(0,0,1), vec3(0,0,-1));
const vec3 norm[6] = vec3[](vec3(0,0,-1), vec3(0,0,1), vec3(0,-1,0), vec3(0,1,0), vec3(-1,0,0), vec3(1,0,0));
const vec2 uv[6] = vec2[](vec2(0,0), vec2(0,1), vec2(1,1), vec2(0,0), vec2(1,1) ,vec2(1,0));
const vec3 quad[6] = vec3[](vec3(-1, -1, 0), vec3(-1, 1, 0), vec3(1, 1, 0), vec3(-1, -1, 0), vec3(1, 1, 0), vec3(1, -1, 0));
const vec2 kernel[4] = vec2[](vec2(1,0), vec2(-1,0), vec2(0,1), vec2(0,-1));
const uint u255 = uint(255);

const int BELOW = 0;
const int ABOVE = 1;
const int FURTHER = 2;
const int CLOSER = 3;
const int LEFT = 4;
const int RIGHT = 5;

const int BASE = 1;
const int BILLBOARD = 2;
const int STAR = 4;
const int CHECKPOINT = 8;

uniform mat4 u_worldViewProjection;
uniform float u_time;
uniform vec3 u_origin;
uniform vec3 u_eye;
uniform vec3 u_citySize;
uniform vec3 u_checkpoint;
uniform float u_blockSize;
uniform float u_a;
uniform float u_b;
uniform int[100] u_collected;

out vec2 v_uv;
out vec3 v_position;
flat out int v_flag;
flat out int v_side;
flat out float v_cubeID;
flat out vec4 v_color;
//flat out vec3 v_normal;
flat out vec2 v_windows;
flat out vec2 v_windowSize;
flat out vec2 v_windowMargin;
flat out vec3 v_slot;

vec3 corner;
vec3 speed;
float columnID;
bool isElevator;

float rand(float n){return fract(sin(n + 0.5) * 43758.5453123);}

float rand2(vec2 v) { 
	return fract(sin(dot(v, vec2(12.9898, 4.1414))) * 43758.5453);
}

float rand3(vec3 v){
  return rand2(v.xy + v.yz * 21.);
}

bool bit(int n, int b){
  return floor(mod(float(n) / pow(2., float(b)), 2.)) == 1.;
} 

bool collected(int b){
  return bit(u_collected[b/16], int(mod(float(b),16.)));
}

float slotCubeId(vec3 slot){
  return rand3(slot * 3.142);
}

int hashAt(vec3 at){
  vec3 slot = round(at / u_blockSize);
  float cube = slotCubeId(slot);
  return int(floor(cube * 1000.));
}

/*float snoise(vec3 v){ 
  return texture(u_noise, v).r;
}*/

vec3 randVec3(float n){
  return vec3(rand(n), rand(n+0.1), rand(n + 0.2));
}

mat4 rotationX( in float angle ) {
	return mat4(	1.0,		0,			0,			0,
			 		0, 	cos(angle),	-sin(angle),		0,
					0, 	sin(angle),	 cos(angle),		0,
					0, 			0,			  0, 		1);
}

mat4 rotationY( in float angle ) {
	return mat4(	cos(angle),		0,		sin(angle),	0,
			 				0,		1.0,			 0,	0,
					-sin(angle),	0,		cos(angle),	0,
							0, 		0,				0,	1);
}

mat4 rotationZ( in float angle ) {
	return mat4(	cos(angle),		-sin(angle),	0,	0,
			 		sin(angle),		cos(angle),		0,	0,
							0,				0,		1,	0,
							0,				0,		0,	1);
}

bool isPillar(vec3 slot){
  return mod(slot.x, 6.) == 0. && mod(slot.y, 6.) == 0.;
}

bool hasBlockIn(vec3 slot){
  return isPillar(slot) || rand3(slot) > 0.92;
}

bool hasStarIn(vec3 slot){
  return mod(slot, 2.) == vec3(1., 0., 1.) && !isPillar(slot) && rand3(slot) < 0.2;
}

vec3 hasSpeed(vec3 slot){
  if(isElevator){
    return vec3(0., 0., (floor(rand(slot.z) * 4.) - 1.5) * 20.);
  } else {
    vec3 smod = mod(slot, 2.);
    vec3 dir = 
      smod.xy==vec2(0.)?vec3(0., 0., 1.)
      :smod.yz==vec2(1.)?vec3(1., 0., 0.)
      :smod.xz==vec2(1., 0.)?vec3(0., 1., 0.)
      :vec3(0.);

    float laneRnd = rand3(slot * (dir - 1.) * 0.301) * 1000.;
    if(laneRnd<100.){
      return (laneRnd - 50.) * dir * (dir.z == 0.?3.:.5);
    } else
      return vec3(0.);
  }
}

void makeCar(){
  if(corner.z >0.)
    corner.xy *= 0.5;
  corner *= (vec3(1.) + abs(sign(speed)) * 2.) * 0.2;
  corner.z *= 0.5;
  corner += vec3(rand(v_cubeID * 19.), rand(v_cubeID * 29.), rand(v_cubeID * 39.)) - 0.5;
  //v_windows = vec2(1.);
}

void makeBase(){
  float radius = 0.5 + 1. * min(0.6, rand(v_cubeID*142.));
  corner.xy *= radius;
  corner.z *= corner.z<0.?1.:-0.25 - 0.2 * rand(v_cubeID*243.);
  if(radius < 1.){
    v_flag = v_flag | BASE;
    v_windows = floor(v_windows / 2.);
    v_windowMargin = vec2(.3, 1.);
  } else {
    v_windows = vec2(0.);
  }
}

void makeRoof(){
  corner.xy *= corner.z<0.?1.:max(0., 0.3 - 0.5 * rand(v_cubeID*142.));
  corner.z *= corner.z<0.?1.:-0.1 - 0.4 * rand(v_cubeID*243.);
  //normal.z -= .5;
  
  if(rand(v_cubeID*144.) < 0.5){
    v_windows *= 0.;
  } else {
    v_windows.x = floor(v_windows.x / 2.);
    v_windowMargin.x = 0.3;
  }
}

void makeRoof2(){
  if(corner.z>0.){
    if(rand(v_cubeID*253.) > 0.5){
      corner.x = 0.;
    } else {
      corner.y = 0.;
    }
  }
  corner.z *= corner.z<0.?1.:0. - 0.3 * rand(v_cubeID*243.);
  //normal.z -= .5;
}


void makeSlope(){
  if(corner.z < 0.)
    return;
  int slopeDir = int(rand(v_cubeID*253.) * 4.);  
  float slope = -1. + 1.8 * rand(v_cubeID*253.);
  if(dot(kernel[slopeDir], corner.xy)>0.){
    corner.z = -1.;
    v_windows *= 0.;
  } else {
    corner.z = slope;
    if(slope < 0.)
      v_windows *= 0.;
  }
}

void makeConnector(){
  corner.xy *= 0.2 + 0.2 * rand(columnID + 19.);
  if(rand(columnID + 21.) > 0.7)
    corner = (rotationZ(radians(45.)) * vec4(corner, 1.)).xyz;
  //v_windows.x = floor(v_windows.x*0.7);      
  //v_windows *= 0.;
}


void makeAttachment(){
  int attachmentKind = int(rand(v_cubeID * 341.) * 4.);
  switch (attachmentKind){
    case 0:
      makeRoof();
      break;
    case 1:
      makeRoof2();
      break;
    case 2:
      makeSlope();
      break;
    default:
      makeBase();
      break;
  }
}

void main() {
  int sideID = gl_VertexID % 36 / 6;
  int cubeOrder = gl_VertexID / 36;

  int cw = int(u_citySize[0]);
  int cd = int(u_citySize[1]);
  int ch = int(u_citySize[2]);

  vec3 slot = vec3(cubeOrder % cw, cubeOrder / cw % cd, cubeOrder / cw / cd % ch) + u_origin;

  bool isCheckpoint = u_checkpoint == slot;

  speed = hasSpeed(slot);

  bool moving = speed != vec3(0.);
  bool isLane = speed.xy != vec2(0.);

  vec3 shift;
  if(isElevator){
    shift = mod(speed * u_time, u_blockSize * u_citySize);    
  } else {
    shift = speed * u_time;
    slot = slot - floor(shift / u_blockSize);
  }

  v_slot = slot;

  columnID = rand2(slot.xy);

  v_cubeID = slotCubeId(slot);

  bool isBlock = hasBlockIn(slot);  
  
  bool blocksNearby[6];

  bvec3 connector;

  if(!isElevator && !isBlock){  
    bool testHorCon = !moving && rand(v_cubeID * 512.) > 0.5;

    if(testHorCon)
      blocksNearby = bool[](
        hasBlockIn(slot + norm[0]),
        hasBlockIn(slot + norm[1]),
        hasBlockIn(slot + norm[2]),
        hasBlockIn(slot + norm[3]),
        hasBlockIn(slot + norm[4]),
        hasBlockIn(slot + norm[5])
        );
    else {
      blocksNearby[0] = hasBlockIn(slot + norm[0]);
      blocksNearby[1] = hasBlockIn(slot + norm[1]);
    }
    
    connector = bvec3(    
      blocksNearby[LEFT] && blocksNearby[RIGHT],
      blocksNearby[FURTHER] && blocksNearby[CLOSER],
      blocksNearby[BELOW] && blocksNearby[ABOVE]
    );

    if(!isBlock && !blocksNearby[BELOW] && !blocksNearby[ABOVE] && !any(connector) && !isLane){
      gl_Position = vec4(0.);
      return;
    }  
  }

  corner = quad[gl_VertexID % 6];
  corner.z = -1.;
  corner = sideID%2==0?corner:-corner.yxz;
  corner = sideID<2?corner:sideID<4?corner.yzx:corner.zxy;  
  
  v_side = sideID;

  //v_color = vec4(rand2(slot.xy + vec2(0.223), rand2(slot.xy + vec2(0.224)), rand2(slot.xy + vec2(0.225)), 1.);  

  v_windows = floor(vec2(
    rand(columnID + 13.) * 10. + 5., 
    rand(columnID + 14.) * 10. + 5.
  ));

  v_windowSize = vec2(rand(columnID + 15.), rand(columnID + 16.)) * 0.6 + 0.4;
  v_windowMargin = max(vec2(rand(columnID + 17.) * 0.25, rand(columnID + 18.) * 0.15) - 0.05, 0.);

  if(isCheckpoint){
    v_flag = v_flag | CHECKPOINT;
    corner.y *= vec2(0.2, 0.6, 0.4);
    corner = (rotationZ(u_time) * vec4(corner, 1.)).xyz;
  } else if(hasStarIn(slot)){
    float r = v_cubeID + float(gl_VertexID % 36) + 11.;
    int hash = hashAt(slot * u_blockSize);
    if(collected(hash)){
      return;
    }
    corner = vec3(sin(rand(r)*10. + u_time), sin(rand(r + 2.)*10. + u_time), sin(rand(r + 3.)*10. + u_time))*0.2;
    corner *= max(1., 100. / distance(slot * u_blockSize, u_eye));
    v_flag = v_flag | STAR;
  } else if(isElevator){
    v_uv.xy = corner.xz * 0.4 + 0.45;
    corner *= 0.1;
    corner.x += speed.z / 50.;
    corner.y = corner.y<0.?0.8:1.;
    corner.z *= 2.;
    v_windows = vec2(1.);
    v_windowMargin = vec2(0.);
  } else if(isBlock){
    if(isLane){
      corner *= 0.5;
      v_windows *= rand(v_cubeID * 65.) * 0.3 + 0.4;
    }
    if(v_side >=2 && rand(v_cubeID * 607. + float(v_side)) < 0.06)
      v_flag = v_flag | BILLBOARD;
  } else {
    if(isLane){
      makeCar();
    } else if(any(connector)){
      makeConnector();
      
      if(connector[2]){
        v_windows.x = 1.;
        v_windowMargin.x = 0.4;
      } else {
        v_windows.y = 1.;
        v_windowMargin.y = 0.4;        
        if(connector[0]){
          corner.xyz = corner.zxy;
        } else if(connector[1]){
          corner.xyz = corner.yzx;
        }
      }
    } else if(blocksNearby[BELOW] && hasSpeed(slot + norm[BELOW]) == vec3(0.)){
      makeAttachment();
    } else if(blocksNearby[ABOVE] && hasSpeed(slot + norm[ABOVE]) == vec3(0.)){
      corner.z *= -1.;
      makeAttachment();
      corner.z *= -1.;
    } else {
      return;
    }
  }

  if(!isElevator){
    v_uv.x = ((sideID==2 || sideID==3)?corner.x:-corner.y)*((sideID==3 || sideID==5)?-1.:1.) * 0.5 + 0.5;  
    v_uv.y = ((sideID==0 || sideID==1)?corner.y:corner.z) * 0.5 + 0.5;
  }

  vec2 edges0 = vec2(rand(slot.x), rand(slot.y)) - 1.;
  vec2 edges1 = vec2(rand(slot.x+1.), rand(slot.y+1.)) + 1.;
  
  vec2 corner01 = corner.xy * 0.5 + 0.5;
  corner.xy = edges0 * (1. - corner01) + edges1 * corner01;

  corner *= u_blockSize;
  corner *= 0.99999;
  vec3 position = corner * 0.5;
  position += slot * u_blockSize + shift;  
  v_position = position;
  gl_Position = u_worldViewProjection * vec4(position, 1.);  
}

    //corner = (rotationZ(radians((corner.z>0.) != (mod(slot.z, 2.) == 0.)?5.:-5.)) * vec4(corner, 1.)).xyz;

  //(vec2(corner.x<0.?rand(slot.x):rand(slot.x + 1.), corner.y<0.?rand(slot.y):rand(slot.y + 1.)) - 0.5) * 1.5;

  //corner = (rotation * vec4(corner, 1.)).xyz;
  //corner *= rand(float(cubeID*3)+0.2) * 2.;

  //position += vec3(cubeID%10, cubeID/10%10, cubeID/100%10) * 100.;
  
  //position += randVec3(float(cubeID)) * vec3(2., 2., 0.5) * 3000. + vec3(100, 100, -500.);

  //v_normal = vec3(0., -1., 0.);
  //v_color = vec4(v_normal + vec3(1.), 1.);

  //v_normal = vec3(0.);

  //v_normal = vec3(0.,0.,1.);
  
  //vec4 v_position = u_worldViewProjection * position;
  //v_color = vec4(float((color>>16)&u255)/255., float((color>>8)&u255)/255., float(color&u255)/255., 1.0);
  //gl_Position = position;
  //gl_Position = v_position;
