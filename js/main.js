/* Toggle Modal: On/Off */
const modal = document.querySelector(".modal");
const heading = document.querySelector(".heading");

const fadeModal = setInterval(function() {
    modal.style.opacity = 1;
}, 2000);

function rotateCamera() {
    window.addEventListener("keydown", function() {
        if(event.code === "Enter") {
            modal.style.opacity = 0;
            heading.style.opacity = 1;
            clearInterval(fadeModal);
            controls.autoRotate = true;
        } else if(event.code === "Space") {
            modal.style.opacity = 1;
            heading.style.opacity = 0;
            controls.autoRotate = false;
        }
    })
}
rotateCamera();

/* Setup Scene */
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* Setup Camera */
var camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

/* Setup Controls */
var controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 20);
// rotate camera automatically: controls.autoRotate = true;

/* Import and Load Model */
var loader = new THREE.GLTFLoader();
loader.load("../models/medieval-village/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
}, undefined, function(error) {
    console.error(error);
    }
);

/* Render Scene */
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

/* Initialize Once DOM is ready */
document.addEventListener("DOMContentLoaded", animate);
