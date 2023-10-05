package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.repositories.HistoryRepository;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.CommandCode;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.MessageError;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class CommandMessageHandlerImpl extends AbstractMessageHandlerInterface {

    private final RequestRepository requestRepository;
    private final HistoryRepository historyRepository;
    private final RedisService redisService;

    public CommandMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        RequestRepository requestRepository,
        HistoryRepository historyRepository,
        RedisService redisService) {
        super(socketProvider, jwtTokenProvider);
        this.requestRepository = requestRepository;
        this.historyRepository = historyRepository;
        this.redisService = redisService;
    }

    @Override
    @Transactional
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

        if (!isValidMessageForm(session, dataMap)) {
            return;
        }

        String senderEmployee = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);
        String command = getDataAtMap(dataMap, DataType.command);

        WebSocketSession targetDeviceSession = socketProvider.getDeviceSession(serialNumber);
        Long historyId = Long.valueOf(
            getAttributeAtSession(targetDeviceSession, SessionKey.HISTORY_ID));

        updateRequest(historyId, command);

        String sendMessage = convertMessageToString(SendType.COMMAND, dataMap);
        sendMessageToDevice(session, senderEmployee, serialNumber, sendMessage);

        if (command.equals(CommandCode.END.name())) {
            socketProvider.closeConnectionDevice(session, serialNumber, 1000, sendMessage);
        }
    }

    public void updateRequest(Long historyId, String command) {

        // HistoryId는 RegisterHandler 에서 검증된 상태
        Long requestId = historyRepository.findById(historyId)
                                          .get()
                                          .getRequestId();
        System.out.println("request Id >>>>> " + requestId);

        RequestEntity request = requestRepository.findById(requestId)
                                                 .get();
        if (command.equals(CommandCode.START.name())) {
            request.setStatus(Status.IN_PROGRESS);
            requestRepository.save(request);
        } else if (command.equals(CommandCode.END.name())) {
            request.setStatus(Status.DONE);
            requestRepository.save(request);
        }
    }

    @Override
    public boolean isValidMessageForm(WebSocketSession session, Map<String, String> dataMap) {

        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);
        if (serialNumber == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_SERIALNUMBER);
            return false;
        }
        if(redisService.getValue("device:" + serialNumber) == null){
            sendErrorMessage(session, MessageError.IS_NOT_REGISTER_DEVICE);
            return false;
        }
        if (!socketProvider.existDevice(serialNumber)) {
            sendErrorMessage(session, MessageError.NOT_CONNECT_DEVICE);
            return false;
        }

        // CheckData, command
        String command = getDataAtMap(dataMap, DataType.command);
        if (command == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_COMMAND);
            return false;
        }
        try {
            CommandCode.valueOf(command);
        } catch (IllegalArgumentException e) {
            sendErrorMessage(session, MessageError.INVALID_COMMAND_TYPE);
            return false;
        }

        return true;
    }
}

