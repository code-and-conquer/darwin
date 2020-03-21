import { State } from '../../../../darwin-types/State';
import { UserContext } from '../../../../darwin-types/UserContext';
import { Tick } from '../../../../darwin-types/Tick';
import { Message } from '../../../../darwin-types/messages/Message';

export type ContextState = {
  state: State;
  userContext: UserContext;
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
  meta: {
    currentTick: 0,
  },
  socket: undefined,
};

export const API_URL = process.env.REACT_APP_BACKEND_URL as string;
