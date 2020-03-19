import { GameObject, ObjectId } from './game-objects/GameObject';

export interface State {
  objectMap: Record<ObjectId, GameObject>;
  objectIds: ObjectId[];
}
