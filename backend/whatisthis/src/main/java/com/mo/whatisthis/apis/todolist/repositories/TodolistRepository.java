package com.mo.whatisthis.apis.todolist.repositories;

import com.mo.whatisthis.apis.todolist.entities.TodolistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodolistRepository extends JpaRepository<TodolistEntity, Long> {

}
