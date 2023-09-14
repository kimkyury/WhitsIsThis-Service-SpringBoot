package com.mo.whatisthis.redis.services;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.refresh-token-ttl}")
    private Integer refreshTokenTTL;
    @Value("${jwt.access-token-ttl}")
    private Integer accessTokenTTL;

    public String getValue(String key) {
        return redisTemplate.opsForValue()
                            .get(key);
    }

    public void saveRefreshToken(String key, String value, int ttl) {
        redisTemplate.opsForValue()
                     .set(key, value, ttl, TimeUnit.SECONDS);
    }

    public void saveAccessToken(String key, String value) {
        redisTemplate.opsForValue()
                     .set(key, value);
    }

    public void deleteValue(String key) {
        redisTemplate.delete(key);
    }
}
