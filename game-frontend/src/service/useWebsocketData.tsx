import React, { useEffect, useState, createContext, useContext } from 'react';
import { MatchUpdate } from '../../../darwin-types/messages/MatchUpdate';
import { State } from '../../../darwin-types/State';

const API_URL = process.env.REACT_APP_BACKEND_URL as string;
const emptyState: State = { objectMap: {}, objectIds: [] };

const WebsocketContext = createContext<State>(emptyState);

function useGetWebsocketData(): State {
  const [gameState, setGameState] = useState<State>(emptyState);
  useEffect(() => {
    const socket = new WebSocket(API_URL);

    socket.addEventListener('message', event => {
      const EventData: MatchUpdate = JSON.parse(event.data);

      setGameState(EventData.payload.state);
    });
  }, []);
  return gameState;
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
