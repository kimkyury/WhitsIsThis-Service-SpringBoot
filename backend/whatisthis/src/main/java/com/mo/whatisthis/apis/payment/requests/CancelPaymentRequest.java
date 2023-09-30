package com.mo.whatisthis.apis.payment.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CancelPaymentRequest {

    private String refundBankCode;
    private String refundAccount;
    private String refundHolderName;
}
