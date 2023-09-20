package com.mo.whatisthis.apis.request.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.State;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.config.web.servlet.SecurityMarker;

@Getter
public class RequestFindByCustomerResponse {

    private Long requestId; // 신청시 발생 정보

    @Setter
    private String employeeName; // 배정된 사람의 이름

    private String address; // 신청시 발생 정보

    private String addressDetail; // 신청시 발생 정보

    private String requesterName; // 신청시 발생 정보

    private String requesterPhone; // 신청시 발생 정보

    private String requestContent; // 신청시 발생 정보

    private LocalDate inspectionStart; // 신청시 발생 정보

    private LocalDate inspectionEnd; // 신청시 발생 정보

    @Setter
    private LocalDate inspectionDate; // 배정 날짜

    private State status; // 처리 상태

    private LocalDateTime requestedAt; // 신청시 발생 정보

    private String warrantUrl; // 신청시 발생 정보

    public void of(RequestEntity requestEntity) {
        this.requestId = requestEntity.getId();
        this.address = requestEntity.getAddress();
        this.addressDetail = requestEntity.getAddressDetail();
        this.requesterName = requestEntity.getRequesterName();
        this.requesterPhone = requestEntity.getRequesterPhone();
        this.inspectionStart = requestEntity.getInspectionStart();
        this.inspectionEnd = requestEntity.getInspectionEnd();
        this.status = requestEntity.getStatus();
        this.requestedAt = requestEntity.getRequestedAt();

        if (!(requestEntity.getRequestContent()!= null)) {
            this.requestContent = requestEntity.getRequestContent();
        }

        if (!(requestEntity.getWarrantUrl() != null)) {
            this.warrantUrl = requestEntity.getWarrantUrl();
        }

        if (!(requestEntity.getEmployee() == null) ) {
            this.employeeName = requestEntity.getEmployee().getName();
        }

        if (!(requestEntity.getInspectionDate() == null)) {
            this.inspectionDate = requestEntity.getInspectionDate();
        }
    }

}
