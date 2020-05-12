import React, { FC, useMemo, useEffect, useState } from 'react';
import { State, UserContext, Message, Feedback, Role } from '@darwin/types';
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

export function useFeedback(): Feedback[] {
  const { feedback } = useWebsocketContext();
  return feedback;
}

export function useSendMessage(): (message: Message) => void {
  const { socket } = useWebsocketContext();
  const socketReadyState = socket?.readyState;

  const send = useMemo(() => {
    // console.log('socket', socket);
    // console.log('socket state', socket?.readyState);
    return (message: Message): void => {
      console.log('socket', socket);
      console.log('socket state', socketReadyState);
      if (socket && socketReadyState === 1) {
        socket.send(JSON.stringify(message));
      }
    };
  }, [socket, socketReadyState]);

  return send;
}
