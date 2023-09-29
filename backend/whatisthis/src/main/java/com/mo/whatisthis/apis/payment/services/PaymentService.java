package com.mo.whatisthis.apis.payment.services;

import com.mo.whatisthis.apis.payment.entities.PaymentEntity;
import com.mo.whatisthis.apis.payment.repositories.PaymentRepository;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
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
}
