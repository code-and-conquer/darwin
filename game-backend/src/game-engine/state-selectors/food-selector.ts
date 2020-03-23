import { State } from '../../../../darwin-types/State';
import { Food } from '../../../../darwin-types/game-objects/Food';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';

const selectFoods = (state: State): Food[] => {
  return state.objectIds
    .map(objectId => state.objectMap[objectId])
    .filter(object => object.type === GAME_OBJECT_TYPES.FOOD);
};
export default selectFoods;
