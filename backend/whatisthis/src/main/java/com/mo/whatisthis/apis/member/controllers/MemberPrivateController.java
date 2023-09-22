package com.mo.whatisthis.apis.member.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.auth.services.AuthService;
import com.mo.whatisthis.apis.member.requests.DeviceRegisterRequest;
import com.mo.whatisthis.apis.member.requests.EmployeeUpdateRequest;
import com.mo.whatisthis.apis.member.responses.MemberCreateResponse;
import com.mo.whatisthis.apis.member.services.MemberService;
import com.mo.whatisthis.security.utils.SecurityUtil;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/private/members")
@Tag(name = "2. Member")
@RequiredArgsConstructor
public class MemberPrivateController {

    public final MemberService memberService;
    public final AuthService authService;

    @Operation(summary = "직원 계정 생성", tags = {
        "2. Member"}, description = "Authorization에 token을 첨부해주세요.")
    @PostMapping("/employees/register")
    public ResponseEntity<SuccessResponse<MemberCreateResponse>> createEmployee() {

        MemberCreateResponse memberCreateResponse = memberService.createEmployee();

        return createSuccessResponse(SuccessCode.CREATED, "임시 비밀번호를 통해 로그인 후, 개인 정보를 수정해주세요. ",
            memberCreateResponse);
    }

    @Operation(summary = "직원의 최초 로그인시 정보 기입", tags = {
        "2. Member"}, description = "Authorization에 token을 첨부해주세요.")
    @PatchMapping(value = "/employees", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<SuccessResponse<String>> updateEmployeeInitInfo(
        @Valid @RequestPart EmployeeUpdateRequest employeeUpdateRequest,
        @RequestPart("profileImage") MultipartFile profileImage,
        @RequestHeader("Authorization") String requestAccessToken) throws IOException {

        memberService.registerEmployee(SecurityUtil.getLoginId()
                                                   .get(), employeeUpdateRequest, profileImage);
        authService.logout(requestAccessToken);

        // TODO: return Cookie 수정
        return createSuccessResponse(SuccessCode.NO_CONTENT, "직원의 최초 정보가 업데이트 되었습니다. ");
    }

    @Operation(summary = "직원의 터틀봇 등록", tags = {
        "2. Member"}, description = "Authorization에 token을 첨부해주세요.")
    @PostMapping("/devices/register")
    public ResponseEntity<?> registerDevice(
        @Valid @RequestBody DeviceRegisterRequest deviceRegisterRequest) {

        memberService.registerDevice(deviceRegisterRequest);

        return ResponseEntity.ok("Success Device Register");
    }
}
