import { useEffect, useState } from 'react';
import { State } from '../../darwin-types/State';

const API_URL = process.env.REACT_APP_BACKEND_URL as string;
const emptyState: State = { objectMap: {}, objectIds: [] };

function useWebsocketData(): State {
  const [gameState, setGameState] = useState<State>(emptyState);
  useEffect(() => {
    const socket = new WebSocket(API_URL);

    socket.addEventListener('message', event => {
      setGameState(JSON.parse(event.data));
    });
  }, []);
  return gameState;
}

export default useWebsocketData;
