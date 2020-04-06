import { GameObject, GAME_OBJECT_TYPES } from './GameObject';

export type FoodType = typeof GAME_OBJECT_TYPES.FOOD;
export interface Consumable extends GameObject {
  type: FoodType;
}
