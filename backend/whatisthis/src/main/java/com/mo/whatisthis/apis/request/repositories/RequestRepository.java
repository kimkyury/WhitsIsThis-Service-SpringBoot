package com.mo.whatisthis.apis.request.repositories;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<RequestEntity, Long> {

    Optional<RequestEntity> findById(Long id);
    Optional<List<RequestEntity>> findByEmployeeId(Integer employeeId);

}
