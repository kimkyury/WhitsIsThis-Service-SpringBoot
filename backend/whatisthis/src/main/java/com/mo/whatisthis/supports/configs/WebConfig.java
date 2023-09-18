package com.mo.whatisthis.supports.configs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.supports.utils.MultipartJackson2HttpMessageConverter;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final ObjectMapper objectMapper;

    @Autowired
    public WebConfig(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MultipartJackson2HttpMessageConverter(objectMapper));
    }
}