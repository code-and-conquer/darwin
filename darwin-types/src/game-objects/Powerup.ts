import { GameObjectTypes } from './GameObject';

export type PowerupType =
  | GameObjectTypes.EnduranceBoost
  | GameObjectTypes.Teleport
  | GameObjectTypes.HealthRegenBoost;
