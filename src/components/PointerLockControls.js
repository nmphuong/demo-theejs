import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_SPACE, KEY_UP } from '../Constans/constans';
import camera from "../utils/camera";
import keyListener from '../utils/keyListener';
import machine from '../utils/machine';
import { mouse } from '../utils/mouse';
import scene from '../utils/scene';
import { sphereBody } from '../utils/sphere';

var canJump, clock, inputVelocity, velocityFactor, velocity, PI_2, jumpVelocity

const pitchObject = new THREE.Object3D();
const yawObject = new THREE.Object3D();
const euler = new THREE.Euler()
const quat = new THREE.Quaternion()

function setCanJump(_canJump) {
    canJump = _canJump
}

class PointerLockControls {
    constructor() {
        this.keyboardEvent()
        clock = new THREE.Clock()
        inputVelocity = new THREE.Vector3();
        velocityFactor = 0.2
        PI_2 = Math.PI / 2
        jumpVelocity = 20
    }

    create() {
        pitchObject.add(camera);
        yawObject.position.y = 2;
        // camera.position.set(
        //     yawObject.position.x,
        //     yawObject.position.y - 1.5,
        //     yawObject.position.z - .5
        // )
        camera.position.set(
            yawObject.position.x,
            yawObject.position.y + 3,
            yawObject.position.z + 10
        )
        yawObject.add(pitchObject);
        scene.add(yawObject)
        velocity = sphereBody.velocity
        document.addEventListener("mousemove", this.mousemove, false);
    }

    mousemove(event) {
        if (mouse.isBlocked()) {
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

            yawObject.rotation.y -= movementX * 0.002;
            pitchObject.rotation.x -= movementY * 0.002;

            pitchObject.rotation.x = Math.max(
                -PI_2,
                Math.min(PI_2, pitchObject.rotation.x)
            );
        }
    }

    keyboardEvent() {
        machine.addCallback(() => {
            const delta = clock.getDelta() * 100
            inputVelocity.set(0, 0, 0)

            if (keyListener.isPressed(KEY_UP)) {
                inputVelocity.z = -velocityFactor * delta / 3;
            }

            if (keyListener.isPressed(KEY_DOWN)) {
                inputVelocity.z = velocityFactor * delta / 6;
            }

            if (keyListener.isPressed(KEY_LEFT)) {
                inputVelocity.x = -velocityFactor * delta / 2;
            }

            if (keyListener.isPressed(KEY_RIGHT)) {
                inputVelocity.x = velocityFactor * delta / 2;
            }

            if (keyListener.isPressed(KEY_SPACE)) {
                if (canJump) {
                    canJump = false 
                    velocity.y = jumpVelocity
                }
            }

            euler.x = pitchObject.rotation.x;
            euler.y = yawObject.rotation.y;
            euler.order = "XYZ";
            quat.setFromEuler(euler);
            inputVelocity.applyQuaternion(quat);

            velocity.x += inputVelocity.x;
            velocity.z += inputVelocity.z;
            yawObject.position.copy(sphereBody.position);
        })
    }
}

const _pointerLockControls = new PointerLockControls()

export { _pointerLockControls, setCanJump, yawObject, pitchObject, canJump }

export default PointerLockControls