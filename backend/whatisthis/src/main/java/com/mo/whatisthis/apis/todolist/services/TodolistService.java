package com.mo.whatisthis.apis.todolist.services;

import com.mo.whatisthis.apis.request.responses.CreateTodolistResponse;
import com.mo.whatisthis.apis.todolist.entities.TodolistEntity;
import com.mo.whatisthis.apis.todolist.entities.TodolistOptionEntity;
import com.mo.whatisthis.apis.todolist.repositories.TodolistOptionsRepository;
import com.mo.whatisthis.apis.todolist.repositories.TodolistRepository;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodolistService {

    private final TodolistRepository todolistRepository;
    private final TodolistOptionsRepository todolistOptionsRepository;

    @Transactional
    public List<CreateTodolistResponse> createTodolist(Long requestId, Integer roomId) {
        List<TodolistEntity> todolistEntities = new ArrayList<>();

        for (TodolistOptionEntity todolistOptionEntity : todolistOptionsRepository.findAllByRoomId(
            roomId)) {
            todolistEntities.add(new TodolistEntity(requestId, todolistOptionEntity));
        }

        List<CreateTodolistResponse> createTodolistResponses = new ArrayList<>();

        for (TodolistEntity todolistEntity : todolistRepository.saveAll(todolistEntities)) {
            createTodolistResponses.add(new CreateTodolistResponse(todolistEntity.getId(),
                todolistEntity.getTodolistOption()
                              .getContent()));
        }

        return createTodolistResponses;
    }

    @Transactional
    public void updateTodolistStatus(Long id, Boolean isChecked, String significant) {
        TodolistEntity todolistEntity = todolistRepository.findById(id)
                                                          .orElseThrow(() -> new CustomException(
                                                              ErrorCode.BAD_REQUEST));

        if (isChecked != null) {
            todolistEntity.setIsChecked(isChecked);
        }
        if (significant != null) {
            todolistEntity.setSignificant(significant);
        }

        todolistRepository.save(todolistEntity);
    }
}
