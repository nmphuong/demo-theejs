import { world } from "./world";

class Physics {
    constructor () {
        // 
    }

    create () {
        const physicsMaterial = new CANNON.Material("slipperyMaterial");
        const physicsContactMaterial = new CANNON.ContactMaterial(
            physicsMaterial,
            physicsMaterial,
            0.0,
            0.3
        );
        
        world.addContactMaterial(physicsContactMaterial);
    }
}

const _physics = new Physics()

export { _physics }

export default Physics