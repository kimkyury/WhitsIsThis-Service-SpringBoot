package com.mo.whatisthis.toss.models;

import java.time.OffsetDateTime;
import lombok.Data;

@Data
public class Cancel {

    private Integer cancelAmount;
    private String cancelReason;
    private Integer taxFreeAmount;
    private Integer taxExemptionAmount;
    private Integer refundableAmount;
    private Integer easyPayDiscountAmount;
    private OffsetDateTime canceledAt;
    private String transactionKey;
    private String receiptKey;

}
