import WebSocket from 'ws';
import {
  UserContextId,
  UserExecutionContext,
} from '../../darwin-types/UserContext';
import { State } from '../../darwin-types/State';

export type ConnectionId = string;

export interface UserEntry {
  userContext: UserExecutionContext;
  connections: WebSocket[];
}

export interface ServerStore {
  matchState: State;
  userContexts: {
    userContextMap: Record<UserContextId, UserEntry>;
    userContextIds: UserContextId[];
  };
  currentTick: number;
}

export const createStore = (): ServerStore => {
  return {
    matchState: {
      objectIds: [],
      objectMap: {},
    },
    userContexts: {
      userContextIds: [],
      userContextMap: {},
    },
    currentTick: 0,
  };
};
