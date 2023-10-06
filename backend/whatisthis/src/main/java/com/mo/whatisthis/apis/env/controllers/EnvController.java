package com.mo.whatisthis.apis.env.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.context.WebServerApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/env")
@Tag(name = "0. Testing")
@RequiredArgsConstructor
public class EnvController {

    private final WebServerApplicationContext webServerApplicationContext;

    @Operation(summary = "현재 실행 중인 포트 확인", tags = {"0. Testing"})
    @GetMapping("/port")
    public Integer getPort() {
        return webServerApplicationContext.getWebServer()
                                          .getPort();
    }
}
