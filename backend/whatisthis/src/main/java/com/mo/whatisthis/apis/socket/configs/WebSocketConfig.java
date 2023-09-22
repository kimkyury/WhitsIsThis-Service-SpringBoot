package com.mo.whatisthis.apis.socket.configs;

import com.mo.whatisthis.apis.socket.handlers.ConnectWebSocketHandler;
import com.mo.whatisthis.apis.socket.handlers.CoordinateWebSocketHandler;
import com.mo.whatisthis.apis.socket.services.MoSocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import io.lettuce.core.dynamic.annotation.Param;
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

    private final MoSocketProvider moSocketProvider;
    private final ParamWebSocketInterceptor paramWebSocketInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(connectorHandler(), "/ws/v1/connector")
                .setAllowedOrigins("*")
                .addInterceptors(paramWebSocketInterceptor);

        registry.addHandler(coordinatesHandler(), "/ws/v1/coordinates")
                .setAllowedOrigins("*");

//        registry.addHandler(damagesHandler(), "/ws/v1/damages")
//                .setAllowedOrigins("*");
//        registry.addHandler(drawingsHandler(), "/ws/v1/drawings")
//                .setAllowedOrigins("*");
//        registry.addHandler(statusHandler(), "/ws/v1/status")
//                .setAllowedOrigins("*");
    }

    @Bean
    public TextWebSocketHandler connectorHandler() {
        return new ConnectWebSocketHandler(moSocketProvider);
    }

    @Bean
    public TextWebSocketHandler coordinatesHandler() {
        return new CoordinateWebSocketHandler();
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
