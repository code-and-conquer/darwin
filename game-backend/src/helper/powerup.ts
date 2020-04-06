import { State, Consumable, GameObjectTypes, Consume } from '@darwin/types';
import powerupMap from '../game-engine/mechanics/powerup-spawner/powerups/index';

export const getPowerups = (state: State): Consumable[] =>
  state.objectIds
    .map(id => state.objectMap[id])
    .filter(
      obj => !!(powerupMap as Record<GameObjectTypes, Consume>)[obj.type]
    ) as Consumable[];

export const countPowerups = (state: State): number =>
  getPowerups(state).length;
