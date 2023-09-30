package com.mo.whatisthis.apis.payment.entities;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.toss.models.Payment;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payments")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false)
    private RequestEntity request;

    private String virtualBankCode;

    private String virtualAccount;

    private String paymentKey;

    private LocalDateTime requestedAt;

    @Setter
    private LocalDateTime approvedAt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Setter
    private Status status;

    @Setter
    private String refundAccount;

    @Setter
    private String refundBankCode;

    @Setter
    private String refundHolderName;

    @Setter
    private String orderId;

    public enum Status {
        READY, IN_PROGRESS, WAITING_FOR_DEPOSIT, DONE, CANCELED, PARTIAL_CANCELED, ABORTED, EXPIRED
    }

    public PaymentEntity(RequestEntity requestEntity, Payment payment) {
        this.request = requestEntity;
        this.virtualBankCode = payment.getVirtualAccount()
                                      .getBankCode();
        this.virtualAccount = payment.getVirtualAccount()
                                     .getAccountNumber();
        this.paymentKey = payment.getPaymentKey();
        this.requestedAt = payment.getRequestedAt()
                                  .toLocalDateTime();
        this.status = Status.valueOf(payment.getStatus());
        this.orderId = payment.getOrderId();
    }
}
