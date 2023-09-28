package com.mo.whatisthis.toss.requests;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CreateVirtualAccountRequest {

    private Integer amount;
    private String orderId;
    private String orderName;
    private String customerName;
    private String bank;
    private Integer validHours;
    private String customerMobilePhone;

    public static CreateVirtualAccountRequest of(Integer amount, String customerName, String bank,
        String customerMobilePhone) {
        return CreateVirtualAccountRequest.builder()
                                          .amount(amount)
                                          .orderId(UUID.randomUUID()
                                                       .toString())
                                          .orderName("이게MO징 - 집 사전 점검")
                                          .customerName(customerName)
                                          .bank(bank)
                                          .validHours(24)
                                          .customerMobilePhone(customerMobilePhone)
                                          .build();
    }
}
