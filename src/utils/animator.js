import machine from "./machine"
import * as THREE from 'three'

class Animator {
    constructor(mesh) {
        this.mixer = new THREE.AnimationMixer(mesh)
        this.clock = new THREE.Clock()
        this.clips = mesh.animations.map(animation => {
            return animation ? this.mixer.clipAction(animation) : false
        })
        this.lastClip = null
        this.interpolationTime = 0.2
        this.inProgress = false
    }

    run () {
        this.mixer.update(this.clock.getDelta())
    }

    start() {
        machine.addCallback(this.run.bind(this))
    }

    stop() {
        machine.removeCallback(this.run.bind(this))
    }

    onCycleFinished () {
        this.inProgress = false
    }

    action(animationId, timeScale, cycleFlag) {
        if (this.inProgress) return
        if (cycleFlag) {
            this.mixer.addEventListener('loop', this.onCycleFinished.bind(this))
            this.inProgress = true
        }
        this.mixer.timeScale = timeScale
        if (this.lastClip === null) {
            this.clips[animationId].play()
            this.lastClip = animationId
            return 
        }
        if (this.lastClip === animationId) {
            return 
        }
        this.clips[animationId].reset()
        this.clips[animationId].play()
        this.clips[this.lastClip].play().crossFadeTo(this.clips[animationId], this.interpolationTime, true)
    }
}


export default Animator 