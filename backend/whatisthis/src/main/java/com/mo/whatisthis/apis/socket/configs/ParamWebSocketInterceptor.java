package com.mo.whatisthis.apis.socket.configs;

import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.security.service.UserDetailsImpl;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.CustomizableThreadCreator;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

@RequiredArgsConstructor
@Component
public class ParamWebSocketInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
        WebSocketHandler wsHandler, Map<String, Object> attributes) {

        HttpServletRequest httpServletRequest = ((ServletServerHttpRequest) request).getServletRequest();

        String historyIdStr = httpServletRequest.getParameter("historyId");
        if (historyIdStr != null) {
            attributes.put("role", Role.ROLE_EMPLOYEE);
            attributes.put("historyId", Long.valueOf(historyIdStr));
            return true;
        }

        String serialNumber = httpServletRequest.getParameter("serialNumber");
        if (serialNumber != null) {
            attributes.put("role", Role.ROLE_DEVICE);
            attributes.put("serialNumber", serialNumber);
            return true;
        }

        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
        WebSocketHandler wsHandler, Exception exception) {
    }
}
