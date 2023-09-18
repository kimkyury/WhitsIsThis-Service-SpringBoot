package com.mo.whatisthis.apis.auth.responses;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReissueTokenResponse {

    private String accessToken;

}
