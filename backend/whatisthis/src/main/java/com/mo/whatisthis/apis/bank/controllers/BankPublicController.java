package com.mo.whatisthis.apis.bank.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.bank.responses.BankResponse;
import com.mo.whatisthis.apis.bank.services.BankService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/banks")
@Tag(name = "5. Common code")
@RequiredArgsConstructor
public class BankPublicController {

    private final BankService bankService;

    @GetMapping("")
    @Operation(summary = "모든 은행 가져오기", tags = {"5. Common code"})
    public ResponseEntity<SuccessResponse<List<BankResponse>>> getBanks() {
        return createSuccessResponse(SuccessCode.OK, "전체 은행 조회", bankService.getBanks());
    }

    @GetMapping("/assigned")
    @Operation(summary = "가상계좌 발급 가능 은행", tags = {"5. Common code"})
    public ResponseEntity<SuccessResponse<List<BankResponse>>> getAssignedBanks() {
        return createSuccessResponse(SuccessCode.OK, "가상계좌 발급 가능 은행 조회",
            bankService.getAssignedBanks());
    }
}
