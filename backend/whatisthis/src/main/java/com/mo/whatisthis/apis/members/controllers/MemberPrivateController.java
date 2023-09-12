package com.mo.whatisthis.apis.members.controllers;

import com.mo.whatisthis.apis.members.requests.DeviceRegisterRequest;
import com.mo.whatisthis.apis.members.services.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/private/members")
public class MemberPrivateController {

    MemberService memberService;

    @PostMapping("/employees/register")
    public ResponseEntity<?> createEmployee() {

        memberService.createEmployee();

        return ResponseEntity.ok("EMPLOYEE 생성 성공");
    }

    @PostMapping("/devices/register")
    public ResponseEntity<?> registerDevice(
        @Valid @RequestBody DeviceRegisterRequest deviceRegisterRequest) {

        memberService.registerDevice(deviceRegisterRequest);

        return ResponseEntity.ok("Device 등록 성공");
    }
}
