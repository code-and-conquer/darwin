import { ObjectId } from './game-objects';
import { Feedback } from './Feedback';

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

export interface UserContextContainer {
  userContextMap: Record<UserId, UserExecutionContext>;
  userContextIds: UserId[];
}

export interface UserExecutionFeedback {
  store: UserStore;
  feedback: Feedback[];
}

export interface UserExecutionFeedbackContainer {
  userMap: Record<UserId, UserExecutionFeedback>;
  userIds: UserId[];
}

// "unknown" because the user is allowed to store anything in there.
export type UserStore = Record<string, unknown>;
