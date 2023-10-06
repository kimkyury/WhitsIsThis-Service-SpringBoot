package com.mo.whatisthis.toss.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RefundReceiveAccountRequest {

    private String bank;
    private String accountNumber;
    private String holderName;

}
