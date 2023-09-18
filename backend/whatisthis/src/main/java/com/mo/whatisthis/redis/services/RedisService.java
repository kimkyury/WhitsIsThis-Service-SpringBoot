package com.mo.whatisthis.redis.services;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisService {

    @Value("${jwt.refresh-token-ttl}")
    private Long refreshTokenTTL;
    @Value("${jwt.access-token-ttl}")
    private Long accessTokenTTL;

    private final RedisTemplate<String, String> redisTemplate;

    public String getValue(String key) {
        return redisTemplate.opsForValue()
                            .get(key);
    }

    public void saveRefreshToken(String key, String value) {
        redisTemplate.opsForValue()
                     .set(key, value, refreshTokenTTL, TimeUnit.SECONDS);
    }

    public void saveAccessToken(String key, String value) {
        redisTemplate.opsForValue()
                     .set(key, value, accessTokenTTL, TimeUnit.SECONDS);
    }

    public void deleteValue(String key) {
        redisTemplate.delete(key);
    }

    public String getRefreshTokenKey(String username) {
        String returnValue = "member:" + username + ":refreshToken";
        return returnValue;
    }
}
