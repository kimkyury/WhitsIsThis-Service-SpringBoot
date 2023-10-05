package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.repositories.HistoryRepository;
import com.mo.whatisthis.apis.member.repositories.MemberRepository;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.MessageError;
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
    private final HistoryRepository historyRepository;
    private final MemberRepository memberRepository;

    public RegisterMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        RedisService redisService,
        HistoryRepository historyRepository,
        MemberRepository memberRepository) {
        super(socketProvider, jwtTokenProvider);
        this.redisService = redisService;
        this.historyRepository = historyRepository;
        this.memberRepository = memberRepository;
    }


    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {
        // Employee가 Device를 등록하는 메시지
        if (!isValidMessageForm(session, dataMap)) {
            return;
        }

        String senderEmployee = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyIdStr = getDataAtMap(dataMap, DataType.historyId);
        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);

        saveAttributeAtSession(session, SessionKey.HISTORY_ID, historyIdStr);
        redisService.saveData("device:" + serialNumber, senderEmployee + "/" + historyIdStr);

        String message = createSuccessMessage();
        socketProvider.sendMessageToEmployee(session, senderEmployee, message);
    }

    @Override
    public boolean isValidMessageForm(WebSocketSession session, Map<String, String> dataMap) {

        String serialNumber = getDataAtMap(dataMap, DataType.serialNumber);
        if (serialNumber == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_SERIALNUMBER);
            return false;
        }

        String historyIdStr = getDataAtMap(dataMap, DataType.historyId);
        if (historyIdStr == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_HISTORYID);
            return false;
        }

        if (memberRepository.findByUsername(serialNumber)
                            .isEmpty()) {
            sendErrorMessage(session, MessageError.NOT_EXIST_DEVICE);
            return false;
        }
        if (historyRepository.findById(Long.valueOf(historyIdStr)) == null) {
            sendErrorMessage(session, MessageError.NOT_EXIST_HISTORY);
            return false;
        }


        return true;
    }
}

