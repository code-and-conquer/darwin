import WebSocket from 'ws';
import { UserId } from '@darwin/types';

export interface ServerStore {
  userConnnections: {
    userConnectionMap: Record<UserId, WebSocket[]>;
    userConnectionIds: UserId[];
  };
}

export const createServerStore = (): ServerStore => {
  return {
    userConnnections: {
      userConnectionIds: [],
      userConnectionMap: {},
    },
  };
};
