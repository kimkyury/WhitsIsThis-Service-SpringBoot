package com.mo.whatisthis.apis.members.requests;


import com.sun.istack.NotNull;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class EmployeeUpdateRequest {

    @NotNull
    @NotEmpty
    String name;

    @NotNull
    @Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$", message = "xxx-xxxx-xxxx")
    String phone;

}
