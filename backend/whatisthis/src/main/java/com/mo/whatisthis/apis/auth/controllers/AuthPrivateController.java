package com.mo.whatisthis.apis.auth.controllers;

import com.mo.whatisthis.apis.auth.services.AuthService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/private/auth")
@Tag(name = "1. Auth")
@RequiredArgsConstructor
public class AuthPrivateController {

    private final AuthService authService;

    @Operation(summary = "로그아웃", tags = {"1. Auth"}, description = "Authorization에 token을 첨부해주세요.")
    @PostMapping("/logout")
    public ResponseEntity<SuccessResponse> logout(
        @RequestHeader("Authorization") String requestAccessToken) {

        authService.logout(requestAccessToken);

        ResponseCookie responseCookie = ResponseCookie.from("refresh-token", "")
                                                      .maxAge(0)
                                                      .path("/")
                                                      .build();

        return ResponseEntity
            .status(HttpStatus.OK)
            .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
            .body(SuccessResponse.ofStatusAndMessage(SuccessCode.OK, "Success Logout"));
    }
}
