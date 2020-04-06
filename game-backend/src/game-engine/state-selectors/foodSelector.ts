import { Consumable, GameObjectTypes, State, Unit } from '@darwin/types';
import getNearestObjectOfType from './helper';
import { getGameObjectsPerType } from '../../helper/gameObjects';

export const selectFoods = (state: State): Consumable[] => {
  return getGameObjectsPerType(state, GameObjectTypes.Food) as Consumable[];
};

export const getNearestFood = (state: State, unit: Unit): Consumable => {
  return getNearestObjectOfType<Consumable>(state, unit, GameObjectTypes.Food);
};
