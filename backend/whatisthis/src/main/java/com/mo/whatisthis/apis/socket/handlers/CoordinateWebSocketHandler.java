package com.mo.whatisthis.apis.socket.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class CoordinateWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        System.out.println(">>>> Here is Coordinate Socket");
        System.out.println(message.getPayload());

        ObjectMapper objectMapper = new ObjectMapper();

    }
}
