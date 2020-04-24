import { State, Tick, UserContext, Message, Feedback } from '@darwin/types';

export type ContextState = {
  state: State;
  userContext: UserContext;
  feedback: Feedback[];
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
  feedback: [],
  meta: {
    currentTick: 0,
  },
  socket: undefined,
};

export const API_URL = process.env.REACT_APP_BACKEND_URL as string;
