import WebSocket from 'ws';
import { UserId, Role } from '@darwin/types';

interface UserConnnection {
  connections: WebSocket[];
  role: Role;
}

export interface ServerStore {
  userConnnections: {
    userConnectionMap: Record<UserId, UserConnnection>;
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
