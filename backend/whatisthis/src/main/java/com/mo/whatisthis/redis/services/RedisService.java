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

    private Long customerSessionTTL = (long) 3600;


    private final RedisTemplate<String, String> redisTemplate;

    public String getValue(String key) {
        return redisTemplate.opsForValue()
                            .get(key);
    }

    public void saveData(String key, String value){
        redisTemplate.opsForValue()
                     .set(key, value);
    }

    public void saveDataWithTimeout(String key, String value, Long timeout){
        redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
    }

    public void deleteValue(String key) {
        redisTemplate.delete(key);
    }

    // refreshToken
    public void saveRefreshToken(String key, String value) {
        saveDataWithTimeout(key, value, refreshTokenTTL);
    }
    public String getRefreshTokenKey(String memberNo) {
        String returnValue = "member:" + memberNo + ":refreshToken";
        return returnValue;
    }

    // CustomerSession
    public void saveCustomerSession(String sessionId, String phone){
        String key = "customer:session:" + sessionId;
        saveDataWithTimeout(key, phone, customerSessionTTL);
    }
    public boolean existCustomerSession(String sessionId){
        return getValue("customer:session:" + sessionId) != null;
    }
}
