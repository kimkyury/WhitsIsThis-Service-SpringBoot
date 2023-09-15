package com.mo.whatisthis.apis.auth.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PhoneAuthRequest {

    @NotNull
    @NotEmpty
    private String phone;

}
