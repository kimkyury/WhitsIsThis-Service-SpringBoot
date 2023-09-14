package com.mo.whatisthis.jwt.services;


import com.mo.whatisthis.jwt.dtos.TokenDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;

public class JwtTokenProvider implements InitializingBean {

    @Value("${jwt.secret}")
    private String secret;
    private static Key signingKey;

    private static final String MEMBER_NO = "no";
    private static final String AUTHORITIES_KEY = "role";

    @Value("${jwt.access-token-validity-in-seconds}")
    private Integer accessTokenValidityInSeconds;

    @Value("${jwt.refresh-token-validity-in-seconds}")
    private Integer refreshTokenValidityInSeconds;

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
        Date validityAccess = new Date(now + accessTokenValidityInSeconds);
        Date validityRefresh = new Date(now + refreshTokenValidityInSeconds);

        String accessToken = Jwts.builder()
                                 .setHeaderParam("typ", "JWT")
                                 .setHeaderParam("alg", "HS256")
                                 .setExpiration(validityAccess)
                                 .setSubject("access-token")
                                 .claim(MEMBER_NO, memberNo)   //
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

//
//
//    //      3. 권한 객체 생성 메소드
//    //      4. 유효성 검사 메소드
}
