package com.mo.whatisthis.apis.socket.handlers.interfaces;

import java.util.Map;
import org.springframework.web.socket.WebSocketSession;

public interface MessageHandlerInterface {

    void handle(WebSocketSession session, Map<String, String> dataMap);
}
