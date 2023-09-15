package com.mo.whatisthis.apis.members.responses;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
public class MemberCreateResponse {

    private String userName;
    private String tempPassword;
}