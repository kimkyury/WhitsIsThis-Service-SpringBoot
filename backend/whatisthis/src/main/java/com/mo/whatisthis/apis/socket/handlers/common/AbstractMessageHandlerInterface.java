package com.mo.whatisthis.apis.socket.handlers.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.socket.dto.MessageDto;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.DataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.MessageError;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.handlers.interfaces.MessageHandlerInterface;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
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

    protected static ObjectMapper objectMapper = new ObjectMapper();

    protected static final String MEMBER_NO_KEY = "memberNo";
    protected static final String AUTHORITIES_KEY = "role";


    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

    }

    public boolean isValidMessageForm(WebSocketSession session, Map<String, String> dataMap){
        return true;
    }


    protected String getAttributeAtSession(WebSocketSession session, SessionKey key) {
        return (String) session.getAttributes()
                               .get(key.name());
    }

    protected void saveAttributeAtSession(WebSocketSession session, SessionKey key, String value) {
        session.getAttributes()
               .put(key.name(), value);
    }

    protected String getDataAtMap(Map<String, String> map, DataType key) {
        return map.get(key.name());
    }

    protected void saveDataAtMap(Map<String, String> map, DataType key, String value) {
        map.put(key.name(), value);
    }

    protected void removeDataAtMap(Map<String, String> map, DataType key) {
        map.remove(key.name());
    }

    protected Claims getClaimsByToken(String accessToken) {
        return jwtTokenProvider.getClaims(accessToken.substring(7));
    }

    protected String getInfoAtClaim(Claims claims, String key) {
        return claims.get(key)
                     .toString();
    }

    protected boolean isEmployee(String role) {
        return role.equals(Role.ROLE_EMPLOYEE.name());
    }

    protected void addEmployeeToMapAndSendResponse(WebSocketSession session, String employeeNo) {
        socketProvider.addEmployeeToSocket(employeeNo, session);
        String sendMessage = createSuccessMessage();
        socketProvider.sendMessageToEmployee(session, employeeNo, sendMessage);
    }

    protected void addDeviceToMapAndSendResponse(WebSocketSession session, String serialNumber) {
        socketProvider.addDeviceToSocket(serialNumber, session);
        String sendMessage = createSuccessMessage();
        socketProvider.sendMessageToDevice(session, serialNumber, sendMessage);
    }

    protected void sendErrorMessage(WebSocketSession session, MessageError errorText) {
        Map<String, String> errorData = new HashMap<>();
        errorData.put(DataType.message.name(), errorText.name());
        String errorMessage = convertMessageToString(SendType.SYSTEM_MESSAGE, errorData);

        socketProvider.sendMessage(session, errorMessage);
    }

    protected void sendMessageToEmployee(WebSocketSession session, String sender, String receiver,
        String message) {
        socketProvider.sendMessageToEmployee(session, receiver, message);
        String resultMessage = createSuccessMessage();
        socketProvider.sendMessageToDevice(session, sender, resultMessage);
    }

    protected void sendMessageToDevice(WebSocketSession session, String sender, String receiver,
        String message) {
        socketProvider.sendMessageToDevice(session, receiver, message);
        String resultMessage = createSuccessMessage();
        socketProvider.sendMessageToEmployee(session, sender, resultMessage);
    }

    protected String createSuccessMessage() {
        Map<String, String> dataMap = new HashMap<>();
        dataMap.put(DataType.message.name(), "SUCCESS");
        return convertMessageToString(SendType.SYSTEM_MESSAGE, dataMap);
    }

    protected String createFailMessage() {
        Map<String, String> dataMap = new HashMap<>();
        dataMap.put(DataType.message.name(), "FAIL");
        return convertMessageToString(SendType.SYSTEM_MESSAGE, dataMap);
    }

    protected String convertMessageToString(SendType messageType, Map<String, String> dataMap) {

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
