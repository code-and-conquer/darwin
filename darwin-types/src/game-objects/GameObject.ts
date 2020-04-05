import { Position } from '../Position';

export type ObjectId = string;

export interface GameObject {
  id: ObjectId;
  type: string;
  position: Position;
  moveBlocking: boolean;
  isConsumable: boolean;
}

export const GAME_OBJECT_TYPES = {
  UNIT: 'unit',
  CONSUMABLE: 'consumable',
};
