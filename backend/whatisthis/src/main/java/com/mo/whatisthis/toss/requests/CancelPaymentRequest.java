package com.mo.whatisthis.toss.requests;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class CancelPaymentRequest {

    private String paymentKey;
    private String cancelReason;
    private RefundReceiveAccountRequest refundReceiveAccount;

    public static CancelPaymentRequest of(String paymentKey, String refundBankCode,
        String refundAccount, String refundHolderName) {
        return CancelPaymentRequest.builder()
                                   .paymentKey(paymentKey)
                                   .cancelReason("단순 변심")
                                   .refundReceiveAccount(RefundReceiveAccountRequest.builder()
                                                                                    .bank(
                                                                                        refundBankCode)
                                                                                    .accountNumber(
                                                                                        refundAccount)
                                                                                    .holderName(
                                                                                        refundHolderName)
                                                                                    .build())
                                   .build();
    }

    public static CancelPaymentRequest of(String paymentKey) {
        return CancelPaymentRequest.builder()
                                   .paymentKey(paymentKey)
                                   .cancelReason("단순 변심")
                                   .build();
    }
}
