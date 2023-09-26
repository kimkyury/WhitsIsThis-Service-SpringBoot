package com.mo.whatisthis.apis.todolist.responses;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TodolistImageResponse {

    private Long id;
    private String imageUrl;
}
