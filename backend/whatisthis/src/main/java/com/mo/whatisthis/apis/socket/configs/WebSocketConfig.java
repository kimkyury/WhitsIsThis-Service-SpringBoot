package com.mo.whatisthis.apis.socket.configs;

import com.mo.whatisthis.apis.socket.handlers.ConnectWebSocketHandler;
import com.mo.whatisthis.apis.socket.services.MoSocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {
    private final MoSocketProvider moSocketProvider;
    private final JwtTokenProvider jwtTokenProvider;
    private final ParamWebSocketInterceptor paramWebSocketInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(connectorHandler(), "/ws")
                .setAllowedOrigins("*")
                .addInterceptors(paramWebSocketInterceptor);

    }

    @Bean
    public TextWebSocketHandler connectorHandler() {
        return new ConnectWebSocketHandler(moSocketProvider, jwtTokenProvider);
    }

}
