import { State, Consumable, GameObject } from '@darwin/types';
import powerupMap from '../game-engine/mechanics/powerup-spawner/powerups/index';

const isPowerUp = (obj: GameObject): obj is Consumable =>
  obj.type in powerupMap;

export const filterPowerups = (objects: GameObject[]): Consumable[] =>
  objects.filter(isPowerUp);

export const getPowerups = (state: State): Consumable[] =>
  filterPowerups(state.objectIds.map(id => state.objectMap[id]));

export const countPowerups = (state: State): number =>
  getPowerups(state).length;
