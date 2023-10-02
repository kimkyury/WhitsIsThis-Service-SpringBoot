package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.repositories.HistoryRepository;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.CommandCode;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.util.HashMap;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class CommandMessageHandlerImpl extends AbstractMessageHandlerInterface {

    private final RequestRepository requestRepository;
    private final HistoryRepository historyRepository;

    public CommandMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        RequestRepository requestRepository,
        HistoryRepository historyRepository) {
        super(socketProvider, jwtTokenProvider);
        this.requestRepository = requestRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    @Transactional
    public void handle(WebSocketSession session, Map<String, String> dataMap) {
        // Employee가 Device에게 보내는 메시지 (START, END)

        String senderEmployee = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);
        String command = getDataAtMap(dataMap, DataType.command);

        Long historyId = Long.valueOf(getAttributeAtSession(session, SessionKey.HISTORY_ID));
        Long requestId = historyRepository.findById(historyId)
                                          .get()
                                          .getRequestId();
        RequestEntity request = requestRepository.findById(requestId)
                                                 .get();

        try {

            if (command.equals(CommandCode.START.name())) {

                request.setStatus(Status.IN_PROGRESS);
                requestRepository.save(request);
            } else if (command.equals(CommandCode.END.name())) {

                request.setStatus(Status.DONE);
                requestRepository.save(request);
            }
            CommandCode.valueOf(command);
            String sendMessage = convertMessageToString(SendType.COMMAND, dataMap);
            sendMessageToDevice(session, senderEmployee, serialNumber, sendMessage);
            if (command.equals(CommandCode.END.name())) {
                socketProvider.closeConnectionDevice(session, serialNumber, 1000, sendMessage);
            }

        } catch (IllegalArgumentException | NullPointerException e) {
            Map<String, String> errorDataMap = new HashMap<>();
            errorDataMap.put(DataType.message.name(),
                "Command value is invalid. (You can only use the words 'START' or 'END' )");
            String message = convertMessageToString(SendType.SYSTEM_MESSAGE, errorDataMap);
            socketProvider.sendMessageToEmployee(session, senderEmployee, message);
        }
    }
}

