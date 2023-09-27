package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.CommandCode;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class CommandMessageHandlerImpl extends AbstractMessageHandlerInterface {


    public CommandMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider) {
        super(socketProvider, jwtTokenProvider);
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {
        // Employee가 Device에게 보내는 메시지 (START, END)

        String senderEmployee = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);
        String command = getDataAtMap(dataMap, DataType.command);

        Map<String, String> map = new HashMap<>();

        try {
            CommandCode.valueOf(command);
        } catch (IllegalArgumentException | NullPointerException e) {
            map.put(DataType.message.name(),
                "Command value is invalid. (You can only use the words 'START' or 'END' )");
            String message = convertMessageToString(SendType.SYSTEM_MESSAGE, dataMap);
            socketProvider.sendMessageToEmployee(session, senderEmployee, message);
        }

        saveDataAtMap(map, DataType.command, command);
        String sendMessage = convertMessageToString(SendType.COMMAND, map);
        sendMessageToDevice(session, senderEmployee, serialNumber, sendMessage);

        if (command.equals(CommandCode.END)) {
            socketProvider.closeConnectionDevice(session, serialNumber, 1000, sendMessage);
        }
    }
}

