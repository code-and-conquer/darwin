import { GameObjectTypes, GameObject, Consumable } from '@darwin/types';
import { powerupList } from '../game-engine/mechanics/powerup-spawner/powerups/index';

export const isConsumable = (gameObject: GameObject): boolean =>
  [GameObjectTypes.Food, ...powerupList].indexOf(gameObject.type) >= 0;

export const filterConsumables = (gameObjects: GameObject[]): Consumable[] =>
  gameObjects.filter(isConsumable) as Consumable[];
