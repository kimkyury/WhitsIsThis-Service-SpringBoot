package com.mo.whatisthis.apis.request.controllers;


import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.request.requests.SetRequestManagerRequest;
import com.mo.whatisthis.apis.request.requests.StatusChangeRequest;
import com.mo.whatisthis.apis.request.responses.AssignedRequestResponse;
import com.mo.whatisthis.apis.request.responses.DoneRequestResponse;
import com.mo.whatisthis.apis.request.responses.RequestDetailRequests;
import com.mo.whatisthis.apis.request.responses.WaitingRequestResponse;
import com.mo.whatisthis.apis.request.services.RequestService;
import com.mo.whatisthis.apis.todolist.services.TodolistService;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.security.utils.SecurityUtil;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/private/requests")
@Tag(name = "3. InspectionRequest")
@RequiredArgsConstructor
public class RequestPrivateController {

    private final RequestService requestService;

    private final TodolistService todolistService;

    @PatchMapping("/{id}/manager")
    @Operation(summary = "집 점검 요청 담당자 설정", tags = {
        "3. InspectionRequest"}, description = "id는 요청한 PK입니다.")
    public ResponseEntity<SuccessResponse<Object>> assignRequest(@PathVariable Long id,
        @Valid @RequestBody
        SetRequestManagerRequest setRequestManagerRequest) {
        requestService.assignRequest(id, SecurityUtil.getLoginId()
                                                     .orElseThrow(() -> new CustomException(
                                                         ErrorCode.INTERNAL_SERVER_ERROR)),
            setRequestManagerRequest.getInspectionDate());

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

    @GetMapping("/waiting")
    @Operation(summary = "점검 날짜를 받기 전인 집 점검 요청 목록 전체 조회", tags = {
        "3. InspectionRequest"}, description = "page는 1부터 시작합니다.")
    public ResponseEntity<SuccessResponse<List<WaitingRequestResponse>>> getWaitingRequests(
        @RequestParam Integer page) {
        return createSuccessResponse(SuccessCode.OK, "점검 날짜를 받기 전인 집 점검 요청 목록 전체 조회",
            requestService.getWaitingRequest(page));
    }

    @GetMapping("/done")
    @Operation(summary = "점검이 끝난 집 점검 요청 목록 전체 조회", tags = {
        "3. InspectionRequest"}, description = "page는 1부터 시작합니다.")
    public ResponseEntity<SuccessResponse<List<DoneRequestResponse>>> getDoneRequests(
        @RequestParam Integer page) {
        return createSuccessResponse(SuccessCode.OK, "점검이 끝난 집 점검 요청 목록 전체 조회",
            requestService.getDoneRequests(page));
    }

    @GetMapping("/{id}")
    @Operation(summary = "집 점검 요청 내역 상세 조회", tags = {
        "3. InspectionRequest"})
    public ResponseEntity<SuccessResponse<RequestDetailRequests>> getRequestDetail(
        @PathVariable Long id) {

        return createSuccessResponse(SuccessCode.OK, "집 점검 요청 내역 상세 조회",
            requestService.getRequestDetail(id));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "(개발용) 집 점검 요청 상태 변경", tags = {
        "3. InspectionRequest"}, description = "WAITING_FOR_PAY, CANCELED, WAITING_INSPECTION_DATE, WAITING_FOR_INSPECTION, IN_PROGRESS, DONE")
    public ResponseEntity<SuccessResponse<String>> setRequestStatus(
        @PathVariable Long id, @Valid @RequestBody StatusChangeRequest statusChangeRequest
    ) {
        requestService.setRequestStatus(id, statusChangeRequest.getStatus());

        return createSuccessResponse(SuccessCode.NO_CONTENT,
            "집 요청 변경 -> " + statusChangeRequest.getStatus()
                                               .toString());
    }
}
