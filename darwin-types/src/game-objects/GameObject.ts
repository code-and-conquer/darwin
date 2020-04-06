import { Position } from '../Position';

export type ObjectId = string;

export enum GameObjectTypes {
  Unit = 'unit',
  Food = 'food',
  EnduranceBoost = 'enduranceBoost',
}

export interface GameObject {
  id: ObjectId;
  type: GameObjectTypes;
  position: Position;
  moveBlocking: boolean;
}
