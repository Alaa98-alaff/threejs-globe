varying vec2 vertexUV;
varying vec3 veretexNormal;

void main () {
 vertexUV= uv;
 // to make the colors equal in all vertexes
 veretexNormal= normalize(normalMatrix * normal);

 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}