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
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.WebSocketUtils;
import io.jsonwebtoken.Claims;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
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
    private final HistoryService historyService;
    private final DamagedHistoryService damagedHistoryService;

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        MessageDto messageRequest;

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

        } else if (type.equals(MessageType.IOT_DEVICE)){
            
            iotDeviceHandler(session, dataMap);
            
        } else if (type.equals(MessageType.COMMAND)) {

            commandHandler(session, dataMap);

        } else if (type.equals(MessageType.REGISTER)) {
            // Employee Message
            registerHandler(session, dataMap);

        } else if (type.equals(MessageType.AUTH)) {

            authHandler(session, dataMap);
        }
    }

    private void iotDeviceHandler(WebSocketSession session, Map<String, String> dataMap) {

        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());

        String isWorked = dataMap.get(MessageDataType.isWorked.name());
        String x = dataMap.get(MessageDataType.x.name());
        String y = dataMap.get(MessageDataType.y.name());
        String category = dataMap.get(MessageDataType.category.name());

        Map<String, String> sendDataMap = new HashMap<>();
        sendDataMap.put(MessageDataType.historyId.name(), historyId);
        sendDataMap.put(MessageDataType.isWorked.name(), isWorked);
        sendDataMap.put(MessageDataType.x.name(), x);
        sendDataMap.put(MessageDataType.y.name(), y);
        sendDataMap.put(MessageDataType.category.name(), category);

        String sendMessage = convertMessageToString(MessageType.IOT_DEVICE, sendDataMap);
        moSocketProvider.sendMessageToEmployee(employeeNo, sendMessage);

        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
        moSocketProvider.sendMessageToDevice(serialNumber, "Success Send Message");

    }

    public void authHandler(WebSocketSession session, Map<String, String> dataMap) {

        String accessToken = dataMap.get(MessageDataType.accessToken.name());
        Claims claims = jwtTokenProvider.getClaims(accessToken.substring(7));

        String username = claims.get("memberNo")
                                .toString();
        String role = claims.get("role")
                            .toString();

        session.getAttributes()
               .put(SessionKey.role.name(), role);
        session.getAttributes()
               .put(SessionKey.username.name(), username);

        if (role.equals(Role.ROLE_EMPLOYEE.name())) {

            moSocketProvider.addEmployeeToSocket(username, session);
            moSocketProvider.sendMessageToEmployee(username, "Succeeded Verify Authorization");

        } else {
            moSocketProvider.addDeviceToSocket(username, session);

            String[] redisData = redisService.getValue("device:" + username)
                                             .split("/");

            String employeeNo = redisData[0];
            String historyId = redisData[1];

            session.getAttributes()
                   .put(SessionKey.historyId.name(), historyId);
            session.getAttributes()
                   .put(SessionKey.employeeNo.name(), employeeNo);

            Map<String, String> sendDataMap = new HashMap<>();
            sendDataMap.put(MessageDataType.command.name(), "CONNECTED");
            String sendMessage = convertMessageToString(MessageType.STATUS, sendDataMap);

            moSocketProvider.sendMessageToDevice(username, "Succeeded Verify Authorization");
            moSocketProvider.sendMessageToEmployee(employeeNo, sendMessage);
        }
    }

    public void registerHandler(WebSocketSession session, Map<String, String> dataMap) {

        String historyId = dataMap.get(MessageDataType.historyId.name());
        String serialNumber = dataMap.get(MessageDataType.serialNumber.name());

        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.username.name());
        redisService.saveData("device:" + serialNumber, employeeNo + "/" + historyId);

        moSocketProvider.sendMessageToEmployee(employeeNo, "Success Send Message");

    }

    public void commandHandler(WebSocketSession session, Map<String, String> dataMap) {

        String command = dataMap.get(MessageDataType.command.name());
        String serialNumber = dataMap.get(MessageDataType.serialNumber.name());

        if (command.equals("END")) {
            moSocketProvider.sendMessageToDevice(serialNumber, "Close connection by Employee command");
            moSocketProvider.closeConnectionDevice(serialNumber, 1000,
                "Close connection by Employee command");
        }else{
            moSocketProvider.sendMessageToDevice(serialNumber, command);
        }

        String username = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());
        moSocketProvider.sendMessageToEmployee(username, "Success Send message");
    }

    public void coordinateHandler(WebSocketSession session, Map<String, String> dataMap) {

        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());
        System.out.println(employeeNo);

        String x = dataMap.get(MessageDataType.x.name());
        String y = dataMap.get(MessageDataType.y.name());

        Map<String, String> sendDataMap = new HashMap<>();
        sendDataMap.put(MessageDataType.historyId.name(), historyId);
        sendDataMap.put(MessageDataType.x.name(), x);
        sendDataMap.put(MessageDataType.y.name(), y);

        String sendMessage = convertMessageToString(MessageType.COORDINATE, sendDataMap);
        moSocketProvider.sendMessageToEmployee(employeeNo, sendMessage);

        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
        moSocketProvider.sendMessageToDevice(serialNumber, "Success Send Message");
    }

    public void drawingHandler(WebSocketSession session, Map<String, String> dataMap) {

        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());

        String imgBinaryStr = dataMap.get(MessageDataType.image.name());

        // BinaryString -> byte [] ->  MultipartFile

        byte[] byteStr = Base64.getDecoder()
                               .decode(imgBinaryStr);
        MultipartFile multipartFile = WebSocketUtils.convertToMultipartFile(byteStr, "drawing.jpg");

        String imgUrl = "";
        try {
            imgUrl = historyService.uploadDrawing(Long.valueOf(historyId), multipartFile);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        Map<String, String> sendDataMap = new HashMap<>();
        sendDataMap.put(MessageDataType.historyId.name(), historyId);
        sendDataMap.put(MessageDataType.image.name(), imgUrl);

        String sendMessage = convertMessageToString(MessageType.DRAWING, sendDataMap);
        moSocketProvider.sendMessageToEmployee(employeeNo, sendMessage);

        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
        moSocketProvider.sendMessageToDevice(serialNumber, "Success Send Message");
    }

    public void damageHandler(WebSocketSession session, Map<String, String> dataMap) {
        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());

        String imgBinaryStr = dataMap.get(MessageDataType.image.name());
        String x = dataMap.get(MessageDataType.x.name());
        String y = dataMap.get(MessageDataType.y.name());
        String category = dataMap.get(MessageDataType.category.name());

        byte[] byteStr = Base64.getDecoder()
                               .decode(imgBinaryStr);
        MultipartFile multipartFile = WebSocketUtils.convertToMultipartFile(byteStr, "damaged.jpg");

        String imgUrl = "";
        try {
            imgUrl = damagedHistoryService.createDamagedHistory(Long.valueOf(historyId),
                multipartFile, Float.valueOf(x), Float.valueOf(y), Category.valueOf(category));
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        Map<String, String> sendDataMap = new HashMap<>();
        sendDataMap.put(MessageDataType.historyId.name(), historyId);
        sendDataMap.put(MessageDataType.image.name(), imgUrl);
        sendDataMap.put(MessageDataType.x.name(), x);
        sendDataMap.put(MessageDataType.y.name(), y);
        sendDataMap.put(MessageDataType.category.name(), category);

        String sendMessage = convertMessageToString(MessageType.DRAWING, sendDataMap);
        moSocketProvider.sendMessageToEmployee(employeeNo, sendMessage);

        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
        moSocketProvider.sendMessageToDevice(serialNumber, "Success Send Message");
    }

    public void statusHandler(WebSocketSession session, Map<String, String> dataMap) {

        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());

        String state = dataMap.get(MessageDataType.state.name());
        Map<String, String> sendDataMap = new HashMap<>();
        sendDataMap.put(MessageDataType.historyId.name(), historyId);
        sendDataMap.put(MessageDataType.state.name(), state);

        String sendMessage = convertMessageToString(MessageType.STATUS, sendDataMap);
        moSocketProvider.sendMessageToEmployee(employeeNo, sendMessage);

        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
        moSocketProvider.sendMessageToDevice(serialNumber, "Success Send Message");

    }

    public String getAttributeFromSessionStorage(WebSocketSession session, String sessionKey) {
        return (String) session.getAttributes()
                               .get(sessionKey);
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

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {

    }

    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {

        String role = (String) session.getAttributes()
                                      .get(SessionKey.role.name());
        String username = (String) session.getAttributes()
                                          .get(SessionKey.username.name());

        if (role.equals(Role.ROLE_EMPLOYEE.name())) {
            moSocketProvider.removeEmployeeToSocket(username);
        } else {
            redisService.deleteValue("device:" + username);
            moSocketProvider.removeDeviceToSocket(username);
        }
    }

    enum SessionKey {
        username, historyId, role, employeeNo
    }
}

