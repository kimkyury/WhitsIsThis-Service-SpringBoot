package com.mo.whatisthis.apis.payment.services;

import static com.mo.whatisthis.supports.utils.DateUtil.convertStringToLocalDateTime;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mo.whatisthis.apis.bank.repositories.BankRepository;
import com.mo.whatisthis.apis.payment.entities.PaymentEntity;
import com.mo.whatisthis.apis.payment.entities.PaymentEntity.Status;
import com.mo.whatisthis.apis.payment.repositories.PaymentRepository;
import com.mo.whatisthis.apis.payment.requests.CancelPaymentRequest;
import com.mo.whatisthis.apis.payment.requests.WebhookDepositRequest;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.sms.requests.SmsRequest;
import com.mo.whatisthis.sms.requests.SmsRequest.MessageDto;
import com.mo.whatisthis.sms.services.NaverSmsService;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.toss.models.Payment;
import com.mo.whatisthis.toss.requests.CreateVirtualAccountRequest;
import com.mo.whatisthis.toss.services.TossService;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final RequestRepository requestRepository;
    private final BankRepository bankRepository;
    private final TossService tossService;
    private final NaverSmsService naverSmsService;
    private final Float weight = 0.305f;
    private final Integer money = 5000;

    @Transactional
    public void createPayment(RequestEntity requestEntity,
        String bankCode) {
        String bankName = bankRepository.findById(bankCode)
                                        .orElseThrow(
                                            () -> new CustomException(ErrorCode.BAD_REQUEST))
                                        .getName();

        Integer amount = (int) (requestEntity.getBuildingArea() * weight * money);
        Payment payment = tossService.createVirtualAccount(
            CreateVirtualAccountRequest.of(amount, requestEntity.getRequesterName(), bankCode,
                requestEntity.getRequesterPhone()));

        paymentRepository.save(new PaymentEntity(requestEntity, payment));

//        sendMessage(requestEntity.getRequesterPhone(),
//            "[이게MO징] 입금 해야할 계좌는 " + bankName + " : " + payment.getVirtualAccount()
//                                                              .getAccountNumber() + ", 금액은 : "
//                + amount + " 입니다.");
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

            paymentEntity.setRefundBankCode(cancelPaymentRequest.getRefundBankCode());
            paymentEntity.setRefundAccount(cancelPaymentRequest.getRefundAccount());
            paymentEntity.setRefundHolderName(cancelPaymentRequest.getRefundHolderName());
        } else {
            tossService.cancelPayment(com.mo.whatisthis.toss.requests.CancelPaymentRequest.of(
                paymentEntity.getPaymentKey()));
        }

        paymentEntity.setStatus(Status.CANCELED);

        paymentRepository.save(paymentEntity);
        setRequestStatus(paymentEntity.getRequest()
                                      .getId(), RequestEntity.Status.CANCELED);
    }

    @Transactional
    public void depositCallback(WebhookDepositRequest webhookDepositRequest) {
        PaymentEntity paymentEntity = paymentRepository.findByOrderId(
                                                           webhookDepositRequest.getOrderId())
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.INTERNAL_SERVER_ERROR));

        String requesterNumber = paymentEntity.getRequest()
                                              .getRequesterPhone();

        if (Status.WAITING_FOR_DEPOSIT.equals(webhookDepositRequest.getStatus())) {
            if (Status.DONE.equals(paymentEntity.getStatus())) {
                paymentEntity.setStatus(Status.WAITING_FOR_DEPOSIT);
                paymentEntity.setApprovedAt(
                    convertStringToLocalDateTime(webhookDepositRequest.getCreatedAt()));

                paymentRepository.save(paymentEntity);
                setRequestStatus(paymentEntity.getRequest()
                                              .getId(), RequestEntity.Status.WAITING_FOR_PAY);
//                sendMessage(requesterNumber, "[이게MO징] 서비스의 장애가 발생해 입금에 실패하였습니다. 재입금 부탁드립니다.");
            }
        } else if (Status.CANCELED.equals(webhookDepositRequest.getStatus())) {
            paymentEntity.setStatus(Status.CANCELED);

            paymentRepository.save(paymentEntity);
            setRequestStatus(paymentEntity.getRequest()
                                          .getId(), RequestEntity.Status.CANCELED);
//            sendMessage(requesterNumber, "[이게MO징] 집 사전 점검 요청이 취소되었습니다.");
        } else if (Status.DONE.equals(webhookDepositRequest.getStatus())) {
            paymentEntity.setStatus(Status.DONE);

            paymentRepository.save(paymentEntity);
            setRequestStatus(paymentEntity.getRequest()
                                          .getId(), RequestEntity.Status.WAITING_INSPECTION_DATE);
//            sendMessage(requesterNumber, "[이게MO징] 입금이 확인되었습니다.");
        }
    }

    public void sendMessage(String to, String content) {
        MessageDto authMessageDto = naverSmsService.makeMessageDto(to, content);
        SmsRequest authSmsRequest = naverSmsService.makeSmsRequest(authMessageDto);

        try {
            naverSmsService.sendSmsRequest(authSmsRequest);
        } catch (URISyntaxException | JsonProcessingException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException | InvalidKeyException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public void setRequestStatus(Long id, RequestEntity.Status status) {
        RequestEntity requestEntity = requestRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        requestEntity.setStatus(status);

        requestRepository.save(requestEntity);
    }
}
