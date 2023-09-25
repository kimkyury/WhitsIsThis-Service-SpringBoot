package com.mo.whatisthis.apis.history.repositories;

import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamagedHistoryRepository extends JpaRepository<DamagedHistoryEntity, Long> {

    List<DamagedHistoryEntity> findAllByHistoryId(Long historyId);
}
