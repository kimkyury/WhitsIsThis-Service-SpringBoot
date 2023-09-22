package com.mo.whatisthis.apis.request.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
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

    public void of(RequestEntity requestEntity) {

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
        this.employeeName = requestEntity.getEmployee()
                                         .getName();
        this.inspectionDate = requestEntity.getInspectionDate();
    }
}
