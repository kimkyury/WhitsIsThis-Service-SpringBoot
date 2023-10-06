package com.mo.whatisthis.apis.auth.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmployeeLoginRequest {

    @NotNull
    @NotEmpty
    private String username;  // 사원 번호

    @NotNull
    @NotEmpty
    private String password;

}
