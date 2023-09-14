package com.mo.whatisthis.apis.auth.responses;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class EmployeeLoginResponse {

    private String token;

    private int isInitLoginUser;

    @Data
    @Builder
    public static class employeeInfo{
        private Integer id;
        private String username;
        private String name;
        private String phone;
        private String role;
        private String image_url;
    }
}
