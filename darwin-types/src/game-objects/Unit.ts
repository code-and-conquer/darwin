import { GameObject, GameObjectTypes } from './GameObject';
import { Attributes } from './Attributes';

export const MAX_HEALTH = 100;
export const INITIAL_HEALTH = MAX_HEALTH;
export const INITIAL_ATTRIBUTES: Attributes = {
  enduranceBoost: 0,
  healthRegenBoost: 0,
};

export interface Unit extends GameObject {
  type: GameObjectTypes.Unit;
  health: number;
  attributes: Attributes;
}
