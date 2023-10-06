package com.mo.whatisthis.toss.models;

import java.time.OffsetDateTime;
import lombok.Data;

@Data
public class CashReceipts {

    private String receiptKey;
    private String orderId;
    private String orderName;
    private String type;
    private String issueNumber;
    private String receiptUrl;
    private String businessNumber;
    private String transactionType;
    private Integer amount;
    private Integer taxFreeAmount;
    private String issueStatus;
    private Failure failure;
    private String customerIdentityNumber;
    private OffsetDateTime requestedAt;
}
