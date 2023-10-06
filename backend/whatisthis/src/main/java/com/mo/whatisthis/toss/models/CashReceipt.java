package com.mo.whatisthis.toss.models;

import lombok.Data;

@Data
public class CashReceipt {

    private String type;
    private String receiptKey;
    private String issueNumber;
    private String receiptUrl;
    private Integer amount;
    private Integer taxFreeAmount;
}
