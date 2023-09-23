package com.mo.whatisthis.apis.socket.handlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.socket.dto.MessageDto;
import com.mo.whatisthis.apis.socket.dto.MessageDto.MessageDataType;
import com.mo.whatisthis.apis.socket.dto.MessageDto.MessageType;
import com.mo.whatisthis.apis.socket.services.MoSocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.security.service.UserDetailsImpl;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@RequiredArgsConstructor
public class ConnectWebSocketHandler extends TextWebSocketHandler {

    private final MoSocketProvider moSocketProvider;
    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        ObjectMapper om = new ObjectMapper();
        MessageDto messageRequest;
        try {
            messageRequest = om.readValue(message.getPayload(), MessageDto.class);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        MessageType type = messageRequest.getType();
        Map<String, String> dataMap = messageRequest.getData();
        if (type.equals(MessageType.COORDINATE)) {

        } else if (type.equals(MessageType.DAMAGED)) {

        } else if (type.equals(MessageType.DRAWING)) {

        } else if (type.equals(MessageType.STATUS)) {

        } else if (type.equals(MessageType.COMMAND)) {

        } else if (type.equals(MessageType.AUTH)) {
            String accessToken = dataMap.get(MessageDataType.accessToken.name());
            System.out.println("AUTH>>>>>>> " + accessToken);
            authHandler(session, accessToken.substring(7));
        }
    }

    public void authHandler(WebSocketSession session, String accessToken) {

        jwtTokenProvider.validateAccessToken(accessToken);
        UserDetailsImpl userDetails = (UserDetailsImpl) jwtTokenProvider
            .getAuthentication(accessToken)
            .getPrincipal();

        String role = userDetails.getRole()
                                 .name();

        if (role.equals(Role.ROLE_EMPLOYEE.name())) {
            moSocketProvider.addEmployeeToSocket((Long) session.getAttributes()
                                                               .get("historyId"), session);
        } else {
            moSocketProvider.addDeviceToSocket((String) session.getAttributes()
                                                               .get("serialNumber"), session);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {

//        System.out.println("this is AfetConnection ");
//
//        // 클라이언트가 WebSocket에 연결될 때 실행되는 코드
//        Role role = (Role) session.getAttributes()
//                                  .get("role");
//
//        if (role == Role.ROLE_EMPLOYEE) {
//            Long historyId = (Long) session.getAttributes()
//                                           .get("historyId");
//            moSocketProvider.addEmployeeToSocket(historyId, session);
//
//        } else if (role == Role.ROLE_DEVICE) {
//            String serialNumber = (String) session.getAttributes()
//                                                  .get("serialNumber");
//            moSocketProvider.addDeviceToSocket(serialNumber, session);
//        }

    }


    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // 클라이언트 연결이 종료될 때 실행되는 코드
//        System.out.println(">>>>>> Connector Socket EXIT");
//
//        String role = (String) session.getAttributes()
//                                      .get("role");
//
//        if (role.equals(Role.ROLE_EMPLOYEE)) {
//            Long historyId = (Long) session.getAttributes()
//                                           .get("historyId");
//            moSocketProvider.removeEmployeeToSocket(historyId);
//
//        } else if (role.equals(Role.ROLE_DEVICE)) {
//            String serialNumber = (String) session.getAttributes()
//                                                  .get("serialNumber");
//            moSocketProvider.removeDeviceToSocket(serialNumber);
//        }
    }
}

