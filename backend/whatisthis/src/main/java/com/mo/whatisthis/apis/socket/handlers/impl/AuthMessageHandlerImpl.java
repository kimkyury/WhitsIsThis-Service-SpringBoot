package com.mo.whatisthis.apis.socket.handlers.impl;

import com.mo.whatisthis.apis.socket.handlers.common.AbstractMessageHandlerInterface;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.MessageError;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import io.jsonwebtoken.Claims;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;


@Component
public class AuthMessageHandlerImpl extends AbstractMessageHandlerInterface {

    private final RedisService redisService;

    public AuthMessageHandlerImpl(
        SocketProvider socketProvider, JwtTokenProvider jwtTokenProvider,
        RedisService redisService) {
        super(socketProvider, jwtTokenProvider);
        this.redisService = redisService;
    }

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

        String accessToken = getDataAtMap(dataMap, DataType.accessToken);
        if(accessToken == null){
            sendErrorMessage(session, MessageError.NOT_INCLUDE_ACCESSTOKEN);
            return;
        }

        Claims claims = getClaimsByToken(accessToken);
        String memberNo = getInfoAtClaim(claims, MEMBER_NO_KEY);
        String role = getInfoAtClaim(claims, AUTHORITIES_KEY);
        saveAttributeAtSession(session, SessionKey.ROLE, role);

        if (isEmployee(role)) {
            saveAttributeAtSession(session, SessionKey.EMPLOYEE_NO, memberNo);
            // 소켓 연결 대상 추가와 정상 작동 ResponseMessage 를 보냄
            addEmployeeToMapAndSendResponse(session, memberNo);

        } else {
            deviceProcedure(session, memberNo);
        }
    }

    private void deviceProcedure(WebSocketSession session, String memberNo){

        // HTTP로 Device의 Register여부를 확인한 상태
        String[] redisData = redisService.getValue("device:" + memberNo)
                                         .split("/");

        String employeeNo = redisData[0];
        String historyId = redisData[1];

        saveAttributeAtSession(session, SessionKey.HISTORY_ID, historyId);
        saveAttributeAtSession(session, SessionKey.EMPLOYEE_NO, employeeNo);
        saveAttributeAtSession(session, SessionKey.SERIAL_NUMBER, memberNo);

        addDeviceToMapAndSendResponse(session, memberNo);

        Map<String, String> sendDataMap = new HashMap<>();
        saveDataAtMap(sendDataMap, DataType.historyId, historyId);
        saveDataAtMap(sendDataMap, DataType.state, "CONNECTED");
        String sendMessage = convertMessageToString(SendType.STATUS, sendDataMap);

        socketProvider.sendMessageToEmployee(session, employeeNo, sendMessage);
    }
}
