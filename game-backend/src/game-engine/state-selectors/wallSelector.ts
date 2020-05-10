import { GameObjectTypes, State, GameObject } from '@darwin/types';
import { getGameObjectsPerType } from '../../helper/gameObjects';

const selectWalls = (state: State): GameObject[] => {
  return getGameObjectsPerType(state, GameObjectTypes.Wall);
};

export default selectWalls;
