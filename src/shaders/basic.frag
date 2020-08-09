varying vec2 vUv;
// varying vec3 vNormal;
// varying vec3 vPosition;

void main() {
  vec3 fragColor = vec3(vUv.x, vUv.y, 0);
  gl_FragColor = vec4(fragColor, 1.0);
}