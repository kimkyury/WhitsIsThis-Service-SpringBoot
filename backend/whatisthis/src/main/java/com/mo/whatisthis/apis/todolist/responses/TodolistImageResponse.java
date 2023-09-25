package com.mo.whatisthis.apis.todolist.responses;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodolistImageResponse {

    private Long id;
    private String imageUrl;
}
