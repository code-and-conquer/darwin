import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { Message } from '../../../darwin-types/messages/Message';
import { State } from '../../../darwin-types/State';
import { MatchUpdate } from '../../../darwin-types/messages/MatchUpdate';

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

const WebsocketContext = createContext<State>(emptyState);

function useGetWebsocketData(): State {
  const [state, dispatch] = useReducer(reducer, emptyState);
  useEffect(() => {
    const socket = new WebSocket(API_URL);

    socket.addEventListener('message', event => {
      const action: Message = JSON.parse(event.data);

      dispatch(action);
    });
  }, []);
  return state;
}

export function WebsocketProvider(props: {
  children: JSX.Element;
}): JSX.Element {
  const websocketData = useGetWebsocketData();
  return <WebsocketContext.Provider value={websocketData} {...props} />;
}

function useWebsocketData(): State {
  return useContext(WebsocketContext);
}

export default useWebsocketData;
