package com.mo.whatisthis.apis.auth.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SendAuthMessageRequest {

    @NotNull
    @NotEmpty
    private String phone;

}
