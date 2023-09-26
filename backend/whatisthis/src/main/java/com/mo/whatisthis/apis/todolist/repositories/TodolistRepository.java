package com.mo.whatisthis.apis.todolist.repositories;

import com.mo.whatisthis.apis.todolist.entities.TodolistEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TodolistRepository extends JpaRepository<TodolistEntity, Long> {

    @Query("SELECT t, i FROM TodolistEntity t " +
        "LEFT JOIN FETCH TodolistOptionEntity o ON t.todolistOption.id = o.id " +
        "LEFT JOIN FETCH TodolistImageEntity i ON t.id = i.todolistId " +
        "WHERE t.historyId = :historyId")
    List<Object[]> fetchTodolistWithImagesAndOptionByHistoryId(Long historyId);

}
