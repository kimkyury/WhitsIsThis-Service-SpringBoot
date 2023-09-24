package com.mo.whatisthis.apis.socket.services;


import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.IOException;
import java.net.http.WebSocket;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class MoSocketProvider {

    private ConcurrentHashMap<Long, WebSocketSession> employeeByHistoryMap;
    private ConcurrentHashMap<String, WebSocketSession> deviceBySerialNumberMap;

    public MoSocketProvider() {
        this.employeeByHistoryMap = new ConcurrentHashMap<>();
        this.deviceBySerialNumberMap = new ConcurrentHashMap<>();
    }

    public void addEmployeeToSocket(Long historyId, WebSocketSession employeeSession) {

        //TODO: historyid 유효성 검사 Error처리
        employeeByHistoryMap.put(historyId, employeeSession);
        System.out.println(">>>>>>>>>>>> Add Employee to Map");
    }

    public void removeEmployeeToSocket(Long historyId) {
        employeeByHistoryMap.remove(historyId);
    }

    public void addDeviceToSocket(String serialNumber, WebSocketSession deviceSession) {
        deviceBySerialNumberMap.put(serialNumber, deviceSession);
        System.out.println(">>>>>>>>>>>> Add Device to Map");
    }

    public void removeDeviceToSocket(String serialNumber) {
        deviceBySerialNumberMap.remove(serialNumber);
    }

    public void sendTextMessage(WebSocketSession session, String payload) {
        try {
            if (session.isOpen()) {
                TextMessage message = new TextMessage(payload);
                session.sendMessage(message);
            }
        }catch(IOException e){
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public Optional<WebSocketSession> getEmployeeSessionByHistory(Long historyId){
        return Optional.ofNullable(employeeByHistoryMap.get(historyId));
    }

    public Optional<WebSocketSession> getDeviceSessionBySerialNumber(String serialNumber){
        return  Optional.ofNullable(deviceBySerialNumberMap.get(serialNumber));
    }


}
