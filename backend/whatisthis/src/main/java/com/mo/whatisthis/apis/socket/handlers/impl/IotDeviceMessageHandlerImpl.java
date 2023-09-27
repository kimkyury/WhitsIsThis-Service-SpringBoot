package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.entities.DeviceHistoryEntity.Category;
import com.mo.whatisthis.apis.history.services.DeviceHistoryService;
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
public class IotDeviceMessageHandlerImpl extends AbstractMessageHandlerInterface {

    private final DeviceHistoryService deviceHistoryService;

    public IotDeviceMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        DeviceHistoryService deviceHistoryService) {
        super(socketProvider, jwtTokenProvider);
        this.deviceHistoryService = deviceHistoryService;
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

        // Device가 Employee에게 보내는 Message

        String sender = getAttributeAtSession(session, SessionKey.SERIAL_NUMBER);
        String employeeNo = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyId = getAttributeAtSession(session, SessionKey.HISTORY_ID);

        boolean isWorked = "1".equals(getDataAtMap(dataMap, DataType.isWorked));
        Float x = Float.valueOf(getDataAtMap(dataMap, DataType.x));
        Float y = Float.valueOf(getDataAtMap(dataMap, DataType.y));
        Category category = Category.valueOf(getDataAtMap(dataMap, DataType.category));

        deviceHistoryService.createDeviceHistory(Long.valueOf(historyId), x, y, category, isWorked);

        dataMap.put(DataType.historyId.name(), historyId);
        String sendMessage = convertMessageToString(SendType.IOT_DEVICE, dataMap);

        sendMessageToEmployee(session, sender, employeeNo, sendMessage);

    }
}

