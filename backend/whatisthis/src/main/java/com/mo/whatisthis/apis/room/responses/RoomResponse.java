package com.mo.whatisthis.apis.room.responses;

import com.mo.whatisthis.apis.room.entities.RoomEntity;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RoomResponse {

    private Integer id;
    private String name;

    public void of(RoomEntity roomEntity) {
        this.id = roomEntity.getId();
        this.name = roomEntity.getName();
    }

}
