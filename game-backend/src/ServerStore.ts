import WebSocket from 'ws';
import { UserContext, UserContextId } from '../../darwin-types/UserContext';
import { State } from '../../darwin-types/State';

export type ConnectionId = string;

export interface ServerStore {
  matchState: State;
  userContexts: {
    userContextMap: Record<UserContextId, UserContext>;
    userContextIds: UserContextId[];
  };
  connections: [ConnectionId, WebSocket][];
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
    connections: [],
    currentTick: 0,
  };
};
