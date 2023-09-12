package com.mo.whatisthis.apis.members.requests;


import com.sun.istack.NotNull;
import lombok.Data;

@Data

public class DeviceRegisterRequest {

    @NotNull
    private String serialNumber;

}
