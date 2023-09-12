package com.mo.whatisthis.apis.members.requests;


import com.sun.istack.NotNull;
import javax.validation.constraints.NotEmpty.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class DeviceRegisterRequest {

    @NotNull
    private String serialNumber;

}
