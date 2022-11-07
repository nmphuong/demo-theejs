import * as CANNON from 'cannon-es'
import machine from './machine';

const world = new CANNON.World();
const solver = new CANNON.GSSolver();

class World {
    constructor() {
        // 
    }

    create() {
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;

        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRelaxation = 4;

        solver.iterations = 100;
        solver.tolerance = 0.1;

        var split = true;

        if (split) {
            world.solver = new CANNON.SplitSolver(solver);
        } else {
            world.solver = solver;
        }

        world.gravity.set(0, -20, 0);
        world.broadphase = new CANNON.NaiveBroadphase();

        machine.addCallback(() => {
            world.step(1 / 60)
        })
    }
}

const _world = new World()

export { world, _world }

export default World