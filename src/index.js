import CannonDebugger from 'cannon-es-debugger'
import camera from "./utils/camera";
import machine from "./utils/machine";
import renderer from "./utils/renderer";
import scene from "./utils/scene";
import { resize } from './utils/resize'
import { _light } from "./utils/light";
import keyListener from "./utils/keyListener";
import { mouse } from "./utils/mouse";
import { world, _world } from './utils/world';
import { _plane } from './utils/plane';
import { _floor } from './utils/floor';
import { _boxes } from './components/boxes';
import { _sphere } from './utils/sphere';
import { _pointerLockControls } from './components/PointerLockControls';
import { _ball } from './components/ball';
import { _balls } from './components/balls';
import { _player } from './components/player';

const cannonDebugRenderer = new CannonDebugger( scene, world )

_light.create()
_world.create()
_plane.create()
_floor.create()
// _boxes.create()
_player.create();
_ball.create()
_balls.create()
_sphere.create()
_pointerLockControls.create()

mouse.setCanvas(document.querySelector('canvas'))
mouse.start()

keyListener.start()
resize.start(renderer)

machine.addCallback(() => {

    cannonDebugRenderer.update()

    renderer.render(scene, camera);
})

machine.start()