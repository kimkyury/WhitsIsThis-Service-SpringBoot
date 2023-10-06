package com.mo.whatisthis.jwt.services;

import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.dtos.TokenDto;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.supports.codes.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider implements InitializingBean {

    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.refresh-token-ttl}")
    private Long refreshTokenTTL;
    @Value("${jwt.access-token-ttl}")
    private Long accessTokenTTL;

    private static Key signingKey;

    private final RedisService redisService;
    private final UserDetailsService userDetailsService;

    private static final String MEMBER_NO_KEY = "memberNo";
    private static final String AUTHORITIES_KEY = "role";

    @Override
    public void afterPropertiesSet() throws Exception {

        byte[] secretKeyBytes = Decoders.BASE64.decode(secret);
        signingKey = Keys.hmacShaKeyFor(secretKeyBytes);
    }

    public TokenDto createToken(String memberNo, String role) {

        Long now = System.currentTimeMillis();

        String accessToken = createAccessToken(memberNo, role);
        String refreshToken = createRefreshToken(memberNo);

        return new TokenDto(accessToken, refreshToken);
    }

    public String createRefreshToken(String memberNo) {

        long now = System.currentTimeMillis();
        Date validityRefresh = new Date(now + refreshTokenTTL * 1000);

        String refreshToken = Jwts.builder()
                                  .setHeaderParam("typ", "JWT")
                                  .setHeaderParam("alg", "HS256")
                                  .setExpiration(validityRefresh)
                                  .setSubject("refresh-token")
                                  .claim(MEMBER_NO_KEY, memberNo)
                                  .signWith(signingKey, SignatureAlgorithm.HS256)
                                  .compact();

        return refreshToken;
    }

    public String createAccessToken(String memberNo, String role) {
        long now = System.currentTimeMillis();
        Date validityAccess = new Date(now + accessTokenTTL * 1000);

        String accessToken = Jwts.builder()
                                 .setHeaderParam("typ", "JWT")
                                 .setHeaderParam("alg", "HS256")
                                 .setExpiration(validityAccess)
                                 .setSubject("access-token")
                                 .claim(MEMBER_NO_KEY, memberNo)   // 사원번호, 기기 번호
                                 .claim(AUTHORITIES_KEY, role)  // 권한 ROLE
                                 .signWith(signingKey, SignatureAlgorithm.HS256)
                                 .compact();

        return accessToken;
    }

    public boolean validateAccessToken(String accessToken) {

        try {
            if (redisService.getValue(accessToken) != null) {
                throw new CustomException(ErrorCode.TOKEN_INVALID); // 로그아웃으로 차단된 AccessToken
            }

            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(signingKey)
                                .build()
                                .parseClaimsJws(accessToken)
                                .getBody();

            Date expiration = claims.getExpiration();
            if (expiration.before(new Date())) {
                throw new CustomException(ErrorCode.TOKEN_EXPIRED);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims getClaimsFromRefreshToken(String refreshToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(signingKey)
                                .build()
                                .parseClaimsJws(refreshToken)
                                .getBody();

            Date expiration = claims.getExpiration();
            if (expiration.before(new Date())) {
                throw new CustomException(ErrorCode.TOKEN_EXPIRED);
            }
            return claims;
        } catch (ExpiredJwtException e) {
            throw new CustomException(ErrorCode.TOKEN_EXPIRED);
        }
    }

    public Claims getClaims(String token) {

        try {
            return Jwts.parserBuilder()
                       .setSigningKey(signingKey)
                       .build()
                       .parseClaimsJws(token)
                       .getBody();
        } catch (ExpiredJwtException e) { // Access Token
            return e.getClaims();
        }
    }

    public Authentication getAuthentication(String accessToken) {

        String memberNo = getClaims(accessToken).get(MEMBER_NO_KEY)
                                                .toString();
        UserDetails userDetails = userDetailsService.loadUserByUsername(memberNo);
        return new UsernamePasswordAuthenticationToken(userDetails, "",
            userDetails.getAuthorities());
    }
}
