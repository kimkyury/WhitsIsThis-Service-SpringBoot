package com.mo.whatisthis.apis.todolist.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "todolist_images")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodolistImageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long todolistId;

    @Column(nullable = false)
    private String imageUrl;

    public TodolistImageEntity(Long todolistId, String imageUrl) {
        this.todolistId = todolistId;
        this.imageUrl = imageUrl;
    }
}
