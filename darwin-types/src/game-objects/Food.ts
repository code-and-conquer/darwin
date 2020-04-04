import { GAME_OBJECT_TYPES } from './GameObject';
import { Consumable } from './Consumable';

export type FoodType = typeof GAME_OBJECT_TYPES.FOOD;
export interface Food extends Consumable {
  type: FoodType;
}
