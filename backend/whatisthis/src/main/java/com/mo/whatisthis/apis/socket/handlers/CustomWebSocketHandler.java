package com.mo.whatisthis.apis.socket.handlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity.Category;
import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.socket.dto.MessageDto;
import com.mo.whatisthis.apis.socket.dto.MessageDto.MessageDataType;
import com.mo.whatisthis.apis.socket.dto.MessageDto.MessageType;
import com.mo.whatisthis.apis.socket.services.MoSocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.WebSocketUtils;
import io.jsonwebtoken.Claims;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiConsumer;
import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@Component
@RequiredArgsConstructor
public class CustomWebSocketHandler extends TextWebSocketHandler {

    private final MoSocketProvider moSocketProvider;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;
    private final UserDetailsService userDetailsService;
    private final S3Service s3Service;
    private final HistoryService historyService;
    private final DamagedHistoryService damagedHistoryService;

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        MessageDto messageRequest;
        System.out.println(message.getPayload());

        try {
            messageRequest = objectMapper.readValue(message.getPayload(), MessageDto.class);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        MessageType type = messageRequest.getType();
        Map<String, String> dataMap = messageRequest.getData();

        if (type.equals(MessageType.COORDINATE)) {

            coordinateHandler(session, dataMap);

        } else if (type.equals(MessageType.DAMAGED)) {

            damageHandler(session, dataMap);

        } else if (type.equals(MessageType.DRAWING)) {

            drawingHandler(session, dataMap);

        } else if (type.equals(MessageType.STATUS)) {

            statusHandler(session, dataMap);

        } else if (type.equals(MessageType.COMMAND)) {

            commandHandler(session, dataMap);

        } else if (type.equals(MessageType.INIT)) {
            // Employee Message
            initHandler(session, dataMap);

        } else if (type.equals(MessageType.AUTH)) {

            authHandler(session, dataMap);
        }
    }


    public void authHandler(WebSocketSession session, Map<String, String> dataMap) {
        String accessToken = dataMap.get(MessageDataType.accessToken.name());
        Claims claims = jwtTokenProvider.getClaims(accessToken.substring(7));

        String username = claims.get("memberNo")
                                .toString();
        String role = claims.get("role")
                            .toString();

        if (role.equals(Role.ROLE_EMPLOYEE.name())) {
            moSocketProvider.addEmployeeToSocket(username, session);
        } else {
            moSocketProvider.addDeviceToSocket(username, session);
        }
    }


    public void initHandler(WebSocketSession session, Map<String, String> dataMap) {
    }

    public void commandHandler(WebSocketSession session, Map<String, String> dataMap) {

    }

    public void coordinateHandler(WebSocketSession session, Map<String, String> dataMap) {
    }

    public void damageHandler(WebSocketSession session, Map<String, String> dataMap) {

    }

    public void drawingHandler(WebSocketSession session, Map<String, String> imageBinaryStr) {
    }

    public void statusHandler(WebSocketSession session, Map<String, String> dataMap) {

    }


    public String convertMessageToString(MessageType messageType, Map<String, String> dataMap) {

        MessageDto messageDto = MessageDto.builder()
                                          .type(messageType)
                                          .data(dataMap)
                                          .build();

        String str = "";
        try {
            str = objectMapper.writeValueAsString(messageDto);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        return str;
    }

    public Long getHistoryIdBySerialNumber(WebSocketSession session) {

        String serialNumber = (String) session.getAttributes()
                                              .get("serialNumber");
        Long historyId = Long.valueOf(redisService.getHistoryBySerialNumber(serialNumber));

        return historyId;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {

        System.out.println("HI, User!");
        Role role = (Role) session.getAttributes()
                                  .get("role");

        if (role == Role.ROLE_DEVICE) {
            String serialNumber = (String) session.getAttributes()
                                                  .get("serialNumber");
            String historyId = redisService.getHistoryBySerialNumber(serialNumber);

            WebSocketSession employeeSession = moSocketProvider
                .getEmployeeSessionByHistory(Long.valueOf(historyId))
                .get();

            Map<String, String> dataMap = new HashMap<>();
            dataMap.put(MessageDataType.state.name(), "CONNECT");

            String str = convertMessageToString(MessageType.STATUS, dataMap);

            moSocketProvider.sendTextMessage(employeeSession, str);

        }
    }

    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {

        // TODO: Turtle봇 종료시, 데이터의 터틀봇 관련도 삭제할 것

//        System.out.println(">>>>>> Connector Socket EXIT");

        Role role = (Role) session.getAttributes()
                                  .get("role");

        if (role == Role.ROLE_EMPLOYEE) {
            Long historyId = (Long) session.getAttributes()
                                           .get("historyId");
            moSocketProvider.removeEmployeeToSocket(historyId);

        } else if (role == Role.ROLE_DEVICE) {
            String serialNumber = (String) session.getAttributes()
                                                  .get("serialNumber");
            moSocketProvider.removeDeviceToSocket(serialNumber);
        }
    }
}

