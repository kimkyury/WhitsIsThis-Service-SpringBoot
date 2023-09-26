package com.mo.whatisthis.apis.socket.services;


import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class MoSocketProvider {

    private final Map<String, WebSocketSession> employeeByHistoryMap;
    private final Map<String, WebSocketSession> deviceBySerialNumberMap;

    public MoSocketProvider() {
        this.employeeByHistoryMap = new ConcurrentHashMap<>();
        this.deviceBySerialNumberMap = new ConcurrentHashMap<>();
    }

    public void addEmployeeToSocket(String username, WebSocketSession employeeSession) {

        employeeByHistoryMap.put(username, employeeSession);
    }

    public void removeEmployeeToSocket(String employeeNo) {

        employeeByHistoryMap.remove(employeeNo);

    }

    public void addDeviceToSocket(String serialNumber, WebSocketSession deviceSession) {

        deviceBySerialNumberMap.put(serialNumber, deviceSession);

    }

    public void removeDeviceToSocket(String serialNumber) {

        deviceBySerialNumberMap.remove(serialNumber);

    }

    public void sendMessageToDevice(String serialNumber, String payload) {

        WebSocketSession session = deviceBySerialNumberMap.get(serialNumber);

        try {
            if (session.isOpen()) {
                TextMessage message = new TextMessage(payload);
                session.sendMessage(message);
            }
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public void sendMessageToEmployee(String employeeNo, String payload) {

        WebSocketSession session = employeeByHistoryMap.get(employeeNo);
        if (session == null){
            // senderSession에게 closeCode 송신
            // senderSession에게 메시지로 현재 종료 이유를 안내
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
}
