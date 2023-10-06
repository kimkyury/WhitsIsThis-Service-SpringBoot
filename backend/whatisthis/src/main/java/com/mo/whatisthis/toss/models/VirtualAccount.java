package com.mo.whatisthis.toss.models;

import lombok.Data;

@Data
public class VirtualAccount {

    private String accountType;
    private String accountNumber;
    private String bankCode;
    private String customerName;
    private String dueDate;
    private String refundStatus;
    private Boolean expired;
    private String settlementStatus;
    private RefundReceiveAccount refundReceiveAccount;
}
