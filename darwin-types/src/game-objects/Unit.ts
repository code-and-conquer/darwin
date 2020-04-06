import { GameObject, GAME_OBJECT_TYPES } from './GameObject';
import { Attributes } from './Attributes';

export type UnitType = typeof GAME_OBJECT_TYPES.UNIT;

export const MAX_HEALTH = 100;
export const INITIAL_HEALTH = MAX_HEALTH;
export const INITIAL_ATTRIBUTES: Attributes = {
  enduranceBoost: 0,
};

export interface Unit extends GameObject {
  type: UnitType;
  health: number;
  attributes: Attributes;
}
