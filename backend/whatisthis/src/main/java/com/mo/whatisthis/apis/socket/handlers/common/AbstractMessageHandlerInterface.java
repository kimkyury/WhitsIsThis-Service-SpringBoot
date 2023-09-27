package com.mo.whatisthis.apis.socket.handlers.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.apis.history.services.DamagedHistoryService;
import com.mo.whatisthis.apis.history.services.DeviceHistoryService;
import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.apis.socket.dto.MessageDto;
import com.mo.whatisthis.apis.socket.dto.MessageDto.SendType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.MessageDataType;
import com.mo.whatisthis.apis.socket.handlers.common.CommonCode.SessionKey;
import com.mo.whatisthis.apis.socket.handlers.interfaces.MessageHandlerInterface;
import com.mo.whatisthis.apis.socket.services.SocketProvider;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.supports.codes.ErrorCode;
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

    @Override
    public void handle(WebSocketSession session, Map<String, String> dataMap) {

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

    public String getAttributeAtSession(WebSocketSession session, SessionKey key) {
        return (String) session.getAttributes()
                               .get(key.name());
    }

    public String getDataAtMap(Map<String, String> map, MessageDataType key){
        return map.get(key.name());
    }
}
