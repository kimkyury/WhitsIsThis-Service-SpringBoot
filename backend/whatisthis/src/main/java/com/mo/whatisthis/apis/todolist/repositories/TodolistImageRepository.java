package com.mo.whatisthis.apis.todolist.repositories;

import com.mo.whatisthis.apis.todolist.entities.TodolistImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodolistImageRepository extends JpaRepository<TodolistImageEntity, Long> {
    
}
