package com.mo.whatisthis.apis.request.responses;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import com.mo.whatisthis.apis.request.responses.RequestDetailRequests.History;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class RequestFindByCustomerResponse {

    // ----------- 신청시 발생 정보
    private Long requestId;
    private String address;
    private String addressDetail;
    private String requesterName;
    private String requesterPhone;
    private String requestContent;
    private LocalDate inspectionStart;
    private LocalDate inspectionEnd;
    private LocalDateTime requestedAt;
    private String warrantUrl;
    private History history;
    private Long paymentId;

    // ------- 신청 이후 변경되는 정보들
    private Status status; // 처리 상태
    private String employeeName; // 배정된 사람의 이름
    private LocalDate inspectionDate; // 배정 날짜

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
        if (requestEntity.getRequestContent() != null) {
            this.requestContent = requestEntity.getRequestContent();
        }

        if (requestEntity.getWarrantUrl() != null) {
            this.warrantUrl = requestEntity.getWarrantUrl();
        }

        if (requestEntity.getEmployee() != null) {
            this.employeeName = requestEntity.getEmployee()
                                             .getName();
        }

        if (requestEntity.getInspectionDate() != null) {
            this.inspectionDate = requestEntity.getInspectionDate();
        }
    }

}
