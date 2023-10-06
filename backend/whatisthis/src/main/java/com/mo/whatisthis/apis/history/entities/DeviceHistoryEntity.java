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
import lombok.Setter;

@Entity
@Table(name = "device_histories")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DeviceHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long historyId;

    @Column(nullable = false)
    private Float x;

    @Column(nullable = false)
    private Float y;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    @Setter
    private Boolean isWorked;

    public DeviceHistoryEntity(Long historyId, Float x, Float y, Category category,
        Boolean isWorked) {
        this.historyId = historyId;
        this.x = x;
        this.y = y;
        this.category = category;
        this.isWorked = isWorked;
    }

    /*
        AIR_CONDITIONER("에어컨", "An appliance for cooling and dehumidifying indoor air."),
        HEATING_SYSTEM("난방 시스템", "A system designed to raise the temperature inside the building."),
        VENTILATION_SYSTEM("환기 시스템", "A system for bringing fresh air into rooms and expelling stale or noxious air."),
        BUILT_IN_WARDROBE("빌트인 옷장", "A wardrobe that is built directly into the walls of a room."),
        OVEN("오븐", "An enclosed compartment for cooking and heating food."),
        REFRIGERATOR("냉장고", "An appliance for keeping food cold."),
        DISHWASHER("식기세척기", "A machine for washing dishes automatically."),
        SECURITY_CAMERA("보안 카메라", "A camera that monitors and records activities in and around the building."),
        FIRE_ALARM("화재 알람", "A device that gives a warning in case of fire."),
        LIGHTING_SYSTEM("조명 시스템", "An arrangement of lights for illumination.");
         */
    public enum Category {
        AIR_CONDITIONER, HEATING_SYSTEM, VENTILATION_SYSTEM, OVEN, REFRIGERATOR, DISHWASHER, SECURITY_CAMERA, FIRE_ALARM, LIGHTING_SYSTEM
    }
}
