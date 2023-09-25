package com.mo.whatisthis.apis.history.responses;

import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity;
import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity.Category;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DamagedHistoryResponse {

    private Long id;
    @Setter
    private String imageUrl;
    private Float x;
    private Float y;
    private Category category;

    public DamagedHistoryResponse(DamagedHistoryEntity damagedHistoryEntity) {
        this.id = damagedHistoryEntity.getId();
        this.imageUrl = damagedHistoryEntity.getImageUrl();
        this.x = damagedHistoryEntity.getX();
        this.y = damagedHistoryEntity.getY();
        this.category = damagedHistoryEntity.getCategory();
    }
}
