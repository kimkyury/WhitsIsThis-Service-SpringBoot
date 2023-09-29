package com.mo.whatisthis.toss.models;

import lombok.Data;

@Data
public class EasyPay {

    private String provider;
    private Integer amount;
    private Integer discountAmount;
}
