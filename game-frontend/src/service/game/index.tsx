import React, { FC, useCallback, useEffect, useState } from 'react';
import { Feedback, Message, State, UserContext } from '@darwin/types';
import { useWebsocket, useWebsocketContext, WebsocketContext } from './context';
import { useRoleRequestor } from './role';

const RoleRequestor: FC = props => {
  useRoleRequestor();
  return <>{props.children}</>;
};

export const WebsocketProvider: FC = props => {
  const websocketData = useWebsocket();
  return (
    <WebsocketContext.Provider value={websocketData}>
      <RoleRequestor {...props} />
    </WebsocketContext.Provider>
  );
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

  const send = useCallback(
    (message: Message): void => {
      setMessageQueue([...messageQueue, message]);
    },
    [messageQueue]
  );

  useEffect(() => {
    if (socket && !socketReady) {
      socket.addEventListener('open', (): void => {
        setSocketReady(true);
      });
    }
  }, [socket, messageQueue, socketReady, setSocketReady]);

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
