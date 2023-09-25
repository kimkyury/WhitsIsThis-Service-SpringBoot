package com.mo.whatisthis.apis.socket.configs;

import com.mo.whatisthis.apis.socket.handlers.CustomWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

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

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();

        // 메시지 버퍼 크기 설정
        container.setMaxTextMessageBufferSize(512 * 1024); // 512KB

        return container;
    }



}
