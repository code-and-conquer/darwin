import { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function useWebsocketData() {
  const [gamePosition, setGamePosition] = useState(null);
  useEffect(() => {
    const socket = new WebSocket(API_URL);
    socket.addEventListener('message', function(event) {
      setGamePosition(JSON.parse(event.data));
    });
  }, []);
  return gamePosition;
}

export default useWebsocketData;
