package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
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

        // Device가 Employee에게 보내는 Message

        String senderDevice = getAttributeAtSession(session, SessionKey.SERIAL_NUMBER);
        String receiverEmployeeNo = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyId = getAttributeAtSession(session, SessionKey.HISTORY_ID);

        // Todo: JSON형식 유효성 검사
        saveDataAtMap(dataMap, DataType.historyId, historyId);
        String sendMessage = convertMessageToString(SendType.COORDINATE, dataMap);

        sendMessageToEmployee( senderDevice, receiverEmployeeNo, sendMessage);
    }
}

