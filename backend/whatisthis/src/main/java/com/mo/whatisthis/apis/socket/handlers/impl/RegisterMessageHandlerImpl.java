package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class RegisterMessageHandlerImpl extends AbstractMessageHandlerInterface {

    private final RedisService redisService;

    public RegisterMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        RedisService redisService) {
        super(socketProvider, jwtTokenProvider);
        this.redisService = redisService;
    }


    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {
        // Employee가 Device를 등록하는 메시지

        String senderEmployee = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyId = getDataAtMap(dataMap, DataType.historyId);
        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);

        // For Command에서 DB-Requets 상태 변경
        saveAttributeAtSession(session, SessionKey.HISTORY_ID, historyId);

        redisService.saveData("device:" + serialNumber, senderEmployee + "/" + historyId);

        String message = createSuccessMessage();
        socketProvider.sendMessageToEmployee(session, senderEmployee, message);
    }
}

