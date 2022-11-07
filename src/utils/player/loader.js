import Loader from "../loader"
import animations from './animations'

const folder = "src/models/character/"

const list = []

Object.keys(animations).forEach((element, index) => {
    list[index] = folder + "animations/" + animations[index]
})

const Character = (new Loader(folder + 'character.fbx', list, 0.01)).getModel()

const modes = {
    'normal': {
        'idle': [0, 1, false],
        'walk': [1, 1, false],
        'left': [2, 1, false],
        'right': [3, 1, false]
    }
}

export default Character

export { modes }