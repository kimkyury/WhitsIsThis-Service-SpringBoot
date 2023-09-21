package com.mo.whatisthis.apis.auth.responses;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
public class DeviceLoginResponse {

    private String accessToken;

}
