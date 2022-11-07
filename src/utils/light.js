import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import machine from './machine';
import scene from './scene';
import { sphereBody } from './sphere';

class Light {
    constructor() { }

    create() {
        const ambient = new THREE.AmbientLight(0x111111);
        scene.add(ambient);
        const light = new THREE.SpotLight(0xffffff);
        light.position.set(10, 30, 20);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;

        light.shadow.camera.near = 20;
        light.shadow.camera.far = 50; //camera.far;
        light.shadow.camera.fov = 40;

        light.shadowMapBias = 0.1;
        light.shadowMapDarkness = 0.7;
        light.shadow.mapSize.width = 2 * 512;
        light.shadow.mapSize.height = 2 * 512;

        scene.add(light);

        machine.addCallback(() => {
            ambient.position.copy(
                new CANNON.Vec3(
                    sphereBody.position.x + 10,
                    sphereBody.position.y + 30,
                    sphereBody.position.z + 20
                )
            )
            light.position.copy(
                new CANNON.Vec3(
                    sphereBody.position.x + 10,
                    sphereBody.position.y + 30,
                    sphereBody.position.z + 20
                )
            )
        })
    }
}

const _light = new Light()

export { _light }

export default Light