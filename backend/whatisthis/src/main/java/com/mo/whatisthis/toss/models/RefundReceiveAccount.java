package com.mo.whatisthis.toss.models;

import lombok.Data;

@Data
public class RefundReceiveAccount {

    private String bankCode;
    private String accountNumber;
    private String holderName;

}
