import { State } from '../../../../darwin-types/State';
import { Food } from '../../../../darwin-types/game-objects/Food';
import { GAME_OBJECT_TYPES } from '../../../../darwin-types/game-objects/GameObject';
import { getGameObjectsPerType } from '../../helper/gameObjects';
import { Unit } from '../../../../darwin-types/game-objects/Unit';
import getNearestObjectOfType from './helper';

export const selectFoods = (state: State): Food[] => {
  return getGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);
};

export const getNearestFood = (state: State, unit: Unit): Food => {
  return getNearestObjectOfType<Food>(state, unit, GAME_OBJECT_TYPES.FOOD);
};
