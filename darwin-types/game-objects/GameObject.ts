import Position from '../Position';

export type ObjectId = string;

export interface GameObject {
  id: ObjectId;
  type: string;
  position: Position;
  moveBlocking: boolean;
}

export const GAME_OBJECT_TYPES = {
  UNIT: 'unit',
  FOOD: 'food',
};
