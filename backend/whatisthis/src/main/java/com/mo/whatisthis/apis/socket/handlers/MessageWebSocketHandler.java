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

//        if (type.equals(SendType.COORDINATE)) {
//
//            coordinateHandler(session, dataMap);
//
//        } else if (type.equals(SendType.DAMAGED)) {
//
//            damageHandler(session, dataMap);
//
//        } else if (type.equals(SendType.DRAWING)) {
//
//            drawingHandler(session, dataMap);
//
//        } else if (type.equals(SendType.STATUS)) {
//
//            statusHandler(session, dataMap);
//
//        } else if (type.equals(SendType.COMMAND)) {
//
//            commandHandler(session, dataMap);
//
//        }
    }

//    private void iotDeviceHandler(WebSocketSession session, Map<String, String> dataMap) {
//
//        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
//        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());
//
//        String isWorkedStr = dataMap.get(MessageDataType.isWorked.name());
//        boolean isWorked = "1".equals(isWorkedStr);
//        String x = dataMap.get(MessageDataType.x.name());
//        String y = dataMap.get(MessageDataType.y.name());
//        String category = dataMap.get(MessageDataType.category.name());
//
//        deviceHistoryService.createDeviceHistory(Long.valueOf(historyId), Float.valueOf(x),
//            Float.valueOf(y), DeviceHistoryEntity.Category.valueOf(category), isWorked);
//
//        Map<String, String> sendDataMap = new HashMap<>();
//        sendDataMap.put(MessageDataType.historyId.name(), historyId);
//        sendDataMap.put(MessageDataType.isWorked.name(), isWorkedStr);
//        sendDataMap.put(MessageDataType.x.name(), x);
//        sendDataMap.put(MessageDataType.y.name(), y);
//        sendDataMap.put(MessageDataType.category.name(), category);
//
//        String sendMessage = convertMessageToString(SendType.IOT_DEVICE, sendDataMap);
//        socketProvider.sendMessageToEmployee(employeeNo, sendMessage);
//
//        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
//        socketProvider.sendMessageToDevice(serialNumber, "Success Send Message");
//
//    }

//    public void registerHandler(WebSocketSession session, Map<String, String> dataMap) {
//
//        String historyId = dataMap.get(MessageDataType.historyId.name());
//        String serialNumber = dataMap.get(MessageDataType.serialNumber.name());
//
//        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.username.name());
//        redisService.saveData("device:" + serialNumber, employeeNo + "/" + historyId);
//
//        socketProvider.sendMessageToEmployee(employeeNo, "Success Send Message");
//
//    }

//    public void commandHandler(WebSocketSession session, Map<String, String> dataMap) {
//
//        String command = dataMap.get(MessageDataType.command.name());
//        String serialNumber = dataMap.get(MessageDataType.serialNumber.name());
//
//        if (command.equals("END")) {
//            socketProvider.sendMessageToDevice(serialNumber,
//                "Close connection by Employee command");
//            socketProvider.closeConnectionDevice(serialNumber, 1000,
//                "Close connection by Employee command");
//        } else {
//            socketProvider.sendMessageToDevice(serialNumber, command);
//        }
//
//        String username = getAttributeFromSessionStorage(session, SessionKey.username.name());
//        System.out.println("employeeNo>>>>>>> " + username);
//
//        socketProvider.sendMessageToEmployee(username, "Success Send message");
//    }

//    public void coordinateHandler(WebSocketSession session, Map<String, String> dataMap) {
//
//        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
//        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());
//        System.out.println(employeeNo);
//
//        String x = dataMap.get(MessageDataType.x.name());
//        String y = dataMap.get(MessageDataType.y.name());
//
//        Map<String, String> sendDataMap = new HashMap<>();
//        sendDataMap.put(MessageDataType.historyId.name(), historyId);
//        sendDataMap.put(MessageDataType.x.name(), x);
//        sendDataMap.put(MessageDataType.y.name(), y);
//
//        String sendMessage = convertMessageToString(MessageType.COORDINATE, sendDataMap);
//        socketProvider.sendMessageToEmployee(employeeNo, sendMessage);
//
//        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
//        socketProvider.sendMessageToDevice(serialNumber, "Success Send Message");
//    }
//
//    public void drawingHandler(WebSocketSession session, Map<String, String> dataMap) {
//
//        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
//        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());
//
//        String imgBinaryStr = dataMap.get(MessageDataType.image.name());
//
//        // BinaryString -> byte [] ->  MultipartFile
//
//        byte[] byteStr = Base64.getDecoder()
//                               .decode(imgBinaryStr);
//        MultipartFile multipartFile = WebSocketUtils.convertToMultipartFile(byteStr, "drawing.jpg");
//
//        String imgUrl = "";
//        try {
//            imgUrl = historyService.uploadDrawing(Long.valueOf(historyId), multipartFile);
//        } catch (IOException e) {
//            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
//        }
//
//        Map<String, String> sendDataMap = new HashMap<>();
//        sendDataMap.put(MessageDataType.historyId.name(), historyId);
//        sendDataMap.put(MessageDataType.image.name(), imgUrl);
//
//        String sendMessage = convertMessageToString(MessageType.DRAWING, sendDataMap);
//        socketProvider.sendMessageToEmployee(employeeNo, sendMessage);
//
//        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
//        socketProvider.sendMessageToDevice(serialNumber, "Success Send Message");
//    }
//
//    public void damageHandler(WebSocketSession session, Map<String, String> dataMap) {
//        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
//        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());
//
//        String imgBinaryStr = dataMap.get(MessageDataType.image.name());
//        String x = dataMap.get(MessageDataType.x.name());
//        String y = dataMap.get(MessageDataType.y.name());
//        String category = dataMap.get(MessageDataType.category.name());
//
//        byte[] byteStr = Base64.getDecoder()
//                               .decode(imgBinaryStr);
//        MultipartFile multipartFile = WebSocketUtils.convertToMultipartFile(byteStr, "damaged.jpg");
//
//        String imgUrl = "";
//        try {
//            imgUrl = damagedHistoryService.createDamagedHistory(Long.valueOf(historyId),
//                multipartFile, Float.valueOf(x), Float.valueOf(y), Category.valueOf(category));
//        } catch (IOException e) {
//            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
//        }
//
//        Map<String, String> sendDataMap = new HashMap<>();
//        sendDataMap.put(MessageDataType.historyId.name(), historyId);
//        sendDataMap.put(MessageDataType.image.name(), imgUrl);
//        sendDataMap.put(MessageDataType.x.name(), x);
//        sendDataMap.put(MessageDataType.y.name(), y);
//        sendDataMap.put(MessageDataType.category.name(), category);
//
//        String sendMessage = convertMessageToString(MessageType.DRAWING, sendDataMap);
//        socketProvider.sendMessageToEmployee(employeeNo, sendMessage);
//
//        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
//        socketProvider.sendMessageToDevice(serialNumber, "Success Send Message");
//    }
//
//    public void statusHandler(WebSocketSession session, Map<String, String> dataMap) {
//
//        String historyId = getAttributeFromSessionStorage(session, SessionKey.historyId.name());
//        String employeeNo = getAttributeFromSessionStorage(session, SessionKey.employeeNo.name());
//
//        String state = dataMap.get(MessageDataType.state.name());
//        Map<String, String> sendDataMap = new HashMap<>();
//        sendDataMap.put(MessageDataType.historyId.name(), historyId);
//        sendDataMap.put(MessageDataType.state.name(), state);
//
//        String sendMessage = convertMessageToString(MessageType.STATUS, sendDataMap);
//        socketProvider.sendMessageToEmployee(employeeNo, sendMessage);
//
//        String serialNumber = getAttributeFromSessionStorage(session, SessionKey.username.name());
//        socketProvider.sendMessageToDevice(serialNumber, "Success Send Message");
//
//    }


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

