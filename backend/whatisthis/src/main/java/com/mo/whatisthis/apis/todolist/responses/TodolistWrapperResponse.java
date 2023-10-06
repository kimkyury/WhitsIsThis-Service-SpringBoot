package com.mo.whatisthis.apis.todolist.responses;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TodolistWrapperResponse {

    private Integer roomOrder;
    private String roomName;
    private List<TodolistResponse> todolist;
}
