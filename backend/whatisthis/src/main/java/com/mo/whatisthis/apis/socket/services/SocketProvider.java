package com.mo.whatisthis.apis.socket.services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.socket.dto.MessageDto;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class SocketProvider {

    private final Map<String, WebSocketSession> employeeByHistoryMap;
    private final Map<String, WebSocketSession> deviceBySerialNumberMap;

    private static ObjectMapper objectMapper;


    public SocketProvider() {
        this.employeeByHistoryMap = new ConcurrentHashMap<>();
        this.deviceBySerialNumberMap = new ConcurrentHashMap<>();
    }

    public void addEmployeeToSocket(String username, WebSocketSession employeeSession) {

        employeeByHistoryMap.put(username, employeeSession);
        System.out.println("Add to Employee");
    }

    public void removeEmployeeToSocket(String employeeNo) {

        employeeByHistoryMap.remove(employeeNo);
        System.out.println("REMOVE employee");

    }

    public void addDeviceToSocket(String serialNumber, WebSocketSession deviceSession) {

        deviceBySerialNumberMap.put(serialNumber, deviceSession);
        System.out.println("Add to Device");

    }

    public void removeDeviceToSocket(String serialNumber) {

        deviceBySerialNumberMap.remove(serialNumber);
        System.out.println("REMOVE device");

    }

    public void sendMessage(WebSocketSession session, String payload) {
        try {
            if (session.isOpen()) {
                TextMessage message = new TextMessage(payload);
                session.sendMessage(message);
            }
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public void closeConnectionDevice(WebSocketSession senderSession, String serialNumber,
        int closeCode, String reason) {

        WebSocketSession deviceSession = deviceBySerialNumberMap.get(serialNumber);
        try {
            if (deviceSession != null && deviceSession.isOpen()) {
                deviceSession.close(new CloseStatus(closeCode, reason));
            }
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public WebSocketSession getDeviceSession(String serialNumber) {
        WebSocketSession deviceSession = deviceBySerialNumberMap.get(serialNumber);
        return deviceSession;
    }

    public void sendMessageToDevice(WebSocketSession senderSession, String serialNumber,
        String payload) {

        WebSocketSession session = deviceBySerialNumberMap.get(serialNumber);
        if (session == null) {
            String errorText = "This DEVICE did not join the socket.";
            sendErrorMessage(senderSession, errorText);
        }

        try {
            if (session.isOpen()) {
                TextMessage message = new TextMessage(payload);
                session.sendMessage(message);
            }
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }


    public void sendMessageToEmployee(WebSocketSession senderSession, String employeeNo,
        String payload) {

        WebSocketSession session = employeeByHistoryMap.get(employeeNo);
        if (session == null) {
            String errorText = "This EMPLOYEE did not join the socket.";
            sendErrorMessage(senderSession, errorText);
        }

        try {
            if (session.isOpen()) {
                TextMessage message = new TextMessage(payload);
                session.sendMessage(message);
            }
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public void sendErrorMessage(WebSocketSession session, String errorText) {
        Map<String, String> errorData = new HashMap<>();
        errorData.put(DataType.message.name(), errorText);
        String errorMessage = convertMessageToString(SendType.SYSTEM_MESSAGE, errorData);

        sendMessage(session, errorMessage);
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

    public boolean existDevice(String serialNumber) {
        WebSocketSession deviceSession = deviceBySerialNumberMap.get(serialNumber);
        if (deviceSession == null) {
            return false;
        }
        return true;
    }

    public boolean existEmployee(String employeeNo) {
        WebSocketSession employeeSession = employeeByHistoryMap.get(employeeNo);
        if (employeeSession == null) {
            return false;
        }
        return true;
    }
}
