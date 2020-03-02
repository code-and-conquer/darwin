import {useEffect, useState} from 'react';

function useWebsocketData() {
    const [gamePosition, setGamePosition] = useState(null);
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.addEventListener('message', function (event) {
            setGamePosition(JSON.parse(event.data))
        });
    }, []);
    return gamePosition;
}

export default useWebsocketData
