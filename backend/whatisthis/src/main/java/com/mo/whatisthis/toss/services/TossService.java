package com.mo.whatisthis.toss.services;

import com.mo.whatisthis.exception.ExternalApiException;
import com.mo.whatisthis.toss.configs.TossConfig;
import com.mo.whatisthis.toss.models.Payment;
import com.mo.whatisthis.toss.requests.CancelPaymentRequest;
import com.mo.whatisthis.toss.requests.CreateVirtualAccountRequest;
import java.net.URI;
import java.util.Base64;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class TossService {

    private final TossConfig tossConfig;
    private final RestTemplate restTemplate;

    public Payment createVirtualAccount(CreateVirtualAccountRequest createVirtualAccountRequest) {
        URI uri = UriComponentsBuilder.fromUriString(tossConfig.getUrl())
                                      .path("/v1/virtual-accounts")
                                      .encode()
                                      .build()
                                      .toUri();

        RequestEntity<CreateVirtualAccountRequest> requestEntity = RequestEntity.post(uri)
                                                                                .contentType(
                                                                                    MediaType.APPLICATION_JSON)
                                                                                .header(
                                                                                    "Authorization",
                                                                                    "Basic " +
                                                                                        Base64.getEncoder()
                                                                                              .encodeToString(
                                                                                                  (tossConfig.getSecretKey()
                                                                                                      + ":").getBytes()))
                                                                                .body(
                                                                                    createVirtualAccountRequest);

        ResponseEntity<Payment> responseEntity;
        try {
            responseEntity = restTemplate.exchange(requestEntity, Payment.class);
        } catch (RestClientException e) {
            throw new ExternalApiException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ExternalApiException("Error occurred while calling external API.",
                responseEntity.getStatusCode());
        }

        return responseEntity.getBody();
    }

    public Payment cancelPayment(CancelPaymentRequest cancelPaymentRequest) {
        URI uri = UriComponentsBuilder.fromUriString(tossConfig.getUrl())
                                      .path("/v1/payments/{paymentKey}/cancel")
                                      .encode()
                                      .build()
                                      .expand(cancelPaymentRequest.getPaymentKey())
                                      .toUri();

        RequestEntity<CancelPaymentRequest> requestEntity = RequestEntity.post(uri)
                                                                         .contentType(
                                                                             MediaType.APPLICATION_JSON)
                                                                         .header(
                                                                             "Authorization",
                                                                             "Basic " +
                                                                                 Base64.getEncoder()
                                                                                       .encodeToString(
                                                                                           (tossConfig.getSecretKey()
                                                                                               + ":").getBytes()))
                                                                         .body(
                                                                             cancelPaymentRequest);

        ResponseEntity<Payment> responseEntity;
        try {
            responseEntity = restTemplate.exchange(requestEntity, Payment.class);
        } catch (RestClientException e) {
            throw new ExternalApiException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ExternalApiException("Error occurred while calling external API.",
                responseEntity.getStatusCode());
        }

        return responseEntity.getBody();
    }
}
