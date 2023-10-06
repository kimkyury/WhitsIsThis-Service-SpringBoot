package com.mo.whatisthis.apis.history.repositories;

import com.mo.whatisthis.apis.history.entities.DeviceHistoryEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceHistoryRepository extends JpaRepository<DeviceHistoryEntity, Long> {

    List<DeviceHistoryEntity> findAllByHistoryId(Long historyId);
}
