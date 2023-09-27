package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity.Category;
import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.WebSocketUtils;
import java.io.IOException;
import java.util.Base64;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.WebSocketSession;

@Component
public class DamagedMessageHandlerImpl extends AbstractMessageHandlerInterface {

    private final DamagedHistoryService damagedHistoryService;

    public DamagedMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        DamagedHistoryService damagedHistoryService) {
        super(socketProvider, jwtTokenProvider);
        this.damagedHistoryService = damagedHistoryService;
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

        // Device가 Employee에게 보내는 Message

        String senderDevice = getAttributeAtSession(session, SessionKey.SERIAL_NUMBER);
        String receiverEmployeeNo = getAttributeAtSession(session, SessionKey.EMPLOYEE_NO);
        String historyId = getAttributeAtSession(session, SessionKey.HISTORY_ID);

        byte[] byteStr = Base64.getDecoder()
                               .decode(getDataAtMap(dataMap, DataType.image));
        removeDataAtMap(dataMap, DataType.image);
        MultipartFile multipartFile = WebSocketUtils.convertToMultipartFile(byteStr, "drawing.jpg");

        Float x = Float.valueOf(getDataAtMap(dataMap, DataType.x));
        Float y = Float.valueOf(getDataAtMap(dataMap, DataType.y));
        Category category = Category.valueOf(getDataAtMap(dataMap, DataType.category));

        try {
            String imgUrl = damagedHistoryService.createDamagedHistory(
                Long.valueOf(historyId), multipartFile, x, y, category);
            saveDataAtMap(dataMap, DataType.image, imgUrl);
        } catch (IOException e) {
            //TODO: Send Error Message
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        saveDataAtMap(dataMap, DataType.historyId, historyId);
        String sendMessage = convertMessageToString(SendType.DAMAGED, dataMap);

        sendMessageToEmployee(session, senderDevice, receiverEmployeeNo, sendMessage);
    }
}

