package com.mo.whatisthis.apis.request.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.mo.whatisthis.apis.history.entities.HistoryEntity;
import com.mo.whatisthis.apis.payment.entities.PaymentEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(Include.NON_NULL)
public class RequestDetailRequests {

    private Long id;
    private String address;
    private String addressDetail;
    private String requesterName;
    private String requesterPhone;
    private String requestContent;
    private LocalDate inspectionStart;
    private LocalDate inspectionEnd;
    private LocalDateTime requestedAt;
    private String warrantUrl;
    private Status status;
    private String employeeName;
    private LocalDate inspectionDate;
    private History history;
    private Payment payment;

    public RequestDetailRequests(RequestEntity requestEntity) {

        this.id = requestEntity.getId();
        this.address = requestEntity.getAddress();
        this.addressDetail = requestEntity.getAddressDetail();
        this.requesterName = requestEntity.getRequesterName();
        this.requesterPhone = requestEntity.getRequesterPhone();
        this.inspectionStart = requestEntity.getInspectionStart();
        this.inspectionEnd = requestEntity.getInspectionEnd();
        this.status = requestEntity.getStatus();
        this.requestedAt = requestEntity.getRequestedAt();
        this.requestContent = requestEntity.getRequestContent();
        this.warrantUrl = requestEntity.getWarrantUrl();

        if (requestEntity.getEmployee() != null) {
            this.employeeName = requestEntity.getEmployee()
                                             .getName();
        }

        this.inspectionDate = requestEntity.getInspectionDate();
    }

    public void setHistory(HistoryEntity historyEntity) {
        this.history = new History(historyEntity);
    }

    public void setPayment(PaymentEntity paymentEntity) {
        this.payment = new Payment(paymentEntity);
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    class History {

        private Long id;
        private LocalDateTime inspectedAt;

        public History(HistoryEntity historyEntity) {
            this.id = historyEntity.getId();
            this.inspectedAt = historyEntity.getInspectedAt();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    class Payment {

        private Long id;
        private String virtualBankCode;
        private String virtualAccount;
        private LocalDateTime requestedAt;
        private LocalDateTime approvedAt;
        private PaymentEntity.Status status;
        private String RefundAccount;
        private String refundBankCode;
        private String refundHolderName;

        public Payment(PaymentEntity paymentEntity) {
            this.id = paymentEntity.getId();
            this.virtualBankCode = paymentEntity.getVirtualBankCode();
            this.virtualAccount = paymentEntity.getVirtualAccount();
            this.requestedAt = paymentEntity.getRequestedAt();
            this.approvedAt = paymentEntity.getApprovedAt();
            this.status = paymentEntity.getStatus();
            this.RefundAccount = paymentEntity.getRefundAccount();
            this.refundBankCode = paymentEntity.getRefundBankCode();
            this.refundHolderName = paymentEntity.getRefundHolderName();
        }
    }
}
