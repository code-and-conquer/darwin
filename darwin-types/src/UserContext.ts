import { ObjectId } from './game-objects';

export type UserId = string;

export interface UserContext {
  unitId: ObjectId;
}

export interface UserExecutionContext extends UserContext {
  userScript: UserScript;
  store: UserStore;
}

export interface UserScript {
  script: string;
}

export interface UserStore {
  // "unknown" because the user is allowed to store anything in there.
  store: Record<string, unknown>;
}
