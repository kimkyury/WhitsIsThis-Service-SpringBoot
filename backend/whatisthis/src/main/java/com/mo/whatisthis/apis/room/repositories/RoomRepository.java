package com.mo.whatisthis.apis.room.repositories;

import com.mo.whatisthis.apis.room.entities.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<RoomEntity, Integer> {

}
