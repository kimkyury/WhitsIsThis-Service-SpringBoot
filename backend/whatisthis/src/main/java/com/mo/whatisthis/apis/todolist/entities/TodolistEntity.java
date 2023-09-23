package com.mo.whatisthis.apis.todolist.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "todolists")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TodolistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long requestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "todolist_option_id", nullable = false)
    private TodolistOptionEntity todolistOption;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    @Setter
    private Boolean isChecked;

    @Setter
    private String significant;

    public TodolistEntity(Long requestId, TodolistOptionEntity todolistOption) {
        this.requestId = requestId;
        this.todolistOption = todolistOption;
        this.isChecked = false;
    }
}
