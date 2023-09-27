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
import com.mo.whatisthis.apis.socket.handlers.impl.CoordinateMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.DamagedMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.DrawingMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.IotDeviceMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.RegisterMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.StatusMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.interfaces.MessageHandlerInterface;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.supports.codes.ErrorCode;
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
        StatusMessageHandlerImpl statusMessageHandler
    ) {

        this.socketProvider = socketProvider;
        this.redisService = redisService;
        this.handlers = Map.of(SendType.AUTH, authMessageHandler,
            SendType.IOT_DEVICE, iotDeviceMessageHandler,
            SendType.REGISTER, registerMessageHandler,
            SendType.COMMAND, commandMessageHandler,
            SendType.COORDINATE, coordinateMessageHandler,
            SendType.DAMAGED, damagedMessageHandler,
            SendType.DRAWING, drawingMessageHandler,
            SendType.STATUS, statusMessageHandler);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        MessageDto messageRequest = convertMessageToDto(session, message);

        SendType type = messageRequest.getType();
        Map<String, String> dataMap = messageRequest.getData();

        MessageHandlerInterface handler = handlers.get(type);
        handler.handle(session, dataMap);

        if (handler == null) {
            String errorText = "Please Confirm your MessageType, It is not valid type. ";
            sendErrorMessage(session, errorText);
        }

        handler.handle(session, dataMap);
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

