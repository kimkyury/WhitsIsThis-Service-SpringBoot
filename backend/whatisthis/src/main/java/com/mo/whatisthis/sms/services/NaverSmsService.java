package com.mo.whatisthis.sms.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mo.whatisthis.sms.requests.SmsRequest;
import com.mo.whatisthis.sms.requests.SmsRequest.MessageDto;
import com.mo.whatisthis.sms.responses.SmsResponse;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class NaverSmsService {

    @Value("${naver-cloud.sms.access-key}")
    private String accessKey;

    @Value("${naver-cloud.sms.secret-key}")
    private String secretKey;

    @Value("${naver-cloud.sms.service-id}")
    private String serviceId;

    @Value("${naver-cloud.sms.sender-number}")
    private String senderPhone;

    public String makeSignature(Long time)
        throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {

        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + this.serviceId + "/messages";
        String timestamp = time.toString();
        String accessKey = this.accessKey;
        String secretKey = this.secretKey;

        String message = new StringBuilder()
            .append(method)
            .append(space)
            .append(url)
            .append(newLine)
            .append(timestamp)
            .append(newLine)
            .append(accessKey)
            .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

    public MessageDto makeMessageDto(String to, String content) {

        MessageDto messageDto = MessageDto.builder()
            .to(to)
            .content(content)
            .build();

        return messageDto;
    }

    public SmsRequest makeSmsRequest(MessageDto messageDto) {
        List<MessageDto> list = new ArrayList<>();
        list.add(messageDto);

        SmsRequest smsRequest = SmsRequest.builder()
                                          .type("SMS")
                                          .contentType("COMM")
                                          .countryCode("82")
                                          .from(senderPhone)
                                          .content(messageDto.getContent())
                                          .messages(list)
                                          .build();
        return smsRequest;
    }


    public SmsResponse sendSmsRequest(SmsRequest smsRequest)
        throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
        
        Long time = System.currentTimeMillis();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", makeSignature(time));

        ObjectMapper objectMapper = new ObjectMapper();
        String body = objectMapper.writeValueAsString(smsRequest);
        HttpEntity<String> httpBody = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        SmsResponse response = restTemplate.postForObject(
            new URI("https://sens.apigw.ntruss.com/sms/v2/services/" + serviceId + "/messages"),
            httpBody, SmsResponse.class);


        return response;
    }
}
