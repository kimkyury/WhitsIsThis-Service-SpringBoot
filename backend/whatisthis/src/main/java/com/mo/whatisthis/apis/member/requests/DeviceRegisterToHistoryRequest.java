package com.mo.whatisthis.apis.member.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeviceRegisterToHistoryRequest {

    @NotNull
    @NotEmpty
    private String serialNumber;

    @NotNull
    @NotEmpty
    private String historyId;
}
