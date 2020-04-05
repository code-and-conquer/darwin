import {
  Consumable,
  GAME_OBJECT_TYPES,
  Position,
  CONSUMABLE_SUBTYPES,
  CONSUMABLE_CATEGORIES,
} from '@darwin/types';

export const FOOD_REGENERATION_VALUE = 20;

const createFood = ({
  id,
  position,
}: {
  id: string;
  position: Position;
}): Consumable => ({
  id,
  position,
  type: GAME_OBJECT_TYPES.CONSUMABLE,
  category: CONSUMABLE_CATEGORIES.RESOURCE,
  subType: CONSUMABLE_SUBTYPES.FOOD,
  moveBlocking: false,
  isConsumable: true,
});

export default createFood;
