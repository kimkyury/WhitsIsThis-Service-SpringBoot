package com.mo.whatisthis.supports.utils;

import org.springframework.beans.factory.annotation.Value;

public class AWSS3ResponseUtil {

    @Value("${cloud.aws.s3.url}")
    private static String s3URL;

    public static String concatURL(String fileName) {
        return s3URL + fileName;
    }
}
