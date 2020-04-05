import { GameObject, GAME_OBJECT_TYPES } from './GameObject';
import { ATTRIBUTES } from './Unit';

export type ConsumableType = typeof GAME_OBJECT_TYPES.CONSUMABLE;

export const POWER_UP_TYPES = {
  [ATTRIBUTES.ENDURANCE_BOOST]: ATTRIBUTES.ENDURANCE_BOOST,
};

export const powerUpTypes = Object.values(POWER_UP_TYPES);

export const CONSUMABLE_SUBTYPES = {
  FOOD: 'FOOD' as 'FOOD',
  ...POWER_UP_TYPES,
};

export const CONSUMABLE_CATEGORIES = {
  RESOURCE: 'RESOURCE' as 'RESOURCE',
  POWER_UP: 'POWER_UP' as 'POWER_UP',
};

export type ConsumableSubtype = keyof typeof CONSUMABLE_SUBTYPES;
export type PowerUpType = keyof typeof POWER_UP_TYPES;
export type ConsumableCategory = keyof typeof CONSUMABLE_CATEGORIES;

export interface Consumable extends GameObject {
  isConsumable: true;
  subType: ConsumableSubtype;
  category: ConsumableCategory;
}
