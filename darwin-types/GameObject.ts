import Position from './Position';

export type ObjectId = string;

export interface GameObject {
  id: ObjectId;
  position: Position;
}
