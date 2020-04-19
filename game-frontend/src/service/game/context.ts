import { createContext, useContext, useEffect, useReducer } from 'react';
import createPersistedState from 'use-persisted-state';
import { v4 as uuidv4 } from 'uuid';
import { Message, UserId } from '@darwin/types';
import {
  API_URL,
  ContextState,
  emptyWebsocketContext,
  socketUpdateAction,
} from './types';
import reducer from './reducer';

const USER_ID_QUERY_PARAM = 'userId';
const useUserId = createPersistedState(USER_ID_QUERY_PARAM);

export const WebsocketContext = createContext<ContextState>(
  emptyWebsocketContext
);

export function useWebsocket(): ContextState {
  const [userId, setUserId] = useUserId<UserId>(() => uuidv4());
  const [contextState, dispatch] = useReducer(reducer, emptyWebsocketContext);
  const { socket } = contextState;

  useEffect(() => {
    const params = new URLSearchParams();
    params.set(USER_ID_QUERY_PARAM, userId);

    dispatch(
      socketUpdateAction(new WebSocket(`${API_URL}?${params.toString()}`))
    );
  }, [userId, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', event => {
        const action: Message = JSON.parse(event.data);
        dispatch(action);
      });
    }
  }, [socket, setUserId, dispatch]);
  return contextState;
}

export function useWebsocketContext(): ContextState {
  return useContext(WebsocketContext);
}
