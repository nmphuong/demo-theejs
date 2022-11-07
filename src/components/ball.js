import * as CANNON from 'cannon-es'
import * as THREE from 'three'
import camera from '../utils/camera';
import machine from '../utils/machine';
import { mouse } from '../utils/mouse';
import scene from '../utils/scene';
import { sphereBody, sphereShape } from '../utils/sphere';
import { world } from '../utils/world';

const balls = [], ballMeshes = [];
const ballShape = new CANNON.Sphere(0.2);
const shootDirection = new THREE.Vector3();
const ballGeometry = new THREE.SphereGeometry(ballShape.radius, 32, 32);
var shootVelo

function _getShootDir() {
    var vector = shootDirection;
    shootDirection.set(0, 0, 1);
    vector.unproject(camera);
    var ray = new THREE.Ray(
        sphereBody.position,
        vector.sub(sphereBody.position).normalize()
    );
    shootDirection.copy(ray.direction);
}

function _mintBall() {
    var x = sphereBody.position.x;
    var y = sphereBody.position.y;
    var z = sphereBody.position.z;

    var ballBody = new CANNON.Body({ mass: 0.1 })
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

    _getShootDir();

    ballBody.velocity.set(
        shootDirection.x * shootVelo,
        shootDirection.y * shootVelo,
        shootDirection.z * shootVelo
    );

    x += shootDirection.x * (sphereShape.radius * 1.02 + ballShape.radius);
    y += shootDirection.y * (sphereShape.radius * 1.02 + ballShape.radius);
    z += shootDirection.z * (sphereShape.radius * 1.02 + ballShape.radius);

    ballBody.position.set(x, y, z);
    ballMesh.position.set(x, y, z);
}

class Ball {
    constructor() {
        shootVelo = 35
    }

    create() {
        this._createBall()
        machine.addCallback(() => {
            for (var i = 0; i < balls.length; i++) {
                ballMeshes[i].position.copy(balls[i].position);
                ballMeshes[i].quaternion.copy(balls[i].quaternion);
            }
        })
    }

    _createBall() {
        window.addEventListener("click", function (e) {
            if (mouse.isBlocked()) {
                _mintBall()
            }
        });

    }
}

const _ball = new Ball()

export { _ball }

export default Ball