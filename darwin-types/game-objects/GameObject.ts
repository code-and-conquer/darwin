import Position from '../Position';

export type ObjectId = string;

export interface GameObject {
  id: ObjectId;
  type: string;
  position: Position;
}
