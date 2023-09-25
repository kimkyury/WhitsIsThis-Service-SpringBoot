package com.mo.whatisthis.apis.member.responses;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberCreateResponse {

    private String userName;
    private String tempPassword;
}