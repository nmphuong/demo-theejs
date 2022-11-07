import * as THREE from 'three'
import scene from './scene';


class Floor {
    constructor () {
        // 
    }

    create () {
        const geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        const material = new THREE.MeshLambertMaterial({ color: 0xeeee00 });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    }
}

const _floor = new Floor()

export { _floor }

export default Floor