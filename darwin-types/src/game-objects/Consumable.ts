import { GameObject, GameObjectTypes } from './GameObject';

export interface Consumable extends GameObject {
  type: GameObjectTypes.Food | GameObjectTypes.EnduranceBoost;
}
