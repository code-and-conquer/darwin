import { ObjectId } from './game-objects/GameObject';

export type UserId = string;

export interface UserContext {
  unitId: ObjectId;
}

export interface UserExecutionContext extends UserContext {
  userScript: UserScript;
}

export interface UserScript {
  script: string;
}
