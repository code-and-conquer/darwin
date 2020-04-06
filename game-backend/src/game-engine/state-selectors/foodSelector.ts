import { Consumable, GAME_OBJECT_TYPES, State, Unit } from '@darwin/types';
import getNearestObjectOfType from './helper';
import { getGameObjectsPerType } from '../../helper/gameObjects';

export const selectFoods = (state: State): Consumable[] => {
  return getGameObjectsPerType(state, GAME_OBJECT_TYPES.FOOD);
};

export const getNearestFood = (state: State, unit: Unit): Consumable => {
  return getNearestObjectOfType<Consumable>(
    state,
    unit,
    GAME_OBJECT_TYPES.FOOD
  );
};
