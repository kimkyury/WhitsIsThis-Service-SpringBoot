package com.mo.whatisthis.socket.services;


import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class MoSocketProvider {

    private static Map<Long, LinkedList<Session>> employeeByHistoryMap = new HashMap<>();

    public void addEmployeeToSocket(Long historyId, Session session){

        //TODO: historyid 유효성 검사 Error처리

        // 1. HistoryId가 Map에 존재하는지 확인, 없었다면 생성 후 새로운 linkedList 추가
        // 2. LinkedList에 session추가
        employeeByHistoryMap.getOrDefault(historyId, new LinkedList<Session>() );
        employeeByHistoryMap.get(historyId).add(session);
    }

    public void removeEmployeeToSocket(Long historyId, Session session){

        employeeByHistoryMap.get(historyId).remove(session);
    }

}
