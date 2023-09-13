package com.mo.whatisthis.jwt.services;


import com.mo.whatisthis.jwt.dtos.TokenDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Base64;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;

public class JwtTokenProvider implements InitializingBean {

    @Value("${jwt.secret}")
    private String secret;
    private static Key signingKey;

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

//    public TokenDto createToken(){
//    //      2. 토큰 생성 메소드
//
//
//
//        return null;
//    }
//
//
//    //      3. 권한 객체 생성 메소드
//    //      4. 유효성 검사 메소드
}
