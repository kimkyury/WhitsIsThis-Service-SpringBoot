package com.mo.whatisthis.jwt.handlers;

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

//        response.setCharacterEncoding("utf-8");
//        response.sendError(ErrorCode.UNAUTHORIZED_ERROR.getStatus(),
//            ErrorCode.UNAUTHORIZED_ERROR.getMessage());
    }
}