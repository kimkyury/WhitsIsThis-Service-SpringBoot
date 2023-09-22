package com.mo.whatisthis.supports.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AWSS3ResponseUtil {

    @Value("${cloud.aws.s3.url}")
    private String s3URL;

    public String concatURL(String fileName) {
        return s3URL + fileName;
    }
}
