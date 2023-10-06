package com.mo.whatisthis.toss.models;

import java.time.OffsetDateTime;
import java.util.List;
import lombok.Data;

@Data
public class Payment {

    private String version;
    private String paymentKey;
    private String type;
    private String orderId;
    private String orderName;
    private String mId;
    private String currency;
    private String method;
    private String totalAmount;
    private Integer balanceAmount;
    private String status;
    private OffsetDateTime requestedAt;
    private OffsetDateTime approvedAt;
    private Boolean useEscrow;
    private String lastTransactionKey;
    private Integer suppliedAmount;
    private Integer vat;
    private Boolean cultureExpense;
    private Integer taxFreeAmount;
    private Integer taxExemptionAmount;
    private List<Cancel> cancels;
    private Boolean isPartialCancelable;
    private Card card;
    private VirtualAccount virtualAccount;
    private String secret;
    private MobilePhone mobilePhone;
    private GiftCertificate giftCertificate;
    private Transfer transfer;
    private Receipt receipt;
    private Checkout checkout;
    private EasyPay easyPay;
    private String country;
    private Failure failure;
    private CashReceipt cashReceipt;
    private List<CashReceipts> cashReceipts;
    private Discount discount;

}
