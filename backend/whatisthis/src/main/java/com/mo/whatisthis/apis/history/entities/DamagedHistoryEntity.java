package com.mo.whatisthis.apis.history.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "damaged_histories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DamagedHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long historyId;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Float x;

    @Column(nullable = false)
    private Float y;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    public DamagedHistoryEntity(Long historyId, String imageUrl, Float x, Float y,
        Category category) {
        this.historyId = historyId;
        this.imageUrl = imageUrl;
        this.x = x;
        this.y = y;
        this.category = category;
    }

    /*
    SCRATCH("흠집", "A mark or wound made by something sharp, especially by nails, claws, or thorns."),
    DENT("찍힘 자국", "A small hollow made by a blow or pressure, typically appearing on the surface of a hard material."),
    HOLE("구멍", "A hollow place in a solid body or surface, often with an opening to the outside."),
    SCUFF("긁힘", "A mark made on a surface or an object by scraping or rubbing against another surface."),
    PEEL_OR_CHIP("벗겨짐", "A piece or segment of something that has become detached or flaked off, often referring to paint or wall coverings."),
    DISCOLORATION("변색", "A change in color, typically for the worse, that can occur from exposure, damage, or age."),
    WATER_STAIN("젖은 자국", "A usually whitish mark on a surface resulting from the deposition of insoluble matter contained in water that has evaporated."),
    BURN_MARK("타자국", "A mark or scar on a surface resulting from direct exposure to heat or flame.");
     */
    public enum Category {
        SCRATCH, DENT, HOLE, SCUFF, PEEL_OR_CHIP, DISCOLORATION, WATER_STAIN, BURN_MARK
    }
}
