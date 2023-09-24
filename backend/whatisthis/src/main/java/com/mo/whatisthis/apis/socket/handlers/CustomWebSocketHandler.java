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
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.stereotype.Component;
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
    private final S3Service s3Service;
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

            String imageBinaryStr = dataMap.get(MessageDataType.image.name());
            drawingHandler(session, imageBinaryStr);

        } else if (type.equals(MessageType.STATUS)) {

            String status = dataMap.get(MessageDataType.state.name());
            statusHandler(session, status);

        } else if (type.equals(MessageType.COMMAND)) {

            String command = dataMap.get(MessageDataType.command.name());
            String target = dataMap.get(MessageDataType.target.name());
            commandHandler(session, command, target);

        } else if (type.equals(MessageType.AUTH)) {

            String accessToken = dataMap.get(MessageDataType.accessToken.name());
            authHandler(session, accessToken.substring(7));
        }
    }

    public void coordinateHandler(WebSocketSession session, Map<String, String> dataMap){

        Long historyId = getHistoryIdBySerialNumber(session);
        String messageStr = convertMessageToString(MessageType.COORDINATE, dataMap);

        WebSocketSession targetSession = moSocketProvider.getEmployeeSessionByHistory(historyId)
                                                         .get();
        moSocketProvider.sendTextMessage(targetSession, messageStr);

    }

    public void damageHandler(WebSocketSession session, Map<String, String> dataMap) {

        String imageBinaryStr = dataMap.get(MessageDataType.image.name());
        Float x = Float.valueOf(dataMap.get(MessageDataType.x.name()));
        Float y = Float.valueOf(dataMap.get(MessageDataType.y.name()));
        Category category = Category.valueOf(dataMap.get(MessageDataType.category.name()));

        Long historyId = getHistoryIdBySerialNumber(session);

        byte[] bytes = Base64.getDecoder()
                             .decode(imageBinaryStr);
        MultipartFile multipartFile = WebSocketUtils.convertToMultipartFile(bytes);

        String imgUrl = "";
        try {
            imgUrl = damagedHistoryService.createDamagedHistory(historyId, multipartFile, x, y,
                category);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        Map<String, String> newMap = new HashMap<>();
        dataMap.put(MessageDataType.image.name(), imgUrl);
        dataMap.put(MessageDataType.x.name(), dataMap.get(MessageDataType.x.name()));
        dataMap.put(MessageDataType.y.name(), dataMap.get(MessageDataType.y.name()));
        dataMap.put(MessageDataType.category.name(), dataMap.get(MessageDataType.category.name()));
        String messageStr = convertMessageToString(MessageType.DAMAGED, newMap);

        WebSocketSession targetSession = moSocketProvider.getEmployeeSessionByHistory(historyId)
                                                         .get();
        moSocketProvider.sendTextMessage(targetSession, messageStr);

    }

    public void drawingHandler(WebSocketSession session, String imageBinaryStr) {

        Long historyId = getHistoryIdBySerialNumber(session);
        byte[] bytes = Base64.getDecoder()
                             .decode(imageBinaryStr);
        MultipartFile multipartFile = WebSocketUtils.convertToMultipartFile(bytes);

        String s3URL = "";
        try {
            s3URL = historyService.uploadDrawing(historyId, multipartFile);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        Map<String, String> dataMap = new HashMap<>();
        dataMap.put(MessageDataType.image.name(), s3URL);
        String messageStr = convertMessageToString(MessageType.DRAWING, dataMap);

        WebSocketSession targetSession = moSocketProvider.getEmployeeSessionByHistory(historyId)
                                                         .get();
        moSocketProvider.sendTextMessage(targetSession, messageStr);


    }

    public void statusHandler(WebSocketSession session, String status) {

        Long historyId = getHistoryIdBySerialNumber(session);

        Map<String, String> dataMap = new HashMap<>();
        dataMap.put(MessageDataType.state.name(), status);
        String messageStr = convertMessageToString(MessageType.STATUS, dataMap);

        WebSocketSession targetSession = moSocketProvider.getEmployeeSessionByHistory(historyId)
                                                         .get();
        moSocketProvider.sendTextMessage(targetSession, messageStr);

    }

    public void commandHandler(WebSocketSession session, String command, String target) {

        Optional<WebSocketSession> targetSession = moSocketProvider.getDeviceSessionBySerialNumber(
            target);

        if (targetSession.isEmpty()) {

            Map<String, String> dataMap = new HashMap<>();
            dataMap.put(MessageDataType.state.name(), "NOT CONNECTED");

            String messageStr = convertMessageToString(MessageType.STATUS, dataMap);
            moSocketProvider.sendTextMessage(session, messageStr);
            return;
        }
        // Turtle봇에게 전송하는 시작명령은 JSON형태가 아님.
        moSocketProvider.sendTextMessage(targetSession.get(), command);
    }

    public void authHandler(WebSocketSession session, String accessToken) {

        jwtTokenProvider.validateAccessToken(accessToken);
        Role role = (Role) session.getAttributes()
                                  .get("role");

        if (role == Role.ROLE_EMPLOYEE) {
            moSocketProvider.addEmployeeToSocket((Long) session.getAttributes()
                                                               .get("historyId"), session);
        } else {
            moSocketProvider.addDeviceToSocket((String) session.getAttributes()
                                                               .get("serialNumber"), session);
        }
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

