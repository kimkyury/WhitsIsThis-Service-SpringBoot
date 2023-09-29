package com.mo.whatisthis.apis.todolist.responses;

import com.mo.whatisthis.apis.todolist.entities.TodolistImageEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodolistImageResponse {

    private Long id;
    private String imageUrl;

    public TodolistImageResponse(TodolistImageEntity todolistImageEntity) {
        this.id = todolistImageEntity.getId();
        this.imageUrl = todolistImageEntity.getImageUrl();
    }
}
