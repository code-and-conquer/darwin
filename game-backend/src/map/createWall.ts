import hyperid from 'hyperid';
import { Position, GameObject, GameObjectTypes } from '@darwin/types';

const createId = hyperid();

const createWall = (position: Position): GameObject => ({
  id: createId(),
  moveBlocking: true,
  type: GameObjectTypes.Wall,
  position,
});

export default createWall;
