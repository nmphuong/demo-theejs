import Animator from "./animator"

class CharacterController {
    constructor (mesh, modes) {
        this.mesh = mesh
        this.modes = modes
        this.mode = 'normal'
        this.animator = new Animator(mesh)
    }

    setMode(mode) {
        this.mode = mode
    }

    run (animation) {
        if (!this.modes[this.mode]) return
        if (!this.modes[this.mode][animation]) return
        let animationId = this.modes[this.mode][animation][0]
        let timeScale = this.modes[this.mode][animation][1]
        let cycleFlag = this.modes[this.mode][animation][2]
        this.animator.action(animationId, timeScale, cycleFlag)
    }

    start() {
        this.animator.start()
    }

    stop() {
        this.animator.stop()
    }
}

export default CharacterController