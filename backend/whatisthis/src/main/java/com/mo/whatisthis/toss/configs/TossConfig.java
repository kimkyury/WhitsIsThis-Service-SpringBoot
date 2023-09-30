package com.mo.whatisthis.toss.configs;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class TossConfig {

    @Value("${payment.toss.url}")
    private String url;

    @Value("${payment.toss.client-key}")
    private String clientKey;

    @Value("${payment.toss.secret-key}")
    private String secretKey;
}
