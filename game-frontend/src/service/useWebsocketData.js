import React, { useEffect, useState, createContext, useContext } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const WebsocketContext = createContext(null)

function useGetWebsocketData() {
  const [websocketData, setWebsocketData] = useState(null)
  useEffect(() => {
      const socket = new WebSocket(API_URL)

      socket.addEventListener('message', function (event) {
          setWebsocketData(JSON.parse(event.data))
      })
  }, [])
  return websocketData
}

export function WebsocketProvider(props) {
  const websocketData = useGetWebsocketData()
  return <WebsocketContext.Provider value={websocketData} {...props} />
}

function useWebsocketData() {
  return useContext(WebsocketContext)
}

export default useWebsocketData
