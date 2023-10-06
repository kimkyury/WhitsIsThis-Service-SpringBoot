package com.mo.whatisthis.apis.request.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WaitingRequestResponse {

    private Long id;
    private String address;
    private String addressDetail;
    private String requesterName;
    private String requesterPhone;
    private String requestContent;
    private LocalDate inspectionStart;
    private LocalDate inspectionEnd;

    public WaitingRequestResponse(RequestEntity requestEntity) {
        this.id = requestEntity.getId();
        this.address = requestEntity.getAddress();
        this.addressDetail = requestEntity.getAddressDetail();
        this.requesterName = requestEntity.getRequesterName();
        this.requesterPhone = requestEntity.getRequesterPhone();
        this.requestContent = requestEntity.getRequestContent();
        this.inspectionStart = requestEntity.getInspectionStart();
        this.inspectionEnd = requestEntity.getInspectionEnd();
    }
}
