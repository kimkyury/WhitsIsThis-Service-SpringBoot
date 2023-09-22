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
    private ConcurrentHashMap<String, WebSocketSession> turtleSessionByTurtleNumber;

    public MoSocketProvider() {
        this.employeeByHistoryMap = new ConcurrentHashMap<>();
        this.turtleSessionByTurtleNumber = new ConcurrentHashMap<>();
    }

    public void addEmployeeToSocket(Long historyId, WebSocketSession employeeSession) {

        //TODO: historyid 유효성 검사 Error처리
        employeeByHistoryMap.put(historyId, employeeSession);
        System.out.println(">>>>>>>>>>>> Add Employee User to Map");
    }

    public void removeEmployeeToSocket(Long historyId) {
        employeeByHistoryMap.remove(historyId);
    }

    public void addTurtleToSocket(String serialNumber, WebSocketSession turtleSession) {
        turtleSessionByTurtleNumber.put(serialNumber, turtleSession);
    }

    public void removeTurtleToSocket(String serialNumber) {
        turtleSessionByTurtleNumber.remove(serialNumber);
    }

}
