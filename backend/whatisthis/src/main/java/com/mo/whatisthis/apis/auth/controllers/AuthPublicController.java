package com.mo.whatisthis.apis.auth.controllers;


import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.auth.requests.DeviceLoginRequest;
import com.mo.whatisthis.apis.auth.requests.EmployeeLoginRequest;
import com.mo.whatisthis.apis.auth.requests.SendAuthMessageRequest;
import com.mo.whatisthis.apis.auth.requests.VerifyAuthCodeRequest;
import com.mo.whatisthis.apis.auth.responses.DeviceLoginResponse;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse.EmployeeInfo;
import com.mo.whatisthis.apis.auth.responses.ReissueTokenResponse;
import com.mo.whatisthis.apis.auth.services.AuthService;
import com.mo.whatisthis.exception.RefreshTokenExpirationException;
import com.mo.whatisthis.jwt.dtos.TokenDto;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
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
@Tag(name = "1. Auth")
@RequiredArgsConstructor
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
        HttpCookie httpCookie = ResponseCookie.from("refresh-token", tokenDto.getRefreshToken())
                                              .maxAge(refreshTokenTTL)
                                              .httpOnly(true)
                                              .path("/")
                                              .secure(true)
                                              .build();

        EmployeeInfo employeeInfo = authService.findEmployeeInfoUseSCH();

        return ResponseEntity.status(HttpStatus.OK)
                             .header(HttpHeaders.SET_COOKIE, httpCookie.toString())
                             .body(SuccessResponse.ofStatusAndMessageAndData(
                                 SuccessCode.OK, "Success Employee Login.",
                                 EmployeeLoginResponse.builder()
                                                      .accessToken(
                                                          "Bearer " + tokenDto.getAccessToken())
                                                      .isInitLoginUser(isInitLoginUser)
                                                      .employeeinfo(employeeInfo)
                                                      .build()));
    }

    @Operation(summary = "Device 로그인 (터틀봇 등록 확인, EMB 전용)",
        tags = {"1. Auth"}, description = "Device에게 accessToken이 발급됩니다.")
    @PostMapping("/devices/login")
    public ResponseEntity<SuccessResponse<DeviceLoginResponse>> deviceLogin(
        @RequestBody DeviceLoginRequest deviceLoginRequest) {

        String accessToken = authService.loginDevice(deviceLoginRequest);

        return ResponseEntity.status(HttpStatus.OK)
                             .body(SuccessResponse.ofStatusAndMessageAndData(
                                 SuccessCode.OK, "Success Device Login. ",
                                 DeviceLoginResponse.builder()
                                                    .accessToken("Bearer " + accessToken)
                                                    .build()));
    }

    @Operation(summary = "AccessToken 재발급",
        tags = {"1. Auth"}, description = "Cookie에 RefreshToken을 첨부해주세요.")
    @PostMapping("/reissue")
    public ResponseEntity<SuccessResponse<ReissueTokenResponse>> reissue(
        @CookieValue(name = "refresh-token") String requestRefreshToken) {

        Optional<String> accessToken = authService.reissueAccessToken(requestRefreshToken);

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

    @Operation(summary = "휴대폰 인증을 위한 메시지 전송", tags = {
        "1. Auth"}, description = "인증번호를 받기 위한 핸드폰 번호를 기입해주세요 (유효기간이 5분이므로, 5분 이내에 인증을 하셔야 합니다.) ")
    @PostMapping("/phone/sms")
    public ResponseEntity<SuccessResponse<String>> sendMessageToAuthCode(
        HttpServletRequest request,
        @Valid @RequestBody SendAuthMessageRequest sendAuthMessageRequest
    ) {

        authService.sendMessageProcedure(sendAuthMessageRequest);
        authService.setSessionPhone(request, sendAuthMessageRequest);

        return createSuccessResponse(SuccessCode.OK, "Sent message to verify Phone");
    }

    @Operation(summary = "휴대폰 인증 번호 검사", tags = {
        "1. Auth"}, description = "휴대폰 인증 메시지 전송 API이용 후, 메시지를 받은 phone 번호와 안내받은 Message 내의 인증번호를 입력하세요. \n인증완료시 60분간의 접속 제한시간이 부여됩니다.  ")
    @PostMapping("/phone/verification")
    public ResponseEntity<SuccessResponse<String>> verifyAuthCode(HttpServletRequest request,
        @Valid @RequestBody VerifyAuthCodeRequest verifyAuthCodeRequest
    ) {

        authService.confirmAuthCode(request, verifyAuthCodeRequest);
        authService.setSessionExpiryDuration(request, verifyAuthCodeRequest);

        return createSuccessResponse(SuccessCode.OK,
            "AuthCode is Accept, You have 60 minutes of access");
    }
}
