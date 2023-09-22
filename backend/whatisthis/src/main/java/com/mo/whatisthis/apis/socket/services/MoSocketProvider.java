package com.mo.whatisthis.apis.socket.services;


import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class MoSocketProvider {

    private ConcurrentHashMap<Long, WebSocketSession> employeeByHistoryMap;
    private ConcurrentHashMap<String, WebSocketSession> deviceSessionBySerialNumber;

    public MoSocketProvider() {
        this.employeeByHistoryMap = new ConcurrentHashMap<>();
        this.deviceSessionBySerialNumber = new ConcurrentHashMap<>();
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
        deviceSessionBySerialNumber.put(serialNumber, deviceSession);
        System.out.println(">>>>>>>>>>>> Add Device to Map");
    }

    public void removeDeviceToSocket(String serialNumber) {
        deviceSessionBySerialNumber.remove(serialNumber);
    }

}
