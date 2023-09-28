package com.mo.whatisthis.apis.payment.entities;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
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
@Table(name = "requests")
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

    private LocalDateTime approvedAt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Setter
    private Status status;

    private String refundAccount;

    private String refundBankCode;

    private String refundHolderName;

    public enum Status {
        READY, IN_PROGRESS, WAITING_FOR_DEPOSIT, DONE, CANCELED, PARTIAL_CANCELED, ABORTED, EXPIRED
    }

}
