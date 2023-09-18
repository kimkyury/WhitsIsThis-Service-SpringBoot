package com.mo.whatisthis.apis.auth.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
@JsonInclude(Include.NON_NULL)
public class EmployeeLoginResponse {

    private String accessToken;

    private int isInitLoginUser;

    private EmployeeInfo employeeinfo;

    @Data
    @Builder
    public static class EmployeeInfo{
        private Integer id;
        private String username;
        private String name;
        private String phone;
        private String role;
        private String imageUrl;
    }
}
