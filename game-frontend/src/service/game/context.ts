import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  API_URL,
  ContextState,
  emptyWebsocketContext,
  socketUpdateAction,
} from './types';
import reducer from './reducer';
import { Message } from '../../../../darwin-types/messages/Message';

export const WebsocketContext = createContext<ContextState>(
  emptyWebsocketContext
);

export function useWebsocket(): ContextState {
  const [contextState, dispatch] = useReducer(reducer, emptyWebsocketContext);
  const { socket } = contextState;

  useEffect(() => {
    dispatch(socketUpdateAction(new WebSocket(API_URL)));
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', event => {
        const action: Message = JSON.parse(event.data);

        dispatch(action);
      });
    }
  }, [socket, dispatch]);
  return contextState;
}

export function useWebsocketContext(): ContextState {
  return useContext(WebsocketContext);
}
