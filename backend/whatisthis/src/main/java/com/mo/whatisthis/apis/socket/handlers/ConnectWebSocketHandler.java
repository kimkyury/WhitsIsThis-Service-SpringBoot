package com.mo.whatisthis.apis.socket.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.socket.services.MoSocketProvider;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@RequiredArgsConstructor
public class ConnectWebSocketHandler extends TextWebSocketHandler {

    private final MoSocketProvider moSocketProvider;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        // Employee와 Device의 분기 -> ConcurrentHashMap선택을 달리하기 위해

        // Sol1. Socket 채널을 분기시키기
        // Sol2. session 내에 ROLE 속성을 집어넣어서 확인하기
        // 이 경우, Interceptor 내에서 함께 확인하는 것이 수월함

        String role = (String) session.getAttributes().get("role");
        System.out.println(role);
        Long historyId = (Long) session.getAttributes()
                                       .get("historyId");
        System.out.println(historyId);
        moSocketProvider.addEmployeeToSocket(historyId, session);

//        ObjectMapper objectMapper = new ObjectMapper();

    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // 클라이언트가 WebSocket에 연결될 때 실행되는 코드

        // 1. jwt를 통해 권환 확인 ( ROLE_EMPLOYEE, ROLE_TURTLE)
        // 2. 권한에 따라 moSocketProvider로 참여자 추가하기

    }

    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // 클라이언트 연결이 종료될 때 실행되는 코드
        System.out.println("Disconnected: " + session.getId());
        // 예를 들면, 연결된 사용자 리스트에서 해당 session을 제거하는 로직 등을 작성할 수 있습니다.
    }

}

