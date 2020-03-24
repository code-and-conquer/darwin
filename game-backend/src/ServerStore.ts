import WebSocket from 'ws';
import { UserId, UserExecutionContext } from '../../darwin-types/UserContext';
import { State } from '../../darwin-types/State';

export interface UserEntry {
  userContext: UserExecutionContext;
  connections: WebSocket[];
}

export interface ServerStore {
  matchState: State;
  userContexts: {
    userContextMap: Record<UserId, UserEntry>;
    userContextIds: UserId[];
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
