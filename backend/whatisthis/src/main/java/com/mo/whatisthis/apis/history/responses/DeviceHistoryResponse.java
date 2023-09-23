package com.mo.whatisthis.apis.history.responses;

import com.mo.whatisthis.apis.history.entities.DeviceHistoryEntity;
import com.mo.whatisthis.apis.history.entities.DeviceHistoryEntity.Category;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DeviceHistoryResponse {

    private Long id;
    private Float x;
    private Float y;
    private Category category;
    private Boolean isWorked;

    public DeviceHistoryResponse(DeviceHistoryEntity deviceHistoryEntity) {
        this.id = deviceHistoryEntity.getId();
        this.x = deviceHistoryEntity.getX();
        this.y = deviceHistoryEntity.getY();
        this.category = deviceHistoryEntity.getCategory();
        this.isWorked = deviceHistoryEntity.getIsWorked();
    }
}
