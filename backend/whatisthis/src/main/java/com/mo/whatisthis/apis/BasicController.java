package com.mo.whatisthis.apis;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "0. Testing")
@RestController
@RequestMapping("/api/v1")
public class BasicController {

    @Operation(summary = "Public 통신 테스트", tags = {"0. Testing"})
    @GetMapping("/ping")
    public @ResponseBody
    String ping() {
        return "pong";
    }

    @Operation(summary = "private 통신 테스트", tags = {"0. Testing"})
    @GetMapping("/private/ping")
    public @ResponseBody
    String register() {
        return "You have Auth! Pong";
    }

}
