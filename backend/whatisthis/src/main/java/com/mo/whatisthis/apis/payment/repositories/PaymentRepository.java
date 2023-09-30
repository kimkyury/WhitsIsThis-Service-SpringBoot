package com.mo.whatisthis.apis.payment.repositories;

import com.mo.whatisthis.apis.payment.entities.PaymentEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

    Optional<PaymentEntity> findByRequestId(Long requestId);

    Optional<PaymentEntity> findByOrderId(String orderId);
}
