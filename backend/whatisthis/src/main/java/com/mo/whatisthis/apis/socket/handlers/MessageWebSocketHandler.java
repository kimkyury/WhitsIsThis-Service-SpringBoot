package com.mo.whatisthis.apis.socket.handlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.socket.dto.MessageDto;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.handlers.impl.AuthMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.CommandMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.CompletionRateMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.CoordinateMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.DamagedMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.DrawingMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.DrawingRouteMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.IotDeviceMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.RegisterMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.StatusMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.interfaces.MessageHandlerInterface;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.supports.codes.ErrorCode;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class MessageWebSocketHandler extends TextWebSocketHandler {

    private final SocketProvider socketProvider;
    private final RedisService redisService;
    private final Map<SendType, MessageHandlerInterface> handlers;

    private static ObjectMapper objectMapper = new ObjectMapper();

    public MessageWebSocketHandler(SocketProvider socketProvider,
        RedisService redisService,
        AuthMessageHandlerImpl authMessageHandler,

        IotDeviceMessageHandlerImpl iotDeviceMessageHandler,
        RegisterMessageHandlerImpl registerMessageHandler,
        CommandMessageHandlerImpl commandMessageHandler,
        DamagedMessageHandlerImpl damagedMessageHandler,
        CoordinateMessageHandlerImpl coordinateMessageHandler,
        DrawingMessageHandlerImpl drawingMessageHandler,
        StatusMessageHandlerImpl statusMessageHandler,
        DrawingRouteMessageHandlerImpl drawingRouteMessageHandler,
        CompletionRateMessageHandlerImpl completionRateMessageHandler

    ) {

        this.socketProvider = socketProvider;
        this.redisService = redisService;

        // handlers를 Final로 지정했기에 어느정도 안전성이 있으나, 확실한 안정성 명시를 위해 unmodifiableMap 이용
        this.handlers = Collections.unmodifiableMap(Map.of(
            SendType.AUTH, authMessageHandler,
            SendType.IOT_DEVICE, iotDeviceMessageHandler,
            SendType.REGISTER, registerMessageHandler,
            SendType.COMMAND, commandMessageHandler,
            SendType.COORDINATE, coordinateMessageHandler,
            SendType.DAMAGED, damagedMessageHandler,
            SendType.DRAWING, drawingMessageHandler,
            SendType.DRAWING_ROUTE, drawingRouteMessageHandler,
            SendType.STATUS, statusMessageHandler,
            SendType.COMPLETION_RATE, completionRateMessageHandler)
        );
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        try {
            MessageDto messageRequest = convertMessageToDto(session, message);
            if (messageRequest == null) {
                String errorText = "Please Confirm your MessageType, It is not valid type. (AUTH, REGISTER, COMMAND, COORDINATE, DRAWING, DAMAGED, STATUS, IOT_DEVICE, DRAWING_ROUTE, COMPLETION_RATE, SYSTEM_MESSAGE) 중 하나여야 합니다. ";
                sendErrorMessage(session, errorText);
                return;
            }

            SendType type = messageRequest.getType();
            Map<String, String> dataMap = messageRequest.getData();
            MessageHandlerInterface handler = handlers.get(type);
            handler.handle(session, dataMap);

        } catch (IllegalArgumentException | NullPointerException e) {
            e.printStackTrace();

            Map<String, String> map = new HashMap<>();
            map.put(DataType.message.name(),
                "input data is invalid. (하지만 완벽한데도 에러가 난다면 백엔드에게 연락주세요. )");
            String errorMessage = convertMessageToString(SendType.SYSTEM_MESSAGE, map);
            socketProvider.sendMessage(session, errorMessage);
        }
    }

    public void closeSession(WebSocketSession session) {
        try {
            session.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {

    }

    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {

        String role = getAttributeFromSession(session, SessionKey.ROLE);

        if (role.equals(Role.ROLE_EMPLOYEE.name())) {
            String employeeNo = getAttributeFromSession(session, SessionKey.EMPLOYEE_NO);
            socketProvider.removeEmployeeToSocket(employeeNo);
        } else {
            System.out.println("Remove Device At redis");
            String serialNumber = getAttributeFromSession(session, SessionKey.SERIAL_NUMBER);
            redisService.deleteValue("device:" + serialNumber);
            socketProvider.removeDeviceToSocket(serialNumber);
        }
    }

    public void sendErrorMessage(WebSocketSession session, String errorText) {
        Map<String, String> errorData = new HashMap<>();
        errorData.put(DataType.message.name(), errorText);
        String errorMessage = convertMessageToString(SendType.SYSTEM_MESSAGE, errorData);

        socketProvider.sendMessage(session, errorMessage);
    }

    private MessageDto convertMessageToDto(WebSocketSession session, TextMessage message) {
        try {
            return objectMapper.readValue(message.getPayload(), MessageDto.class);
        } catch (JsonProcessingException e) {
            String errorText = "Please Confirm your MessageFormat, It is not valid format. ";
            sendErrorMessage(session, errorText);
        }
        return null;
    }


    private String getAttributeFromSession(WebSocketSession session, SessionKey key) {
        return (String) session.getAttributes()
                               .get(key.name());
    }

    private String convertMessageToString(SendType messageType, Map<String, String> dataMap) {

        MessageDto messageDto = MessageDto.builder()
                                          .type(messageType)
                                          .data(dataMap)
                                          .build();
        try {
            return objectMapper.writeValueAsString(messageDto);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

}

