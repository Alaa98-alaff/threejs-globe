varying vec3 veretexNormal; // (0, 0, 0)

void main () {
    // hanlde atmosphere 
   float intensity = pow(0.9 - dot(veretexNormal, vec3(0, 0, 1.0)), 2.0);
   gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}