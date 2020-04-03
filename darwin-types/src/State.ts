import { GameObject, ObjectId } from './game-objects';

export interface State {
  objectMap: Record<ObjectId, GameObject>;
  objectIds: ObjectId[];
}
