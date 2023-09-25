package com.mo.whatisthis.apis.todolist.responses;

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
}
