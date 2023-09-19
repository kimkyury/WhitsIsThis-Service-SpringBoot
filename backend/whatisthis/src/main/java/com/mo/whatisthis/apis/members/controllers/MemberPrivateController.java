package com.mo.whatisthis.apis.members.controllers;

import com.mo.whatisthis.apis.members.requests.DeviceRegisterRequest;
import com.mo.whatisthis.apis.members.requests.EmployeeUpdateRequest;
import com.mo.whatisthis.apis.members.responses.MemberCreateResponse;
import com.mo.whatisthis.apis.members.services.MemberService;
import com.mo.whatisthis.security.utils.SecurityUtil;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import org.springframework.web.multipart.MultipartFile;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

@Tag(name = "2. Member")
@RestController
@RequestMapping("/api/v1/private/members")
@RequiredArgsConstructor
public class MemberPrivateController {

    public final MemberService memberService;

    @Operation(summary = "직원 계정 생성", tags = {"2. Member"})
    @PostMapping("/employees/register")
    public ResponseEntity<SuccessResponse<MemberCreateResponse>> createEmployee() {

        MemberCreateResponse memberCreateResponse = memberService.createEmployee();

        return createSuccessResponse(SuccessCode.CREATED, "임시 비밀번호를 통해 로그인 후, 개인 정보를 수정해주세요. ",
            memberCreateResponse);
    }

    @Operation(summary = "최초 로그인 직원의 정보 기입", tags = {"2. Member"})
    @PatchMapping(value = "/employees", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<SuccessResponse<String>> updateEmployeeInitInfo(
        @Valid @RequestPart EmployeeUpdateRequest employeeUpdateRequest,
        @RequestPart("profileImage") MultipartFile profileImage) {

        // TODO: Swagger에서 동작시, JSON파일을 application/octet-stream 으로 인식하는 문제 발생
        // TODO: profileImage에 대하여 S3 저장, Redis에 imageURL 저장 필요
        memberService.registerEmployee(SecurityUtil.getLoginId()
                                                   .get(), employeeUpdateRequest, profileImage);

        return createSuccessResponse(SuccessCode.NO_CONTENT, "직원의 최초 정보가 업데이트 되었습니다. ");
    }

    @Operation(summary = "직원의 터틀봇 등록", tags = {"2. Member"})
    @PostMapping("/devices/register")
    public ResponseEntity<?> registerDevice(
        @Valid @RequestBody DeviceRegisterRequest deviceRegisterRequest) {

        memberService.registerDevice(deviceRegisterRequest);

        return ResponseEntity.ok("Success Device Register");
    }
}
