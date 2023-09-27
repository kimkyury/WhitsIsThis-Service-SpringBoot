package com.mo.whatisthis.apis.socket.handlers.impl;

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
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class StatusMessageHandlerImpl extends AbstractMessageHandlerInterface {

    public StatusMessageHandlerImpl(
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

        // Device가 Employee에게 보내는 Message

        String senderDevice = getAttributeAtSession(session, SessionKey.SERIAL_NUMBER);
        String receiverEmployeeNo = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyId = getAttributeAtSession(session, SessionKey.HISTORY_ID);

        // Todo: JSON형식 유효성 검사
        saveDataAtMap(dataMap, DataType.historyId, historyId);
        String sendMessage = convertMessageToString(SendType.STATUS, dataMap);

        sendMessageToEmployee( senderDevice, receiverEmployeeNo, sendMessage);
    }
}

