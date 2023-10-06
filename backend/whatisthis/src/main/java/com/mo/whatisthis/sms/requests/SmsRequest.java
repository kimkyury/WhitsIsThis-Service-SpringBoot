package com.mo.whatisthis.sms.requests;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SmsRequest {

    private String type;
    private String contentType;
    private String countryCode;
    private String from;
    private String content;
    private List<MessageDto> messages;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MessageDto {
        String to;
        String content;
    }
}
