import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl"; // vite vite-plugin-string installed to supprot import
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias => make the border fade with bc

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio); // make the shapes smooth & hight resultion
document.body.append(renderer.domElement);

// create a sphere
const sphereGeomatry = new THREE.SphereGeometry(5, 50, 50);
const sphereMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader, // filling in the space between, loop over every pixel between the vertecies and set it color rqual to value
  uniforms: {
    // texture send to the fragment and used there => think as porps in react
    globeTexture: {
      value: new THREE.TextureLoader().load("./img/globe.jpg"),
    },
  },
});
const sphereMesh = new THREE.Mesh(sphereGeomatry, sphereMaterial);
scene.add(sphereMesh);

// create a atmosphere
const atmosphereGeomatry = new THREE.SphereGeometry(5, 50, 50);
const atmosphereMaterial = new THREE.ShaderMaterial({
  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader, // filling in the space between, loop over every pixel between the vertecies and set it color rqual to value
  blending: THREE.AdditiveBlending, // to blend/ mix it with the sphere
  side: THREE.BackSide, // to show the shadows in the backside
});
const atmosphereMesh = new THREE.Mesh(atmosphereGeomatry, atmosphereMaterial);
atmosphereMesh.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphereMesh);

camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sphereMesh.rotation.y += 0.001;
}

animate();
