import { createContext, useContext, useEffect, useReducer } from 'react';
import createPersistedState from 'use-persisted-state';
import { v4 as uuidv4 } from 'uuid';
import { Message, UserId, Role, RoleResponse } from '@darwin/types';
import {
  API_URL,
  ContextState,
  emptyWebsocketContext,
  socketUpdateAction,
} from './types';
import reducer from './reducer';

const USER_ID_QUERY_PARAM = 'userId';
export const ROLE_LOCAL_STORAGE_KEY = 'role';
const useUserId = createPersistedState(USER_ID_QUERY_PARAM);
const usePersistRole = createPersistedState(ROLE_LOCAL_STORAGE_KEY);

export const WebsocketContext = createContext<ContextState>(
  emptyWebsocketContext
);

export function useWebsocket(): ContextState {
  const [userId, setUserId] = useUserId<UserId>(() => uuidv4());
  const [role, setRole] = usePersistRole<Role | null>(() => null);
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
        const message: Message = JSON.parse(event.data);
        dispatch(message);
      });
      // persist role choice
      socket.addEventListener('message', event => {
        const message: Message = JSON.parse(event.data);
        if (message.type === 'roleResponse') {
          const { newRole } = (message as RoleResponse).payload;
          setRole(newRole);
        }
      });
    }
  }, [socket, setUserId, dispatch, setRole]);

  // set initial role from localStorage
  useEffect(() => {
    if (role) {
      const message: RoleResponse = {
        type: 'roleResponse',
        payload: { newRole: role },
      };
      dispatch(message);
    }
  });
  return contextState;
}

export function useWebsocketContext(): ContextState {
  return useContext(WebsocketContext);
}
