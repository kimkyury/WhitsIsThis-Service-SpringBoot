package com.mo.whatisthis.apis.history.repositories;

import com.mo.whatisthis.apis.history.entities.HistoryEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<HistoryEntity, Long> {

    Optional<HistoryEntity> findByRequestId(Long requestId);

}
