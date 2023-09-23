package com.mo.whatisthis.apis.history.repositories;

import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamagedHistoryRepository extends JpaRepository<DamagedHistoryEntity, Long> {

}
