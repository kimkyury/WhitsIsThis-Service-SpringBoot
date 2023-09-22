package com.mo.whatisthis.apis.request.responses;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DoneRequestResponse {

    private Long id;
    private String address;
    private String addressDetail;
    private String requesterName;
    private String requesterPhone;
    private LocalDateTime requestedAt;

    public DoneRequestResponse(RequestEntity requestEntity) {
        this.id = requestEntity.getId();
        this.address = requestEntity.getAddress();
        this.addressDetail = requestEntity.getAddressDetail();
        this.requesterName = requestEntity.getRequesterName();
        this.requesterPhone = requestEntity.getRequesterPhone();
        this.requestedAt = requestEntity.getRequestedAt();
    }
}
