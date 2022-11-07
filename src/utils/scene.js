import * as THREE from 'three'

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 0, 500)

export default scene;