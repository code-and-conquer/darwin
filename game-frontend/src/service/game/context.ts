import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import createPersistedState from 'use-persisted-state';
import {
  API_URL,
  ContextState,
  emptyWebsocketContext,
  socketUpdateAction,
} from './types';
import reducer from './reducer';
import { Message } from '../../../../darwin-types/messages/Message';
import { ConnectionInitialization } from '../../../../darwin-types/messages/ConnectionInitialization';
import { UserId } from '../../../../darwin-types/UserContext';

const USER_ID_QUERY_PARAM = 'userId';
const useUserId = createPersistedState(USER_ID_QUERY_PARAM);

export const WebsocketContext = createContext<ContextState>(
  emptyWebsocketContext
);

export function useWebsocket(): ContextState {
  const [userId, setUserId] = useUserId<UserId | null>(null);
  const selfObtainedUserIdRef = useRef<UserId | null>(null);
  const [contextState, dispatch] = useReducer(reducer, emptyWebsocketContext);
  const { socket } = contextState;

  useEffect(() => {
    const hasNoActiveUserId = userId === null;
    const hasObtainedUserIdInCurrentTab =
      selfObtainedUserIdRef.current === userId;
    if (hasNoActiveUserId || !hasObtainedUserIdInCurrentTab) {
      const params = new URLSearchParams();
      if (userId !== null) {
        params.set(USER_ID_QUERY_PARAM, userId);
      }
      dispatch(
        socketUpdateAction(new WebSocket(`${API_URL}?${params.toString()}`))
      );
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const handleConnectionInitialization = (
      message: ConnectionInitialization
    ): void => {
      selfObtainedUserIdRef.current = message.payload.userId;
      setUserId(message.payload.userId);
    };
    if (socket) {
      socket.addEventListener('message', event => {
        const action: Message = JSON.parse(event.data);
        switch (action.type) {
          case 'connectionInitialization':
            handleConnectionInitialization(action as ConnectionInitialization);
            break;
          default:
            dispatch(action);
        }
      });
    }
  }, [socket, setUserId, dispatch]);
  return contextState;
}

export function useWebsocketContext(): ContextState {
  return useContext(WebsocketContext);
}
