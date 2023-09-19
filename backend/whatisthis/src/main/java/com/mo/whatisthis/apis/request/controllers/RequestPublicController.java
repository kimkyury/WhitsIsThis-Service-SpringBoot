package com.mo.whatisthis.apis.request.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/guest/request")
@Tag(name = "3. InspectionRequest")
@RequiredArgsConstructor
public class RequestPublicController {

    @Operation(summary = "비회원의 점검요청 신청", tags = {"3. Inspectionrequest"})
    @PostMapping("")
    public ResponseEntity<SuccessResponse<Object>> createRequest(){
        return createSuccessResponse(SuccessCode.CREATED, "생성성공");
    }

    @Operation(summary = "비회원의 점검요청 확인(요청 상태에 따라 Output 다름)", tags = {"3. Inspectionrequest"})
    @GetMapping("/verification")
    public ResponseEntity<SuccessResponse<Object>> getRequestByPhone(@RequestParam String requesterPhone){
        // api/v1/guest/request/verification?requesterPhone=01000000000

        return createSuccessResponse(SuccessCode.OK, "조회");

    }

    @Operation(summary = "비회원의 점검요청 확인(요청 상태에 따라 Output 다름)", tags = {"3. Inspectionrequest"})
    @PatchMapping("/{id}/cancle")
    public ResponseEntity<SuccessResponse<Object>> cancelRequest(){
        return createSuccessResponse(SuccessCode.OK, "조회");
    }




}
