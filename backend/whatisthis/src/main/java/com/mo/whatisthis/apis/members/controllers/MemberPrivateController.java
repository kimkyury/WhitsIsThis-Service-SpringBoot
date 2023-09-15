package com.mo.whatisthis.apis.members.controllers;

import com.mo.whatisthis.apis.members.requests.DeviceRegisterRequest;
import com.mo.whatisthis.apis.members.requests.EmployeeRegisterRequest;
import com.mo.whatisthis.apis.members.responses.MemberCreateResponse;
import com.mo.whatisthis.apis.members.services.MemberService;
import com.mo.whatisthis.security.utils.SecurityUtil;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import java.lang.reflect.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberPrivateController {

    public final MemberService memberService;

    @PostMapping("/employees/register")
    public ResponseEntity<SuccessResponse<MemberCreateResponse>> createEmployee() {

        MemberCreateResponse memberCreateResponse = memberService.createEmployee();

        return  createSuccessResponse(SuccessCode.CREATED, "임시 비밀번호를 통해 로그인 후, 개인 정보를 수정해주세요. ",
            memberCreateResponse);
    }

    @PatchMapping(value = "/employees", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<?> registerEmployee(
        @Valid @RequestBody EmployeeRegisterRequest employeeRegisterRequest,
        @RequestPart("profileImage") MultipartFile profileImage) {

        // TODO: getLoginId() Exception Handling
        memberService.registerEmployee(SecurityUtil.getLoginId()
                                                   .get(), employeeRegisterRequest, profileImage);

        return ResponseEntity.ok("EMPLOYEE 최초 등록 성공");
    }

    @PostMapping("/devices/register")
    public ResponseEntity<?> registerDevice(
        @Valid @RequestBody DeviceRegisterRequest deviceRegisterRequest) {

        memberService.registerDevice(deviceRegisterRequest);

        return ResponseEntity.ok("Device 등록 성공");
    }
}
