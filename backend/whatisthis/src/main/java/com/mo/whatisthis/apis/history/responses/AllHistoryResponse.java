package com.mo.whatisthis.apis.history.responses;

import com.mo.whatisthis.apis.todolist.responses.TodolistResponse;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AllHistoryResponse {

    IntegratedHistoryResponse history;
    List<TodolistResponse> todolist;
}
