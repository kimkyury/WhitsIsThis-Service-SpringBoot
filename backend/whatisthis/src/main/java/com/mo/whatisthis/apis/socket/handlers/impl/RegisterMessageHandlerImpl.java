package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.entities.DeviceHistoryEntity.Category;
import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.history.services.DeviceHistoryService;
import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class RegisterMessageHandlerImpl extends AbstractMessageHandlerInterface {

    public RegisterMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        RedisService redisService,
        HistoryService historyService,
        DamagedHistoryService damagedHistoryService,
        DeviceHistoryService deviceHistoryService) {
        super(socketProvider, jwtTokenProvider, redisService, historyService, damagedHistoryService,
            deviceHistoryService);
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {
        // Employee가 Device를 등록하는 메시지

        String historyId = getDataAtMap(dataMap, DataType.historyId);
        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);

        String sender = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);

        redisService.saveData("device:" + serialNumber, sender + "/" + historyId);

        String message = createSuccessMessage();
        socketProvider.sendMessageToEmployee(sender, message);
    }
}

