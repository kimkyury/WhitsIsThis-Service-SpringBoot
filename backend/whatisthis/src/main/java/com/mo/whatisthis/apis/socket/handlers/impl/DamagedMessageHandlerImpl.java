package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity.Category;
import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.MessageError;
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

        if (!isValidMessageForm(session, dataMap)) {
            return;
        }

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
            sendErrorMessage(session, MessageError.DB_ACCESS_ERROR);
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        saveDataAtMap(dataMap, DataType.historyId, historyId);
        String sendMessage = convertMessageToString(SendType.DAMAGED, dataMap);

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

        String image = getDataAtMap(dataMap, DataType.image);
        if (image == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_IMAGE);
            return false;
        }

        String category = getDataAtMap(dataMap, DataType.category);
        if (category == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_CATEGORY);
            return false;
        }
        try {
            Category.valueOf(category);
        } catch (IllegalArgumentException e) {
            sendErrorMessage(session, MessageError.INVALID_CATEGORY_TYPE);
            return false;
        }

        return true;
    }
}

