package com.mo.whatisthis.apis.socket.configs;

import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.security.service.UserDetailsImpl;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.util.Map;
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

    private final JwtTokenProvider jwtTokenProvider;

    public Role getRoleByAccessToken(ServerHttpRequest request) {

        String accessToken = request.getHeaders()
                                    .getFirst("Authorization")
                                    .substring(7);

        UserDetailsImpl principal = (UserDetailsImpl) jwtTokenProvider
            .getAuthentication(accessToken)
            .getPrincipal();

        return principal.getRole();
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
        WebSocketHandler wsHandler, Map<String, Object> attributes) {

        String role = getRoleByAccessToken(request).name();
        attributes.put("role", role);

        // TODO: request instanceof ServletServerHttpRequest 조건문 오류 발생시 재적용
        ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;

        if (role.equals(Role.ROLE_EMPLOYEE)) {
            String historyIdStr = servletRequest.getServletRequest()
                                                .getParameter("historyId");
            if (historyIdStr == null) {
                throw new CustomException(ErrorCode.MISSING_PARAMETER);
            }

            attributes.put("historyId", Long.valueOf(historyIdStr));

        } else if (role.equals(Role.ROLE_DEVICE)) {
            String serialNumber = servletRequest.getServletRequest()
                                                .getParameter("serialNumber");
            if (serialNumber == null) {
                throw new CustomException(ErrorCode.MISSING_PARAMETER);
            }

            attributes.put("serialNumber", serialNumber);

        }

        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
        WebSocketHandler wsHandler, Exception exception) {

    }
}
