import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import machine from '../utils/machine';
import scene from '../utils/scene';
import { world } from '../utils/world';

const boxes = [], boxMeshes = [];

class Boxes {
    constructor() {
        // 
    }

    create() {
        const halfExtents = new CANNON.Vec3(1, 1, 1);
        const boxShape = new CANNON.Box(halfExtents);
        const boxGeometry = new THREE.BoxGeometry(
            halfExtents.x * 2,
            halfExtents.y * 2,
            halfExtents.z * 2
        );

        for (var i = 0; i < 7; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = 1;
            const z = (Math.random() - 0.5) * 20;

            const boxBody = new CANNON.Body({ mass: 5 });
            boxBody.addShape(boxShape);
            const randomColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
            const material2 = new THREE.MeshLambertMaterial({ color: randomColor });
            const boxMesh = new THREE.Mesh(boxGeometry, material2);
            world.addBody(boxBody);
            scene.add(boxMesh);
            boxBody.position.set(x, y, z);
            boxMesh.position.set(x, y, z);
            boxMesh.castShadow = true;
            boxMesh.receiveShadow = true;
            boxes.push(boxBody);
            boxMeshes.push(boxMesh);
        }

        machine.addCallback(() => {
            for (var i = 0; i < boxes.length; i++) {
                boxMeshes[i].position.copy(boxes[i].position);
                boxMeshes[i].quaternion.copy(boxes[i].quaternion);
            }
        })
    }
}

const _boxes = new Boxes()

export { _boxes }

export default Boxes