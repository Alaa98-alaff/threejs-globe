import * as THREE from "three";

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
const sphereMaterial = new THREE.MeshBasicMaterial({
  // color: 0xff0000
  map: new THREE.TextureLoader().load("./img/globe.jpg"), // to put the earth uv on the sphere
});
const sphereMesh = new THREE.Mesh(sphereGeomatry, sphereMaterial);
scene.add(sphereMesh);
camera.position.z = 15;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
