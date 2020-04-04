import { GAME_OBJECT_TYPES } from './GameObject';
import { Consumable } from './Consumable';

export type PowerUpType = typeof GAME_OBJECT_TYPES.POWER_UP;

export interface PowerUp extends Consumable {
  type: PowerUpType;
  subType: string;
}
