import scene from '../utils/scene'
import * as CANNON from 'cannon-es'
import machine from '../utils/machine'
import Character, { modes } from '../utils/player/loader'
import CharacterController from '../utils/CharacterController'
import { sphereBody } from '../utils/sphere'
import { canJump, yawObject } from './PointerLockControls'
import keyListener from '../utils/keyListener'
import { KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_UP } from '../Constans/constans'

var status = false

class Player {
    constructor() {
        this._canJump = canJump
    }

    create() {
        Character.then(object => {
            scene.add(object)
            const cc = new CharacterController(object, modes)
            cc.start()
            cc.run('idle')
            machine.addCallback(() => {
                // if (keyListener.isPressed(KEY_UP)) {
                //     cc.run('walk')
                // }

                // if (keyListener.isPressed(KEY_LEFT)) {
                //     cc.run('left')
                // }

                // if (keyListener.isPressed(KEY_RIGHT)) {
                //     cc.run('right')
                // }

                object.position.copy(
                    new CANNON.Vec3(
                        sphereBody.position.x,
                        sphereBody.position.y - 1,
                        sphereBody.position.z
                    )
                )

                object.rotation.y = yawObject.rotation.y + 3.2
            })
        })
    }
}

const _player = new Player()

export { _player }

export default Player