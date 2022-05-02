import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight);
document.body.append(renderer.domElement);

const sphereGeomatry = new THREE.SphereGeometry(5, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphereMesh = new THREE.Mesh(sphereGeomatry, sphereMaterial);
scene.add(sphereMesh);
camera.position.z = 10;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
