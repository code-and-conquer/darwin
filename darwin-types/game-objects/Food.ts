import { GameObject, GAME_OBJECT_TYPES } from './GameObject';

export type FoodType = typeof GAME_OBJECT_TYPES.FOOD;
export interface Food extends GameObject {
  type: FoodType;
}
