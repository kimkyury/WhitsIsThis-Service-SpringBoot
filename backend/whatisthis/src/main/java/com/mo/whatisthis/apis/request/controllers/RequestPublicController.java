package com.mo.whatisthis.apis.request.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.request.requests.RequestRegisterRequest;
import com.mo.whatisthis.apis.request.services.RequestService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/guest/request")
@Tag(name = "3. InspectionRequest")
@RequiredArgsConstructor
public class RequestPublicController {

    private final RequestService requestService;

    @Operation(summary = "비회원의 점검요청 신청", tags = {"3. InspectionRequest"})
    @PostMapping(value="", consumes = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<SuccessResponse<Object>> createRequest(
        @Valid @RequestPart RequestRegisterRequest requestRegisterRequest,
        @RequestPart("warrant") MultipartFile warrantFile) {

        requestService.createRequest(requestRegisterRequest, warrantFile);

        return createSuccessResponse(SuccessCode.CREATED, "Create Customer's Inspection Request");
    }

    @Operation(summary = "비회원의 점검요청 확인(요청 상태에 따라 Output 다름)", tags = {"3. InspectionRequest"})
    @GetMapping("/verification")
    public ResponseEntity<SuccessResponse<Object>> getRequestByPhone(
        @RequestParam String requesterPhone) {
        // api/v1/guest/request/verification?requesterPhone=01000000000

        // 1. 해당 전화번호가 DB에 애초에 저장하지 않으면 404 Error처리

        requestService.findRequestForCustomer(requesterPhone);

        return createSuccessResponse(SuccessCode.OK, "조회");
    }

    @Operation(summary = "비회원의 점검요청 취소(요청 상태에 따라 Output 다름)", tags = {"3. InspectionRequest"})
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<SuccessResponse<Object>> cancelRequest(
        @PathVariable("id") Long requestId) {
        // id == 점검요청에 대한 id

        requestService.cancelRequest(requestId);

        return createSuccessResponse(SuccessCode.OK,
            "Update Inspection Request to Cancel by Customer");
    }


}
