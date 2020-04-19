import {
  GameObjectTypes,
  GameObject,
  Consumable,
  ObjectId,
  State,
} from '@darwin/types';
import { powerupList } from '../game-engine/mechanics/powerup-spawner/powerups/index';
import { getObjectById } from './gameObjects';

export const isConsumable = (
  gameObject: GameObject
): gameObject is Consumable =>
  [GameObjectTypes.Food, ...powerupList].indexOf(gameObject.type) >= 0;

export const filterConsumables = (gameObjects: GameObject[]): Consumable[] =>
  gameObjects.filter(isConsumable);

export const getConsumable = (state: State, id: ObjectId): Consumable =>
  getObjectById<Consumable>(state, id);
