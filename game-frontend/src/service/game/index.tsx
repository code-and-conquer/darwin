import React, { FC, useMemo } from 'react';
import { State, UserContext, Message } from '@darwin/types';
import { useWebsocket, useWebsocketContext, WebsocketContext } from './context';

export const WebsocketProvider: FC = props => {
  const websocketData = useWebsocket();
  return <WebsocketContext.Provider value={websocketData} {...props} />;
};

export function useGameState(): State {
  const { state } = useWebsocketContext();
  return state;
}

export function useUserContext(): UserContext {
  const { userContext } = useWebsocketContext();
  return userContext;
}

export function useSendMessage(): (message: Message) => void {
  const { socket } = useWebsocketContext();

  const send = useMemo(
    () => (message: Message): void => {
      if (socket) {
        socket.send(JSON.stringify(message));
      }
    },
    [socket]
  );

  return send;
}
