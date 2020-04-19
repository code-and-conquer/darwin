import { GameObject, GameObjectTypes, ObjectId } from './GameObject';
import { PowerupType } from './Powerup';
import { UserContext } from '../UserContext';
import { State } from '../State';

export type Consume = (
  id: ObjectId,
  state: State,
  UserContext: UserContext
) => State;

export type ConsumableType = GameObjectTypes.Food | PowerupType;

export interface Consumable extends GameObject {
  type: ConsumableType;
}
