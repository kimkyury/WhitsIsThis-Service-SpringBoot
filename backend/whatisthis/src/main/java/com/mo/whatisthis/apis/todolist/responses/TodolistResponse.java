package com.mo.whatisthis.apis.todolist.responses;

import com.mo.whatisthis.apis.todolist.entities.TodolistEntity;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodolistResponse {

    private Long id;
    private String content;
    private Boolean isChecked;
    private String significant;
    private List<TodolistImageResponse> images;

    public TodolistResponse(TodolistEntity todolistEntity) {
        this.id = todolistEntity.getId();
        this.content = todolistEntity.getTodolistOption()
                                     .getContent();
        this.isChecked = todolistEntity.getIsChecked();
        this.significant = todolistEntity.getSignificant();
    }

    public TodolistResponse(TodolistEntity todolistEntity, List<TodolistImageResponse> images) {
        this.id = todolistEntity.getId();
        this.content = todolistEntity.getTodolistOption()
                                     .getContent();
        this.isChecked = todolistEntity.getIsChecked();
        this.significant = todolistEntity.getSignificant();
        this.images = images;
    }
}
