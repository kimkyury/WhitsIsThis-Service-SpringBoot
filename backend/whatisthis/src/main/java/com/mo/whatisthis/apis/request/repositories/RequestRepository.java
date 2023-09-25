package com.mo.whatisthis.apis.request.repositories;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<RequestEntity, Long> {

    Optional<RequestEntity> findByRequesterPhone(String phone);

    List<RequestEntity> findByEmployeeIdAndStatusIn(Integer employeeId,
        List<RequestEntity.Status> statuses);

    Slice<RequestEntity> findByStatus(RequestEntity.Status status, Pageable pageable);
}
