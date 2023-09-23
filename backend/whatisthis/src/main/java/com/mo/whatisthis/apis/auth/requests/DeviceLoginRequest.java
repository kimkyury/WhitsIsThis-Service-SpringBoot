package com.mo.whatisthis.apis.auth.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DeviceLoginRequest {

    @NotNull
    @NotEmpty
    private String serialNumber; // 기기 일련번호

}