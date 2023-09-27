package com.mo.whatisthis.apis.socket.handlers.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.history.services.DeviceHistoryService;
import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.socket.dto.MessageDto;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.handlers.interfaces.MessageHandlerInterface;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.supports.codes.ErrorCode;
import io.jsonwebtoken.Claims;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.WebSocketSession;


@RequiredArgsConstructor
public class AbstractMessageHandlerInterface implements MessageHandlerInterface {

    protected final SocketProvider socketProvider;
    protected final JwtTokenProvider jwtTokenProvider;
    protected final RedisService redisService;
    protected final HistoryService historyService;
    protected final DamagedHistoryService damagedHistoryService;
    protected final DeviceHistoryService deviceHistoryService;

    protected static ObjectMapper objectMapper = new ObjectMapper();

    protected static final String MEMBER_NO_KEY = "memberNo";
    protected static final String AUTHORITIES_KEY = "role";


    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

    }


    public String getAttributeAtSession(WebSocketSession session, SessionKey key) {
        return (String) session.getAttributes()
                               .get(key.name());
    }

    public void saveAttributeAtSession(WebSocketSession session, SessionKey key, String value){
        session.getAttributes().put(key.name(), value);
    }

    public String getDataAtMap(Map<String, String> map, DataType key) {
        return map.get(key.name());
    }

    public Claims getClaimsByToken(String accessToken) {
        return jwtTokenProvider.getClaims(accessToken.substring(7));
    }

    public String getInfoAtClaim(Claims claims, String key) {
        return claims.get(key)
                     .toString();
    }

    public boolean isEmployee(String role) {
        return role.equals(Role.ROLE_EMPLOYEE);
    }

    public void addEmployeeToMapAndSendResponse(WebSocketSession session, String employeeNo) {
        socketProvider.addEmployeeToSocket(employeeNo, session);
        String sendMessage = createSuccessMessage();
        socketProvider.sendMessageToEmployee(employeeNo, sendMessage);
    }

    public void addDeviceToMapAndSendResponse(WebSocketSession session, String serialNumber){
        socketProvider.addDeviceToSocket(serialNumber, session);
        String sendMessage = createSuccessMessage();
        socketProvider.sendMessageToDevice(serialNumber, sendMessage);
    }

    public String createSuccessMessage() {
        Map<String, String> dataMap = new HashMap<>();
        dataMap.put(DataType.result.name(), "SEND SUCCESS");
        return convertMessageToString(SendType.SEND_RESULT, dataMap);
    }

    public String createFailMessage() {
        Map<String, String> dataMap = new HashMap<>();
        dataMap.put(DataType.result.name(), "SEND FAIL");
        return convertMessageToString(SendType.SEND_RESULT, dataMap);
    }


    public String convertMessageToString(SendType messageType, Map<String, String> dataMap) {

        MessageDto messageDto = MessageDto.builder()
                                          .type(messageType)
                                          .data(dataMap)
                                          .build();

        try {
            String str = objectMapper.writeValueAsString(messageDto);
            return str;
        } catch (JsonProcessingException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }



}
