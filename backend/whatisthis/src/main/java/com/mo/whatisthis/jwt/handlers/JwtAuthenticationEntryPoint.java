package com.mo.whatisthis.jwt.handlers;

import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException authException) throws IOException, ServletException {

        response.setCharacterEncoding("utf-8");
        response.sendError(ErrorCode.UNAUTHORIZED.getStatus(),
            ErrorCode.UNAUTHORIZED.getMessage());
    }
}