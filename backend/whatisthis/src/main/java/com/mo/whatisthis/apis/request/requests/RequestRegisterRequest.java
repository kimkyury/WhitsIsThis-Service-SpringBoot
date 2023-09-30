package com.mo.whatisthis.apis.request.requests;

import com.sun.istack.NotNull;
import javax.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestRegisterRequest {

    @NotNull
    @NotEmpty
    private String address;

    @NotNull
    @NotEmpty
    private String addressDetail;

    @NotNull
    @NotEmpty
    private String requesterName;

    @NotNull
    @NotEmpty
    private String requesterPhone;

    private String requestContent;

    @NotNull
    private String inspectionStart;

    @NotNull
    private String inspectionEnd;

    @NotNull
    private Float buildingArea;

    @NotNull
    private String bankCode;

}
