import { GameObject, GAME_OBJECT_TYPES } from './GameObject';

export type UnitType = typeof GAME_OBJECT_TYPES.UNIT;

export const MAX_HEALTH = 100;
export const INITIAL_HEALTH = MAX_HEALTH;

export interface Unit extends GameObject {
  type: UnitType;
  health: number;
  isConsumable: false;
}
