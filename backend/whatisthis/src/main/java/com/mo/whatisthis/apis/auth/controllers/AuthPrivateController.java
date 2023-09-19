package com.mo.whatisthis.apis.auth.controllers;


import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse;
import com.mo.whatisthis.apis.auth.services.AuthService;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import com.sun.net.httpserver.Authenticator.Success;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/private/auth")
@RequiredArgsConstructor
@Tag(name = "1. Auth")
public class AuthPrivateController {

    private final AuthService authService;

    @Operation(summary = "로그아웃", tags = {"1. Auth"})
    @PostMapping("/logout")
    public ResponseEntity<SuccessResponse> logout(
        @RequestHeader("Authorization") String requestAccessToken) {
        // TODO: authService logout 메소드 구현
        return null;
    }
}
