import WebSocket from 'ws';
import { UserContext, UserContextId } from '../../darwin-types/UserContext';
import { State } from '../../darwin-types/State';

export interface ServerStore {
  matchState: State;
  userContexts: {
    userContextMap: Record<UserContextId, UserContext>;
    userContextIds: UserContextId[];
  };
  connections: [string, WebSocket][];
}

export const createStore = (): ServerStore => {
  return {
    matchState: {
      objectIds: [],
      objectMap: {},
      tick: 0,
    },
    userContexts: {
      userContextIds: [],
      userContextMap: {},
    },
    connections: [],
  };
};
