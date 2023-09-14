package com.mo.whatisthis.apis.auth.responses;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeviceLoginResponse {

    private String accessToken;

}
