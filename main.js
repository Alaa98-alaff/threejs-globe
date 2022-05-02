import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl"; // vite vite-plugin-string installed to supprot import
import fragmentShader from "./shaders/fragment.glsl";

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

const sphereGeomatry = new THREE.SphereGeometry(5, 50, 50);
const sphereMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader, // filling in the space between, loop over every pixel between the vertecies and set it color rqual to value
});
const sphereMesh = new THREE.Mesh(sphereGeomatry, sphereMaterial);
scene.add(sphereMesh);
camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
