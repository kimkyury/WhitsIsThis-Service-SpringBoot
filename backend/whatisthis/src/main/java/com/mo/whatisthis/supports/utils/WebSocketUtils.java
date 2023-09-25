package com.mo.whatisthis.supports.utils;

import com.mo.whatisthis.supports.models.ByteArrayMultipartFile;
import org.springframework.web.multipart.MultipartFile;

public class WebSocketUtils {

    public static MultipartFile convertToMultipartFile(byte[] bytes, String name) {
        return new ByteArrayMultipartFile(bytes, name, name);
    }
}
