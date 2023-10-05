package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.history.services.HistoryService;
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
public class DrawingMessageHandlerImpl extends AbstractMessageHandlerInterface {

    private final HistoryService historyService;

    public DrawingMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        HistoryService historyService) {
        super(socketProvider, jwtTokenProvider);
        this.historyService = historyService;
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

        try {
            String imgUrl = historyService.uploadDrawing(Long.valueOf(historyId), multipartFile);
            saveDataAtMap(dataMap, DataType.image, imgUrl);
        } catch (IOException e) {
            sendErrorMessage(session, MessageError.DB_ACCESS_ERROR);
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        dataMap.put(DataType.historyId.name(), historyId);
        String sendMessage = convertMessageToString(SendType.DRAWING, dataMap);

        sendMessageToEmployee(session, senderDevice, receiverEmployeeNo, sendMessage);
    }

    @Override
    public boolean isValidMessageForm(WebSocketSession session, Map<String, String> dataMap) {

        String image = getDataAtMap(dataMap, DataType.image);
        if (image == null) {
            sendErrorMessage(session, MessageError.NOT_INCLUDE_IMAGE);
            return false;
        }

        return true;
    }
}

