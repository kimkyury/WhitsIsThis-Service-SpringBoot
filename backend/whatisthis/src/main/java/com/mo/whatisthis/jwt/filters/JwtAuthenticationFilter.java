package com.mo.whatisthis.jwt.filters;


import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import io.jsonwebtoken.IncorrectClaimException;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationConverter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.header}")
    private String header;
    // 1. Username, password를 받아서 유저인지 확인하기
    // UserDetailServiceImpl내에 있는 loadUserByUsername이 자동으로 실행됨

    // 2. username, password 받기

    // 3. UserDetails 세션에 담기

    // 4. JWT토큰을 만들어서 응답하기
    // 권한 처리때문에 session을 넣어줌


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        String accessToken = resolveToken(request);

        try {
            if ( accessToken != null && jwtTokenProvider.validateAccessToken(accessToken)){
                Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
                System.out.println("인증 저장");
            }
        } catch (IncorrectClaimException e) {
            SecurityContextHolder.clearContext();
            System.out.println("유효하지 않은 JWT 입니다. ");
            response.sendError(403);
        } catch (UsernameNotFoundException e) {
            SecurityContextHolder.clearContext();
            System.out.println("해당 유저를 찾을 수가 없습니다. ");
            response.sendError(403);
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(header);
        if ( bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }


}
