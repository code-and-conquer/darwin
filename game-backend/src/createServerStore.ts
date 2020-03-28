import WebSocket from 'ws';
import { UserId } from '../../darwin-types/UserContext';

export interface ServerStore {
  userContexts: {
    userContextMap: Record<UserId, WebSocket[]>;
    userContextIds: UserId[];
  };
}

export const createServerStore = (): ServerStore => {
  return {
    userContexts: {
      userContextIds: [],
      userContextMap: {},
    },
  };
};
