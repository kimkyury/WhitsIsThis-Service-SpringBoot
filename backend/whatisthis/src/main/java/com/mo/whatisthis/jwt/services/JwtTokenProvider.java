package com.mo.whatisthis.jwt.services;


import com.mo.whatisthis.jwt.dtos.TokenDto;
import com.mo.whatisthis.redis.services.RedisService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
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

    private static final String MEMBER_NO = "no";
    private static final String AUTHORITIES_KEY = "role";

    @Override
    public void afterPropertiesSet() throws Exception {

        // 1. secret 값을 디코딩시켜 byte값 얻기
        byte[] secretKeyBytes = Decoders.BASE64.decode(secret);

        // 2. Encoding에 필요한 KEY 생성
        signingKey = Keys.hmacShaKeyFor(secretKeyBytes);
    }

    public TokenDto createToken(String memberNo, String authorities) {
        //      2. 토큰 생성 메소드
        Long now = System.currentTimeMillis();
        Date validityAccess = new Date(now + accessTokenTTL * 1000);
        Date validityRefresh = new Date(now + refreshTokenTTL * 1000);

        String accessToken = Jwts.builder()
                                 .setHeaderParam("typ", "JWT")
                                 .setHeaderParam("alg", "HS256")
                                 .setExpiration(validityAccess)
                                 .setSubject("access-token")
                                 .claim(MEMBER_NO, memberNo)   // 사원번호, 기기 번호
                                 .claim(AUTHORITIES_KEY, authorities)  // 권한 ROLE
                                 .signWith(signingKey, SignatureAlgorithm.HS256)
                                 .compact();

        String refreshToken = Jwts.builder()
                                  .setHeaderParam("typ", "JWT")
                                  .setHeaderParam("alg", "HS256")
                                  .setExpiration(validityRefresh)
                                  .setSubject("refresh-token")
                                  .signWith(signingKey, SignatureAlgorithm.HS256)
                                  .compact();

        return new TokenDto(accessToken, refreshToken);
    }


    public boolean validateAccessToken(String accessToken) {
        try {
            //TODO: accessToken 자체를 유효시간을 부여
            if (redisService.getValue(accessToken) != null) {
                return false;
            }
            Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(accessToken);
            return true;
        } catch (ExpiredJwtException e) {
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        // 해당 토큰에서 Claims 영역 파싱하기
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

        String memberNo = getClaims(accessToken).get(MEMBER_NO)
                                                .toString();
        UserDetails userDetails = userDetailsService.loadUserByUsername(memberNo);
        return new UsernamePasswordAuthenticationToken(userDetails, "",
            userDetails.getAuthorities());
    }
}
