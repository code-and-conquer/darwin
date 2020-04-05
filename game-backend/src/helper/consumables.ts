import {
  GAME_OBJECT_TYPES,
  GameObject,
  ObjectId,
  State,
  Consumable,
  ConsumableCategory,
  CONSUMABLE_CATEGORIES,
} from '@darwin/types';

import { getObjectById, getGameObjectsPerType } from './gameObjects';

export const getConsumable = (state: State, id: ObjectId): Consumable =>
  getObjectById(state, id) as Consumable;

export const getConsumablesPerCategory = (
  state: State,
  category: ConsumableCategory
): Consumable[] =>
  getGameObjectsPerType<Consumable>(state, GAME_OBJECT_TYPES.CONSUMABLE).filter(
    consumable => consumable.category === category
  );

export const countConsumablesPerCategory = (
  state: State,
  category: ConsumableCategory
): number => getConsumablesPerCategory(state, category).length;

export const countResources = (state: State): number =>
  countConsumablesPerCategory(state, CONSUMABLE_CATEGORIES.RESOURCE);

export const countPowerUps = (state: State): number =>
  countConsumablesPerCategory(state, CONSUMABLE_CATEGORIES.POWER_UP);

export const getConsumables = (gameObjects: GameObject[]): Consumable[] =>
  gameObjects.filter(obj => obj.isConsumable) as Consumable[];

export const getConsumablesFromState = (state: State): Consumable[] =>
  getConsumables(state.objectIds.map(id => state.objectMap[id]));
