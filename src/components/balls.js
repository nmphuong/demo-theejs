import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import machine from '../utils/machine';
import scene from '../utils/scene';
import { world } from '../utils/world';

const balls = [], ballMeshes = [];
const ballShape = new CANNON.Sphere();
const ballGeometry = new THREE.SphereGeometry(ballShape.radius, 32, 32);
var shootVelo

function _mintBall(x, y, z) {
    var ballBody = new CANNON.Body({ mass: 5 })
    ballBody.addShape(ballShape);
    var randomColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    var material2 = new THREE.MeshPhongMaterial({ color: randomColor });
    var ballMesh = new THREE.Mesh(ballGeometry, material2);

    world.addBody(ballBody);
    scene.add(ballMesh);

    ballMesh.castShadow = true;
    ballMesh.receiveShadow = true;

    balls.push(ballBody);
    ballMeshes.push(ballMesh);

    ballBody.position.set(x, y, z);
    ballMesh.position.set(x, y, z);
}

class Balls {
    constructor() {
        shootVelo = 35
    }

    create() {
        for (var i = 0; i < 7; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = 1;
            const z = (Math.random() - 0.5) * 20;

            _mintBall(x, y, z)
        }
        machine.addCallback(() => {
            for (var i = 0; i < balls.length; i++) {
                ballMeshes[i].position.copy(balls[i].position);
                ballMeshes[i].quaternion.copy(balls[i].quaternion);
            }
        })
    }
}

const _balls = new Balls()

export { _balls }

export default Balls