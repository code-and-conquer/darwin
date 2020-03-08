import {GameObject, ObjectId} from './GameObject';

export interface State {
  objectMap: Record<ObjectId, GameObject>
  objectIds: ObjectId[]
}
