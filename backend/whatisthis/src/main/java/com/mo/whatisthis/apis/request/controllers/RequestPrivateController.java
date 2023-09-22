package com.mo.whatisthis.apis.request.controllers;


import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.request.responses.AssignedRequestResponse;
import com.mo.whatisthis.apis.request.services.RequestService;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.security.utils.SecurityUtil;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/private/requests")
@Tag(name = "3. InspectionRequest")
@RequiredArgsConstructor
public class RequestPrivateController {

    private final RequestService requestService;

    @PatchMapping("/{id}/manager")
    @Operation(summary = "집 점검 요청 담당자 설정", tags = {
        "3. InspectionRequest"}, description = "id는 요청한 PK입니다.")
    public ResponseEntity<SuccessResponse<Object>> assignRequest(@PathVariable Long id) {
        requestService.assignRequest(id, SecurityUtil.getLoginId()
                                                     .orElseThrow(() -> new CustomException(
                                                         ErrorCode.INTERNAL_SERVER_ERROR)));

        return createSuccessResponse(SuccessCode.NO_CONTENT, "집 점검 요청 담당자를 설정했습니다.");
    }

    @GetMapping("/assigned")
    @Operation(summary = "로그인한 직원의 할당된 집 점검 요청 목록 전체 조회", tags = {
        "3. InspectionRequest"})
    public ResponseEntity<SuccessResponse<List<AssignedRequestResponse>>> getAssignedRequests() {
        return createSuccessResponse(SuccessCode.OK, "로그인한 직원의 할당된 집 점검 요청 목록 전체를 조회했습니다.",
            requestService.getAssignedRequest(SecurityUtil.getLoginId()
                                                          .orElseThrow(() -> new CustomException(
                                                              ErrorCode.INTERNAL_SERVER_ERROR))));
    }
}
