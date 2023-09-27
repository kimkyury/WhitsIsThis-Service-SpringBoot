package com.mo.whatisthis.apis.socket.handlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.history.services.DeviceHistoryService;
import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.socket.dto.MessageDto;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.handlers.impl.AuthMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.IotDeviceMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.impl.RegisterMessageHandlerImpl;
import com.mo.whatisthis.apis.socket.handlers.interfaces.MessageHandlerInterface;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class MessageWebSocketHandler extends TextWebSocketHandler {

    private final SocketProvider socketProvider;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;
    private final HistoryService historyService;
    private final DamagedHistoryService damagedHistoryService;
    private final DeviceHistoryService deviceHistoryService;

    private static ObjectMapper objectMapper = new ObjectMapper();

    private final Map<SendType, MessageHandlerInterface> handlers;

    public MessageWebSocketHandler(SocketProvider socketProvider,
        JwtTokenProvider jwtTokenProvider, RedisService redisService,
        HistoryService historyService, DamagedHistoryService damagedHistoryService,
        DeviceHistoryService deviceHistoryService, AuthMessageHandlerImpl authMessageHandlerImpl,
        IotDeviceMessageHandlerImpl iotDeviceMessageHandlerImpl, RegisterMessageHandlerImpl registerHandler) {

        this.socketProvider = socketProvider;
        this.jwtTokenProvider = jwtTokenProvider;
        this.redisService = redisService;
        this.historyService = historyService;
        this.damagedHistoryService = damagedHistoryService;
        this.deviceHistoryService = deviceHistoryService;
        this.handlers = Map.of(SendType.AUTH, authMessageHandlerImpl,
            SendType.IOT_DEVICE, iotDeviceMessageHandlerImpl,
            SendType.REGISTER, registerHandler);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        MessageDto messageRequest;
        try {
            messageRequest = objectMapper.readValue(message.getPayload(), MessageDto.class);
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }

        SendType type = messageRequest.getType();
        Map<String, String> dataMap = messageRequest.getData();

        MessageHandlerInterface handler = handlers.get(type);
        if (handler != null) {
            handler.handle(session, dataMap);
        } else {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
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
            String serialNumber = getAttributeFromSession(session, SessionKey.SERIAL_NUMBER);
            redisService.deleteValue("device:" + serialNumber);
            socketProvider.removeDeviceToSocket(serialNumber);
        }
    }

    public String getAttributeFromSession(WebSocketSession session, SessionKey key) {
        return (String) session.getAttributes()
                               .get(key.name());
    }

    public String convertMessageToString(SendType messageType, Map<String, String> dataMap) {

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

