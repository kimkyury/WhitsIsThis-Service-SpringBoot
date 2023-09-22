package com.mo.whatisthis.apis.socket.handlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.socket.requests.CoordinateRequest;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class CoordinateWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
        throws JsonProcessingException {

        System.out.println(">>>> Here is Coordinate Socket");
        System.out.println(message.getPayload());

        String messageContent = message.getPayload();

        ObjectMapper objectMapper = new ObjectMapper();

//        try(
//            CoordinateRequest coordinateRequest = objectMapper.readValue(messageContent, CoordinateRequest.class);
//        )

    }
}
