package com.mo.whatisthis.apis.payment.requests;

import com.mo.whatisthis.apis.payment.entities.PaymentEntity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WebhookDepositRequest {

    private String createdAt;
    private String secret;
    private Status status;
    private String transactionKey;
    private String orderId;
}
