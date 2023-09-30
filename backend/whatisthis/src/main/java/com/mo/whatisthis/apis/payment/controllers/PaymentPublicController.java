package com.mo.whatisthis.apis.payment.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.payment.requests.CancelPaymentRequest;
import com.mo.whatisthis.apis.payment.requests.WebhookDepositRequest;
import com.mo.whatisthis.apis.payment.services.PaymentService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "7. Payment")
@RequiredArgsConstructor
public class PaymentPublicController {

    private final PaymentService paymentService;

    @PostMapping("/guest/payments/{id}/cancel")
    @Operation(summary = "비회원의 점검 취소 신청", tags = {
        "3. InspectionRequest"}, description = "입금 전이면 환불 계좌가 필요 없습니다.")
    public ResponseEntity<SuccessResponse<String>> cancelPayment(@PathVariable Long id,
        @RequestBody CancelPaymentRequest cancelPaymentRequest) {
        paymentService.cancelPayment(id, cancelPaymentRequest);

        return createSuccessResponse(SuccessCode.NO_CONTENT, "취소 되었습니다.");
    }

    @PostMapping("/payments/webhooks")
    @Operation(summary = "가상계좌 결제 상태를 알려주는 웹훅", tags = {
        "7. Payment"}, description = "따로 API를 호출해 사용할 일이 없습니다.")
    public ResponseEntity<?> depositCallback(
        @RequestBody WebhookDepositRequest webhookDepositRequest) {
        paymentService.depositCallback(webhookDepositRequest);
        
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
