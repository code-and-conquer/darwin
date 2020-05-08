import {
  State,
  Tick,
  UserContext,
  Message,
  Feedback,
  Role,
} from '@darwin/types';

export type ContextState = {
  state: State;
  userContext: UserContext;
  feedback: Feedback[];
  role: Role;
  meta: {
    currentTick: Tick;
  };
  socket: WebSocket | undefined;
};

export const socketUpdateAction = (payload: WebSocket): Message => ({
  type: 'socketUpdate',
  payload,
});

export const emptyState: State = { objectMap: {}, objectIds: [] };
export const emptyWebsocketContext: ContextState = {
  state: emptyState,
  userContext: {
    unitId: '',
  },
  role: Role.SPECTATOR,
  feedback: [],
  meta: {
    currentTick: 0,
  },
  socket: undefined,
};

export const API_URL = process.env.REACT_APP_BACKEND_URL as string;
