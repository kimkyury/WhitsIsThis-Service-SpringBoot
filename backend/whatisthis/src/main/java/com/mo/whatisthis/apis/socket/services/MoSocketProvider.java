package com.mo.whatisthis.socket.services;


import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class MoSocketProvider {

    // 한 집엔 한 Employee만 간다는 가정
    private static Map<Long, Session> employeeByHistoryMap = new HashMap<>();
    private static Map<String, Session> turtleSessionByTurtleNumber = new HashMap<>();

    public void addEmployeeToSocket(Long historyId, Session employeeSession){

        //TODO: historyid 유효성 검사 Error처리
        employeeByHistoryMap.put(historyId, employeeSession);
    }

    public void removeEmployeeToSocket(Long historyId){
        employeeByHistoryMap.remove(historyId);
    }

    public void addTurtleToSocket(String serialNumber, Session turtleSession){
        turtleSessionByTurtleNumber.put(serialNumber, turtleSession);
    }

    public void removeTurtleToSocket(String serialNumber){
        turtleSessionByTurtleNumber.remove(serialNumber);
    }

}
