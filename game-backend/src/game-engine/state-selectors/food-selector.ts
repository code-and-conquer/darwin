import { State } from '../../../../darwin-types/State';
import { Food } from '../../../../darwin-types/game-objects/Food';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';
import { getGameObjectsPerType } from '../../helper/gameObjects';

const selectFoods = (state: State): Food[] => {
  return getGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);
};
export default selectFoods;
