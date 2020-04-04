import { FoodType, UnitType, PowerUpType } from '@darwin/types';

const GAME_OBJECT_TYPES: {
  UNIT: UnitType;
  FOOD: FoodType;
  POWER_UP: PowerUpType;
} = {
  UNIT: 'unit',
  FOOD: 'food',
  POWER_UP: 'powerUp',
};

export default GAME_OBJECT_TYPES;
