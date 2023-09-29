package com.mo.whatisthis.toss.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RefundReceiveAccount {

    private String bankCode;
    private String accountNumber;
    private String holderName;

}
