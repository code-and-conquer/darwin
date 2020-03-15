import React, {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useState,
  FC,
} from 'react';
import { Message } from '../../../darwin-types/messages/Message';
import { State } from '../../../darwin-types/State';
import { MatchUpdate } from '../../../darwin-types/messages/MatchUpdate';

type ContextState = {
  state: State;
  socket: WebSocket | undefined;
};

const reducer = (state: State, action: Message): State => {
  switch (action.type) {
    case 'matchUpdate': {
      return (action as MatchUpdate).payload.state;
    }
    default:
      return state;
  }
};

const API_URL = process.env.REACT_APP_BACKEND_URL as string;
const emptyState: State = { objectMap: {}, objectIds: [] };

const WebsocketContext = createContext<ContextState>({
  state: emptyState,
  socket: undefined,
});

function useInitWebsocket(): ContextState {
  const [gameState, dispatch] = useReducer(reducer, emptyState);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    setSocket(new WebSocket(API_URL));
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.addEventListener('message', event => {
        const action: Message = JSON.parse(event.data);

        dispatch(action);
      });
    }
  }, [socket, dispatch]);
  return { state: gameState, socket };
}

export const WebsocketProvider: FC = props => {
  const websocketData = useInitWebsocket();
  return <WebsocketContext.Provider value={websocketData} {...props} />;
};

function useWebsocketData(): ContextState {
  return useContext(WebsocketContext);
}

export function useGameState(): State {
  const { state } = useContext(WebsocketContext);
  return state;
}

export function useWebsocket(): (message: Message) => void {
  const { socket } = useContext(WebsocketContext);

  const send = (message: Message): void => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };
  return send;
}

export default useWebsocketData;
