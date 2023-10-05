package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity.Category;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.CommandCode;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.MessageError;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.StateType;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class StatusMessageHandlerImpl extends AbstractMessageHandlerInterface {


    public StatusMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider) {
        super(socketProvider, jwtTokenProvider);
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

        // Device가 Employee에게 보내는 Message
        if (!isValidMessageForm(session, dataMap)) {
            return;
        }

        String senderDevice = getAttributeAtSession(session, SessionKey.SERIAL_NUMBER);
        String receiverEmployeeNo = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyId = getAttributeAtSession(session, SessionKey.HISTORY_ID);

        saveDataAtMap(dataMap, DataType.historyId, historyId);
        saveDataAtMap(dataMap, DataType.serialNumber, senderDevice);
        String sendMessage = convertMessageToString(SendType.STATUS, dataMap);
        sendMessageToEmployee(session, senderDevice, receiverEmployeeNo, sendMessage);

    }

    @Override
    public boolean isValidMessageForm(WebSocketSession session, Map<String, String> dataMap) {

        String state = getDataAtMap(dataMap, DataType.state);
        if (state == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_STATE);
            return false;
        }
        try {
            StateType.valueOf(state);
        } catch (IllegalArgumentException e) {
            sendErrorMessage(session, MessageError.INVALID_STATE_TYPE);
            return false;
        }

        return true;
    }
}

