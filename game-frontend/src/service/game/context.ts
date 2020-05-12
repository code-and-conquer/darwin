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
import {
  usePersistRole,
  handleRoleResponse,
  createRoleRequestMessage,
  useRole,
} from './role';

const USER_ID_QUERY_PARAM = 'userId';
const useUserId = createPersistedState(USER_ID_QUERY_PARAM);

export const WebsocketContext = createContext<ContextState>(
  emptyWebsocketContext
);

export function useWebsocket(): ContextState {
  const [userId, setUserId] = useUserId<UserId>(() => uuidv4());
  // const [role, setRole] = usePersistRole<Role | null>(null);
  const [, setRole] = useRole();
  const [contextState, dispatch] = useReducer(reducer, emptyWebsocketContext);
  const { socket } = contextState;

  // const socketReadyState = socket?.readyState;

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
        switch (action.type) {
          case 'roleResponse':
            handleRoleResponse(action as RoleResponse, setRole);
            break;
          default:
            dispatch(action);
        }
      });
    }
  }, [socket, setUserId, dispatch, setRole]);

  // get initial role from storage and tell the server
  // useEffect(() => {
  //   console.log('role', role);
  //   console.log('socket ready', socket?.readyState);

  //   if (role && socket?.readyState === WebSocket.OPEN) {
  //     console.log(role);
  //     socket.send(JSON.stringify(createRoleRequestMessage(role)));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket, socketReadyState]);
  return contextState;
}

export function useWebsocketContext(): ContextState {
  return useContext(WebsocketContext);
}
