package com.mo.whatisthis.apis;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class BasicController {

    @GetMapping("/ping")
    public @ResponseBody
    String ping() {
        return "pong";
    }

    @GetMapping("/private/register")
    public @ResponseBody
    String register() {
        return "You have Auth! Complete Register";
    }

}
