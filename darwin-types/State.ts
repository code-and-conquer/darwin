import {GameObject, ObjectId} from "./GameObject";
import { UserContext, UserContextId } from './UserContext';

export interface State {
  objectMap: Record<ObjectId, GameObject>
  objectIds: ObjectId[]
  userContextMap: Record<UserContextId, UserContext>
  userContextIds: UserContextId[]
}
