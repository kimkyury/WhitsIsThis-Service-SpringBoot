package com.mo.whatisthis.apis.auth.controllers;


import com.mo.whatisthis.apis.auth.requests.EmployeeLoginRequest;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse.EmployeeInfo;
import com.mo.whatisthis.apis.auth.services.AuthService;
import com.mo.whatisthis.jwt.dtos.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthPublicController {

    @Value("${jwt.refresh-token-ttl}")
    private final Long refreshTokenTTL;

    @Value("${jwt.access-token-ttl}")
    private final Long accessTokenTTL;

    private final AuthService authService;


    @PostMapping("/employees/login")
    public ResponseEntity<?> employeeLogin(
        @RequestBody EmployeeLoginRequest employeeLoginRequest
    ) {
        TokenDto tokenDto = authService.loginEmployee(employeeLoginRequest);
        int isInitLoginUser = authService.isInitLoginUser();

        HttpCookie httpCookie = ResponseCookie.from("refresh-token", tokenDto.getRefreshToken())
                                              .maxAge(refreshTokenTTL)
                                              .httpOnly(true)
                                              .secure(true)
                                              .build();
        EmployeeInfo employeeInfo = authService.findEmployeeInfoUseSCH();

        return null;
//        return ResponseEntity
//            .status(HttpStatus.OK)
//            .header(HttpHeaders.SET_COOKIE, httpCookie.toString())
//            .body(SuccessResponse.ofStatusAndMessageAndData(SuccessCode.REQUEST_SUCCESS,
//                "로그인에 성공하였습니다.", EmployeeLoginResponse.builder()
//                                                      .accessToken(
//                                                            "Bearer " + tokenDto.getAccessToken())
//                                                      .isInitLoginUser(isInitLoginUser)
//                                                      .employeeinfo(employeeInfo)
//                                                      .build()));
    }
}