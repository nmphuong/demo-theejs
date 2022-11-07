import * as CANNON from 'cannon-es'
import { world } from './world';

const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({ mass: 0 });

class Plane {
    constructor() {
        // 
    }

    create() {
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(1, 0, 0),
            -Math.PI / 2
        );
        world.addBody(groundBody);
    }
}

const _plane = new Plane()

export { _plane }

export default Plane