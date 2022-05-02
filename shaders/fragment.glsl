uniform sampler2D globeTexture;
varying vec2 vertexUV; // [0, 0.24]

void main () {
    gl_FragColor =texture2D(globeTexture,vertexUV);
}