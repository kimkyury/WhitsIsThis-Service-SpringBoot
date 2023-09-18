package com.mo.whatisthis.apis.members.requests;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeUpdateRequest {

    @NotNull
    @NotEmpty
    private String name;

    @NotNull
    @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "xxx-xxxx-xxxx")
    private String phone;

    @NotNull
    @NotEmpty
    private String password;

}
