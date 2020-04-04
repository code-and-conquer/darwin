import { GameObject, GAME_OBJECT_TYPES } from './GameObject';

export type UnitType = typeof GAME_OBJECT_TYPES.UNIT;

export const MAX_HEALTH = 100;
export const INITIAL_HEALTH = MAX_HEALTH;

export const ATTRIBUTES = {
  ENDURANCE_BOOST: 'enduranceBoost' as 'enduranceBoost',
};

export const INITIAL_ATTRIBUTES: Attributes = {
  [ATTRIBUTES.ENDURANCE_BOOST]: 0,
};

export type AttributeBoundary = { max: number; min: number };
export type AttributeName = keyof Attributes;
export type AttributeBoundaries = Record<keyof Attributes, AttributeBoundary>;

export const ATTRIBUTE_BOUNDARIES: AttributeBoundaries = {
  [ATTRIBUTES.ENDURANCE_BOOST]: { max: 2, min: -2 },
};

export type Attributes = {
  [ATTRIBUTES.ENDURANCE_BOOST]: number;
};

export interface Unit extends GameObject {
  type: UnitType;
  health: number;
  isConsumable: false;
  attributes: Attributes;
}
