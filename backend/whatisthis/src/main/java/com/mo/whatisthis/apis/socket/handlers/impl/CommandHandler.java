package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.history.services.DeviceHistoryService;
import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.CommandCode;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import io.lettuce.core.protocol.CommandType;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class CommandHandler extends AbstractMessageHandlerInterface {

    public CommandHandler(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        RedisService redisService, HistoryService historyService,
        DamagedHistoryService damagedHistoryService, DeviceHistoryService deviceHistoryService) {
        super(socketProvider, jwtTokenProvider, redisService, historyService, damagedHistoryService,
            deviceHistoryService);
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {
        // Employee가 Device에게 보내는 메시지 (START, END)

        String employeeNo = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);
        String command = getDataAtMap(dataMap, DataType.command);

        Map<String, String> map = new HashMap<>();
        map.put(DataType.command.name(), command);
        String sendMessage = convertMessageToString(SendType.COMMAND, map);
        sendMessageToDevice(employeeNo, serialNumber, sendMessage);

        if (command.equals(CommandCode.END)) {
            socketProvider.closeConnectionDevice(serialNumber, 1000, sendMessage);
        }
    }
}

