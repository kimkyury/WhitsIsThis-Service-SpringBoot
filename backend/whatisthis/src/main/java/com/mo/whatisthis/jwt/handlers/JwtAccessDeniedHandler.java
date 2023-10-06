package com.mo.whatisthis.jwt.handlers;

import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
        AccessDeniedException accessDeniedException) throws IOException {

        // TODO: 만료시점과 올바르지 않음을 구분할 수 있다면 구분할 것
        response.setCharacterEncoding("utf-8");
        response.sendError(ErrorCode.TOKEN_INVALID.getStatus(),
            ErrorCode.TOKEN_INVALID.getMessage());
    }
}