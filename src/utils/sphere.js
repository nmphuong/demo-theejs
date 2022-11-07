import * as CANNON from 'cannon-es'
import { setCanJump } from '../components/PointerLockControls';
import { world } from './world';

const mass = 50, radius = 1;
const sphereShape = new CANNON.Sphere(radius);
const sphereBody = new CANNON.Body({ mass: mass });

class Sphere {
    constructor() {
        // 
    }

    create() {
        sphereBody.addShape(sphereShape);
        sphereBody.position.set(0, 5, 0);
        sphereBody.linearDamping = 0.9;
        world.addBody(sphereBody);

        const contactNormal = new CANNON.Vec3();
        const upAxis = new CANNON.Vec3(0, 1, 0)

        sphereBody.addEventListener("collide", function (e) {
            var contact = e.contact;
            
            if (contact.bi.id == sphereBody.id) {
                contact.ni.negate(contactNormal);
            } else {
                contactNormal.copy(contact.ni);
            }
            
            if (contactNormal.dot(upAxis) > 0.5) {
                setCanJump(true)
            }
        });
    }
}

const _sphere = new Sphere()

export { _sphere, sphereBody, sphereShape }

export default Sphere