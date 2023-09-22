package com.mo.whatisthis.socket.configs;

import com.mo.whatisthis.socket.handlers.CoordinateWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler webSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(connectorHandler(), "/ws/v1/connector")
                .setAllowedOrigins("*");
        registry.addHandler(coordinatesHandler(), "/ws/v1/coordinates")
                .setAllowedOrigins("*");
        registry.addHandler(damagesHandler(), "/ws/v1/damages")
                .setAllowedOrigins("*");
        registry.addHandler(drawingsHandler(), "/ws/v1/drawings")
                .setAllowedOrigins("*");
        registry.addHandler(statusHandler(), "/ws/v1/status")
                .setAllowedOrigins("*");
    }

    @Bean
    public TextWebSocketHandler connectorHandler() {
        return new CoordinateWebSocketHandler();
    }
    @Bean
    public TextWebSocketHandler coordinatesHandler() {
        return null;
    }
    @Bean
    public TextWebSocketHandler damagesHandler() {
        return null;
    }
    @Bean
    public TextWebSocketHandler drawingsHandler() {
        return null;
    }
    @Bean
    public TextWebSocketHandler statusHandler() {
        return null;
    }

}
