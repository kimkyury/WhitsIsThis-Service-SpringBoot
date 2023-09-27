package com.mo.whatisthis.apis.todolist.repositories;

import com.mo.whatisthis.apis.todolist.entities.TodolistEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodolistRepository extends JpaRepository<TodolistEntity, Long> {

    List<TodolistEntity> findAllByHistoryId(Long historyId);

    Optional<TodolistEntity> findTopByHistoryIdOrderByIdDesc(Long historyId);
}
