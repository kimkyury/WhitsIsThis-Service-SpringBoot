package com.mo.whatisthis.toss.models;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class Cancel {

    private Integer cancelAmount;
    private String cancelReason;
    private Integer taxFreeAmount;
    private Integer taxExemptionAmount;
    private Integer refundableAmount;
    private Integer easyPayDiscountAmount;
    private LocalDateTime canceledAt;
    private String transactionKey;
    private String receiptKey;

}
