import { ObjectId } from './game-objects/GameObject';

export type UserContextId = string;

export interface UserContext {
  unitId: ObjectId;
}

export interface UserExecutionContext extends UserContext {
  userScript: UserScript;
}

export interface UserScript {
  script: string;
}
