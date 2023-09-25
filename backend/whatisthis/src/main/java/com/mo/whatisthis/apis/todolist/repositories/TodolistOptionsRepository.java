package com.mo.whatisthis.apis.todolist.repositories;

import com.mo.whatisthis.apis.todolist.entities.TodolistOptionEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodolistOptionsRepository extends JpaRepository<TodolistOptionEntity, Integer> {

    List<TodolistOptionEntity> findAllByRoomId(Integer roomId);
}
