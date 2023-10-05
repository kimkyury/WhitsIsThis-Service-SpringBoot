package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.MessageError;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class CoordinateMessageHandlerImpl extends AbstractMessageHandlerInterface {

    public CoordinateMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider) {
        super(socketProvider, jwtTokenProvider);
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

        if (!isValidMessageForm(session, dataMap)) {
            return;
        }

        String senderDevice = getAttributeAtSession(session, SessionKey.SERIAL_NUMBER);
        String receiverEmployeeNo = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyId = getAttributeAtSession(session, SessionKey.HISTORY_ID);
        
        saveDataAtMap(dataMap, DataType.historyId, historyId);
        String sendMessage = convertMessageToString(SendType.COORDINATE, dataMap);

        sendMessageToEmployee(session, senderDevice, receiverEmployeeNo, sendMessage);
    }

    @Override
    public boolean isValidMessageForm(WebSocketSession session, Map<String, String> dataMap) {

        String x = getDataAtMap(dataMap, DataType.x);
        if (x == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_X);
            return false;
        }

        String y = getDataAtMap(dataMap, DataType.y);
        if (y == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_Y);
            return false;
        }

        return true;
    }
}

