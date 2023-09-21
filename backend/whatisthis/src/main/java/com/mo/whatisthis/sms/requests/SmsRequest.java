package com.mo.whatisthis.sms.requests;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class SmsRequest {

    private String type;
    private String contentType;
    private String countryCode;
    private String from;
    private String content;
    private MessageDto message;

    @Data
    @NoArgsConstructor
    @Builder
    public class MessageDto {

        String to;
        String content;
    }
}
