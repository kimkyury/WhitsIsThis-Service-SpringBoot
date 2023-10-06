package com.mo.whatisthis.apis.request.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AssignedRequestResponse {

    private String address;
    private List<Request> requests;

    public AssignedRequestResponse(RequestEntity requestEntity, Long historyId) {
        this.address = requestEntity.getAddress();
        requests = new ArrayList<>();

        add(requestEntity, historyId);
    }

    public void add(RequestEntity requestEntity, Long historyId) {
        requests.add(new Request(
            requestEntity.getId(),
            historyId,
            requestEntity.getAddressDetail(),
            requestEntity.getStatus(),
            requestEntity.getRequesterName(),
            requestEntity.getRequesterPhone(),
            requestEntity.getRequestContent(),
            requestEntity.getRequestedAt()
        ));
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @JsonInclude(JsonInclude.Include.NON_NULL)
    class Request {

        private Long id;
        private Long historyId;
        private String addressDetail;
        private RequestEntity.Status status;
        private String requestName;
        private String requestPhone;
        private String requestContent;
        private LocalDateTime requestedAt;

        public Request(Long id, Long historyId, String addressDetail, Status status, String requestName,
            String requestPhone, String requestContent, LocalDateTime requestedAt) {
            this.id = id;
            this.historyId = historyId;
            this.addressDetail = addressDetail;
            this.status = status;
            this.requestName = requestName;
            this.requestPhone = requestPhone;
            this.requestContent = requestContent;
            this.requestedAt = requestedAt;
        }

        public Request(Long id, Long historyId, String addressDetail, Status status, String requestName,
            String requestPhone, String requestContent) {
            this.id = id;
            this.historyId = historyId;
            this.addressDetail = addressDetail;
            this.status = status;
            this.requestName = requestName;
            this.requestPhone = requestPhone;
            this.requestContent = requestContent;
        }
    }
}
