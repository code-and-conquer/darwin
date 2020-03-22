import { State } from '../../../../darwin-types/State';
import { Food } from '../../../../darwin-types/game-objects/Food';
import {
  GameObject,
  GAME_OBJECT_TYPES,
} from '../../../../darwin-types/game-objects/GameObject';

const selectFoods = (state: State): Food[] => {
  const gameObjects: GameObject[] = state.objectIds.map(
    objectId => state.objectMap[objectId]
  );
  return gameObjects.filter(object => object.type === GAME_OBJECT_TYPES.FOOD);
};
export default selectFoods;
