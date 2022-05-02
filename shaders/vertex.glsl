varying vec2 vertexUV;
varying vec3 veretexNormal;

void main () {
 vertexUV= uv;
 veretexNormal= normal;

 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}