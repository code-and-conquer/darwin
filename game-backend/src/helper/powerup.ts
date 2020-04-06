import {
  State,
  Consumable,
  GameObjectTypes,
  Consume,
  GameObject,
} from '@darwin/types';
import powerupMap from '../game-engine/mechanics/powerup-spawner/powerups/index';

export const filterPowerups = (objects: GameObject[]): Consumable[] =>
  objects.filter(
    obj => !!(powerupMap as Record<GameObjectTypes, Consume>)[obj.type]
  ) as Consumable[];

export const getPowerups = (state: State): Consumable[] =>
  filterPowerups(state.objectIds.map(id => state.objectMap[id]));

export const countPowerups = (state: State): number =>
  getPowerups(state).length;
