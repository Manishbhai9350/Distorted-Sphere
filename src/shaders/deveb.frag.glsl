// // Fragment Shader

varying float qnoise;
varying float noise;

uniform float time;
uniform bool redhell;
uniform float rcolor;
uniform float gcolor;
uniform float bcolor;

void main() {
  float r, g, b;
  
  if (!redhell == true) {
    r = sin(qnoise + rcolor);
    g = normalize(qnoise + (gcolor / 2.0));
    b = tan(qnoise + bcolor);
  } else {
    r = normalize(qnoise + rcolor);
    g = sin(qnoise + gcolor);
    b = sin(qnoise + bcolor);
  }
  gl_FragColor = vec4(r, g, b, 1.0);
}



// void main(){

//     vec4 color1 = vec4(1.0, 0.5451, 0.7725, 1.0); // Pink color in RGBA format
//     vec4 color2 = vec4(1.0, 0.8627, 0.8627, 1.0); // Light pink color in RGBA format
//     vec4 color3 = vec4(0.4078, 0.6549, 1.0, 1.0);
//     vec4 color4 = vec4(0.7255, 0.9451, 1.0, 1.0);
//     float v = smoothstep(-.3,.5,0.0) * 1.3;
//     vec4 c1 = mix(color1,color2,v);
//     vec4 c2 = mix(color3,color4,v);
//     vec4 final = mix(c1,c2,.5);
//     gl_FragColor = final;
// }