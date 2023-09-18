package com.mo.whatisthis.apis.members.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeviceRegisterRequest {

    @NotNull
    @NotEmpty
    private String serialNumber;

}
