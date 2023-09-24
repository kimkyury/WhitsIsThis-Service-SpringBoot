package com.mo.whatisthis.apis.socket.configs;

import com.mo.whatisthis.apis.socket.handlers.CustomWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final ParamWebSocketInterceptor paramWebSocketInterceptor;
    private final CustomWebSocketHandler customWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(customWebSocketHandler, "/ws")
                .setAllowedOrigins("*")
                .addInterceptors(paramWebSocketInterceptor);
    }
}
