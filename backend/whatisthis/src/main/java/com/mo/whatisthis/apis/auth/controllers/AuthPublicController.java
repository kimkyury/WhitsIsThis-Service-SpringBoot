package com.mo.whatisthis.apis.auth.controllers;


import com.mo.whatisthis.apis.auth.requests.EmployeeLoginRequest;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse.EmployeeInfo;
import com.mo.whatisthis.apis.auth.responses.ReissueTokenResponse;
import com.mo.whatisthis.apis.auth.services.AuthService;
import com.mo.whatisthis.exception.RefreshTokenExpirationException;
import com.mo.whatisthis.jwt.dtos.TokenDto;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import com.sun.net.httpserver.Authenticator.Success;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "1. Auth")
public class AuthPublicController {

    @Value("${jwt.refresh-token-ttl}")
    private long refreshTokenTTL;

    private final AuthService authService;

    @Operation(summary = "직원 로그인", tags = {"1. Auth"})
    @PostMapping("/employees/login")
    public ResponseEntity<SuccessResponse<EmployeeLoginResponse>> employeeLogin(
        @RequestBody EmployeeLoginRequest employeeLoginRequest) {

        TokenDto tokenDto = authService.loginEmployee(employeeLoginRequest);
        int isInitLoginUser = authService.isInitLoginUser();
        HttpCookie httpCookie = ResponseCookie.from("refreshToken", tokenDto.getRefreshToken())
                                              .maxAge(refreshTokenTTL)
                                              .httpOnly(true)
                                              .secure(true)
                                              .build();

        EmployeeInfo employeeInfo = authService.findEmployeeInfoUseSCH();

        return ResponseEntity.status(HttpStatus.OK)
                             .header(HttpHeaders.SET_COOKIE, httpCookie.toString())
                             .body(SuccessResponse.ofStatusAndMessageAndData(SuccessCode.OK,
                                 "로그인에 성공하였습니다.", EmployeeLoginResponse.builder()
                                                                       .accessToken(
                                                                           "Bearer "
                                                                               + tokenDto.getAccessToken())
                                                                       .isInitLoginUser(
                                                                           isInitLoginUser)
                                                                       .employeeinfo(employeeInfo)
                                                                       .build()));
    }

    @Operation(summary = "AccessToken 재발급", tags = {"1. Auth"})
    @PostMapping("/reissue")
    public ResponseEntity<SuccessResponse<ReissueTokenResponse>> reissue(
        @CookieValue(name = "refresh-token") String refreshTokenCookie) {

        Optional<String> accessToken = authService.reissueAccessToken(refreshTokenCookie);

        if (accessToken.isEmpty()) {
            // refreshToken도 만료되었다면 재로그인 요청
            throw new RefreshTokenExpirationException(ErrorCode.TOKEN_EXPIRED);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                             .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken.get())
                             .body(SuccessResponse.ofStatusAndMessageAndData(SuccessCode.CREATED,
                                 "AccessToken 재발급이 성공하였습니다. ",
                                 ReissueTokenResponse.builder()
                                                     .accessToken("Bearer " + accessToken.get())
                                                     .build()));
    }
}
