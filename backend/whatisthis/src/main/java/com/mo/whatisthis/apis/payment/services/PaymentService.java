package com.mo.whatisthis.apis.payment.services;

import com.mo.whatisthis.apis.payment.entities.PaymentEntity;
import com.mo.whatisthis.apis.payment.entities.PaymentEntity.Status;
import com.mo.whatisthis.apis.payment.repositories.PaymentRepository;
import com.mo.whatisthis.apis.payment.requests.CancelPaymentRequest;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.toss.models.Payment;
import com.mo.whatisthis.toss.requests.CreateVirtualAccountRequest;
import com.mo.whatisthis.toss.services.TossService;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final TossService tossService;
    private final Float weight = 0.305f;
    private final Integer money = 5000;

    @Transactional
    public void createPayment(RequestEntity requestEntity,
        String bankCode) {
        Integer amount = (int) (requestEntity.getBuildingArea() * weight * money);
        Payment payment = tossService.createVirtualAccount(
            CreateVirtualAccountRequest.of(amount, requestEntity.getRequesterName(), bankCode,
                requestEntity.getRequesterPhone()));

        paymentRepository.save(new PaymentEntity(requestEntity, payment));
    }

    @Transactional
    public void cancelPayment(Long id, CancelPaymentRequest cancelPaymentRequest) {
        PaymentEntity paymentEntity = paymentRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        if (!(Status.WAITING_FOR_DEPOSIT.equals(paymentEntity.getStatus()) || Status.DONE.equals(
            paymentEntity.getStatus()))) // 취소가 가능한 상태가 아니라면
        {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

        if (Status.DONE.equals(paymentEntity.getStatus())) {
            if (cancelPaymentRequest.getRefundAccount() == null) {
                throw new CustomException(ErrorCode.BAD_REQUEST);
            }
            if (cancelPaymentRequest.getRefundBankCode() == null) {
                throw new CustomException(ErrorCode.BAD_REQUEST);
            }
            if (cancelPaymentRequest.getRefundHolderName() == null) {
                throw new CustomException(ErrorCode.BAD_REQUEST);
            }

            tossService.cancelPayment(com.mo.whatisthis.toss.requests.CancelPaymentRequest.of(
                paymentEntity.getPaymentKey(), cancelPaymentRequest.getRefundBankCode(),
                cancelPaymentRequest.getRefundAccount(),
                cancelPaymentRequest.getRefundHolderName()));
        } else {
            tossService.cancelPayment(com.mo.whatisthis.toss.requests.CancelPaymentRequest.of(
                paymentEntity.getPaymentKey()));
        }

        paymentEntity.setStatus(Status.CANCELED);
        paymentRepository.save(paymentEntity);
    }
}
