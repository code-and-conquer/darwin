import { Food, GAME_OBJECT_TYPES, State, Unit } from '@darwin/types';
import getNearestObjectOfType from './helper';
import { getGameObjectsPerType } from '../../helper/gameObjects';

export const selectFoods = (state: State): Food[] => {
  return getGameObjectsPerType<Food>(state, GAME_OBJECT_TYPES.FOOD);
};

export const getNearestFood = (state: State, unit: Unit): Food => {
  return getNearestObjectOfType<Food>(state, unit, GAME_OBJECT_TYPES.FOOD);
};
