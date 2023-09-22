package com.mo.whatisthis.apis.socket.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
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
        System.out.println(message.getPayload());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // 클라이언트가 WebSocket에 연결될 때 실행되는 코드
        Role role = (Role) session.getAttributes()
                                  .get("role");

        if (role == Role.ROLE_EMPLOYEE) {
            Long historyId = (Long) session.getAttributes()
                                           .get("historyId");
            moSocketProvider.addEmployeeToSocket(historyId, session);

        } else if (role == Role.ROLE_DEVICE) {
            String serialNumber = (String) session.getAttributes()
                                                  .get("serialNumber");
            moSocketProvider.addDeviceToSocket(serialNumber, session);
        }
    }


    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // 클라이언트 연결이 종료될 때 실행되는 코드
        System.out.println(">>>>>> Connector Socket EXIT");

        String role = (String) session.getAttributes()
                                      .get("role");

        if (role.equals(Role.ROLE_EMPLOYEE)) {
            Long historyId = (Long) session.getAttributes()
                                           .get("historyId");
            moSocketProvider.removeEmployeeToSocket(historyId);

        } else if (role.equals(Role.ROLE_DEVICE)) {
            String serialNumber = (String) session.getAttributes()
                                                  .get("serialNumber");
            moSocketProvider.removeDeviceToSocket(serialNumber);
        }
    }
}

