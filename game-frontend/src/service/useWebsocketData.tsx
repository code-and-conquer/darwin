import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Message } from '../../../darwin-types/messages/Message';
import { State } from '../../../darwin-types/State';
import { MatchUpdate } from '../../../darwin-types/messages/MatchUpdate';
import { UserContext } from '../../../darwin-types/UserContext';
import { Tick } from '../../../darwin-types/Tick';

type ContextState = {
  state: State;
  userContext: UserContext;
  meta: {
    currentTick: Tick;
  };
  socket: WebSocket | undefined;
};

const socketUpdateAction = (payload: WebSocket): Message => ({
  type: 'socketUpdate',
  payload,
});

const reducer = (state: ContextState, action: Message): ContextState => {
  switch (action.type) {
    case 'socketUpdate':
      return {
        ...state,
        socket: action.payload as WebSocket,
      };
    case 'matchUpdate':
      return {
        ...state,
        ...(action as MatchUpdate).payload,
      };

    default:
      return state;
  }
};

const API_URL = process.env.REACT_APP_BACKEND_URL as string;
const emptyState: State = { objectMap: {}, objectIds: [] };
const emptyWebsocketContext: ContextState = {
  state: emptyState,
  userContext: {
    unitId: '',
  },
  meta: {
    currentTick: 0,
  },
  socket: undefined,
};

const WebsocketContext = createContext<ContextState>(emptyWebsocketContext);

function useInitWebsocket(): ContextState {
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

export const WebsocketProvider: FC = props => {
  const websocketData = useInitWebsocket();
  return <WebsocketContext.Provider value={websocketData} {...props} />;
};

function useWebsocketData(): ContextState {
  return useContext(WebsocketContext);
}

export function useGameState(): State {
  const { state } = useWebsocketData();
  return state;
}

export function useUserContext(): UserContext {
  const { userContext } = useWebsocketData();
  return userContext;
}

export function useWebsocket(): (message: Message) => void {
  const { socket } = useWebsocketData();

  const send = (message: Message): void => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };
  return send;
}
