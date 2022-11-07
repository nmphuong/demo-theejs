import * as THREE from 'three'
import scene from './scene';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true
renderer.shadowMapSoft = true
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(scene.fog.color, 1)

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export default renderer;