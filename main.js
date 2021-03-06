import * as THREE from "three";
import gsap from "gsap";
import vertexShader from "./shaders/vertex.glsl"; // vite vite-plugin-string installed to supprot import
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

const canvasContainer = document.getElementById("canvasContainer");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvasContainer.offsetWidth / canvasContainer.offsetHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true, // antialias => make the border fade with bc
  canvas: document.querySelector("canvas"),
});

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(devicePixelRatio); // make the shapes smooth & hight resultion

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

const group = new THREE.Group();
group.add(sphereMesh);
scene.add(group);

const starGeomatry = new THREE.BufferGeometry();
const starMatiral = new THREE.PointsMaterial({ color: 0xffffff });

let starVertices = [];

for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 3000;
  starVertices.push(x, y, z);
}

starGeomatry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVertices, 3)
);

const starMesh = new THREE.Points(starGeomatry, starMatiral);
scene.add(starMesh);

camera.position.z = 15;

const mouse = {
  x: undefined,
  y: undefined,
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sphereMesh.rotation.y += 0.002;
  gsap.to(group.rotation, {
    x: mouse.y * 0.3,
    y: mouse.x * 0.5,
    duration: 2,
  });
}
animate();

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = (event.clientY / innerHeight) * 2 - 1;
});
