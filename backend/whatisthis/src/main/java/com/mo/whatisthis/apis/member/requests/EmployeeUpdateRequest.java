package com.mo.whatisthis.apis.member.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Data;

@Data
public class EmployeeUpdateRequest {

    @NotNull
    @NotEmpty
    private String name;

    @NotNull
    @Pattern(regexp = "^\\d{2,3}\\d{3,4}\\d{4}$")
    private String phone;

    @NotNull
    @NotEmpty
    private String password;

}
