// https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram
varying vec2 vertexUV;

void main () {
 vertexUV= uv;
 gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}