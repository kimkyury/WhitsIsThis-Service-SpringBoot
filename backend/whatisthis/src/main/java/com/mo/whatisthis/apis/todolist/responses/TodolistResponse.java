package com.mo.whatisthis.apis.todolist.responses;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TodolistResponse {

    private Long id;
    private String content;
    private Boolean isChecked;
    private String significant;
    private List<TodolistImageResponse> images;
}
