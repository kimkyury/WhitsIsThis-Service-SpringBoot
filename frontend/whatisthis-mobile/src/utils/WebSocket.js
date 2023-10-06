import React, { useState, useEffect, useContext } from "react";

const WebSocketContext = React.createContext({ ws: null, receivedMessage: "" });

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const WS_BASE_URL = process.env.REACT_APP_WS_BASE_URL || "";
  const [ws, setWs] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket(WS_BASE_URL);

    socket.onopen = () => {
      console.log("WebSocket 연결이 열렸습니다.");
    };

    socket.onerror = (error) => {
      console.log("WebSocket연결 에러");
      console.error(error);
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("수신 메시지", data);
      if (data.historyId) {
        console.log(data.historyId);
      }
      handleReceivedMessage(data);
    };

    socket.onclose = (e) => {
      console.log("WebSocket 연결이 닫혔습니다.");
    };

    setWs(socket);
  }, []);
  const handleReceivedMessage = (data) => {
    setReceivedMessage(data);
  };
  return (
    <WebSocketContext.Provider value={{ ws, receivedMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
