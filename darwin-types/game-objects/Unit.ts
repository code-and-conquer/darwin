import { GameObject, GAME_OBJECT_TYPES } from './GameObject';

export type UnitType = typeof GAME_OBJECT_TYPES.UNIT;
export interface Unit extends GameObject {
  type: UnitType;
  health: number;
}
