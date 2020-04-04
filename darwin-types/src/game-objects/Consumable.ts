import { GameObject } from './GameObject';
import { State } from '../State';
import { UserContext } from '../UserContext';

export type Consume = (state: State, userContext: UserContext) => State;

export interface Consumable extends GameObject {
  consume: Consume;
  isConsumable: true;
}
