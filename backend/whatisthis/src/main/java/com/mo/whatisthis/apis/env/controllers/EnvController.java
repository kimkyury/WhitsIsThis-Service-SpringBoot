package com.mo.whatisthis.apis.env.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.context.WebServerApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/env")
@RequiredArgsConstructor
public class EnvController {

    private final WebServerApplicationContext webServerApplicationContext;

    @GetMapping("/port")
    public Integer getPort() {
        return webServerApplicationContext.getWebServer()
                                          .getPort();
    }
}
