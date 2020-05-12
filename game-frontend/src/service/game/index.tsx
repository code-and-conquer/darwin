import React, { FC, useEffect, useMemo, useState } from 'react';
import { Feedback, Message, State, UserContext } from '@darwin/types';
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
  const [messageQueue, setMessageQueue] = useState<Message[]>([]);
  const [socketReady, setSocketReady] = useState(socket?.readyState === 1);

  const send = useMemo(() => {
    return (message: Message): void => {
      setMessageQueue([...messageQueue, message]);
    };
  }, [messageQueue]);

  useEffect(() => {
    if (socket) {
      socket.addEventListener('open', (): void => {
        setSocketReady(true);
      });
    }
  }, [socket, setSocketReady]);

  useEffect(() => {
    if (socket && socketReady && messageQueue.length > 0) {
      messageQueue.forEach(message => {
        socket.send(JSON.stringify(message));
      });
      setMessageQueue([]);
    }
  }, [messageQueue, socketReady, socket]);

  return send;
}
