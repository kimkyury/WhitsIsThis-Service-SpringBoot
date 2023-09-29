package com.mo.whatisthis.security.filters;

import com.mo.whatisthis.redis.services.RedisService;
import java.io.IOException;
import java.util.Arrays;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
public class CustomerSessionCheckFilter extends OncePerRequestFilter {

    private final RedisService redisService;
    private final String[] AUTH_CUSTOMER_LIST = {"/api/v1/guest/**"};

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        String sessionId = request.getSession()
                                  .getId();
        String requestURI = request.getRequestURI();

        // Customer 전용 API에 대하여 Redis에 Session이 저장되지 않았다면
        if (isCustomer(requestURI) && !redisService.existCustomerSession(sessionId)) {
            response.sendError(401); //TODO: JwtAuthenticationFilter에서도 401로 바꿔야 함
            return;
        }

        filterChain.doFilter(request, response);
    }

    public boolean isCustomer(String requestURI) {
        return Arrays.stream(AUTH_CUSTOMER_LIST)
                     .anyMatch(pattern ->
                         requestURI.startsWith(pattern.replace("/**", "")));
    }
}
