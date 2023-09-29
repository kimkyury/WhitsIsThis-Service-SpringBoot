package com.mo.whatisthis.apis.todolist.services;

import com.mo.whatisthis.apis.room.repositories.RoomRepository;
import com.mo.whatisthis.apis.todolist.entities.TodolistEntity;
import com.mo.whatisthis.apis.todolist.entities.TodolistImageEntity;
import com.mo.whatisthis.apis.todolist.entities.TodolistOptionEntity;
import com.mo.whatisthis.apis.todolist.repositories.TodolistImageRepository;
import com.mo.whatisthis.apis.todolist.repositories.TodolistOptionsRepository;
import com.mo.whatisthis.apis.todolist.repositories.TodolistRepository;
import com.mo.whatisthis.apis.todolist.responses.TodolistImageResponse;
import com.mo.whatisthis.apis.todolist.responses.TodolistResponse;
import com.mo.whatisthis.apis.todolist.responses.TodolistWrapperResponse;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.AWSS3ResponseUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class TodolistService {

    private final TodolistRepository todolistRepository;
    private final TodolistOptionsRepository todolistOptionsRepository;
    private final TodolistImageRepository todolistImageRepository;
    private final RoomRepository roomRepository;

    private final S3Service s3Service;
    private final AWSS3ResponseUtil awsS3ResponseUtil;

    @Transactional
    public TodolistWrapperResponse createTodolist(Long historyId, Integer roomId) {
        List<TodolistEntity> todolistEntities = new ArrayList<>();

        Optional<TodolistEntity> top = todolistRepository.findTopByHistoryIdOrderByIdDesc(
            historyId);
        Integer roomOrder = top.map(entity -> entity
                                   .getRoomOrder() + 1)
                               .orElse(1);
        String roomName = roomRepository.findById(roomId)
                                        .orElseThrow(
                                            () -> new CustomException(ErrorCode.BAD_REQUEST))
                                        .getName();

        for (TodolistOptionEntity todolistOptionEntity : todolistOptionsRepository.findAllByRoomId(
            roomId)) {
            todolistEntities.add(new TodolistEntity(historyId, roomOrder, todolistOptionEntity));
        }

        List<TodolistResponse> todolistResponses = new ArrayList<>();
        for (TodolistEntity todolistEntity : todolistRepository.saveAll(todolistEntities)) {
            todolistResponses.add(new TodolistResponse(todolistEntity));
        }

        return new TodolistWrapperResponse(roomOrder, roomName, todolistResponses);
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

    public String uploadTodolistImage(Long id, MultipartFile image) throws IOException {
        String url = s3Service.saveFile(image);

        TodolistImageEntity todolistImageEntity = new TodolistImageEntity(id, url);
        todolistImageRepository.save(todolistImageEntity);

        return awsS3ResponseUtil.concatURL(url);
    }

    public void deleteTodolistImage(Long id) throws IOException {
        TodolistImageEntity todolistImageEntity = todolistImageRepository.findById(id)
                                                                         .orElseThrow(
                                                                             () -> new CustomException(
                                                                                 ErrorCode.BAD_REQUEST));

        s3Service.deleteFile(todolistImageEntity.getImageUrl());

        todolistImageRepository.delete(todolistImageEntity);
    }

    public List<TodolistImageResponse> getTodolistImage(Long todolistId) {
        List<TodolistImageResponse> todolistImageResponses = new ArrayList<>();
        for (TodolistImageEntity todolistImageEntity : todolistImageRepository.findAllByTodolistId(
            todolistId)) {
            todolistImageResponses.add(new TodolistImageResponse(todolistImageEntity));
        }

        return todolistImageResponses;
    }

    public List<TodolistWrapperResponse> getTodolists(Long historyId) {
        List<TodolistEntity> todolistEntities = todolistRepository.findAllByHistoryId(historyId);
        List<TodolistWrapperResponse> todolistWrapperResponses = new ArrayList<>();

        for (int i = 0; i < todolistEntities.size(); i++) {
            List<TodolistResponse> todolistResponses = new ArrayList<>();

            Integer roomOrder = 1;
            String roomName = roomRepository.findById(todolistEntities.get(i)
                                                                      .getTodolistOption()
                                                                      .getRoomId())
                                            .orElseThrow(
                                                () -> new CustomException(ErrorCode.BAD_REQUEST))
                                            .getName();
            ;
            int j = i;

            for (; j < todolistEntities.size(); j++) {
                List<TodolistImageResponse> todolistImageResponses = getTodolistImage(
                    todolistEntities.get(j)
                                    .getId());

                todolistResponses.add(
                    new TodolistResponse(todolistEntities.get(j), todolistImageResponses));

                roomOrder = todolistEntities.get(j)
                                            .getRoomOrder();

                if (j < todolistEntities.size() - 1 && todolistEntities.get(j)
                                                                       .getRoomOrder()
                    != todolistEntities.get(j + 1)
                                       .getRoomOrder()) {
                    break;
                }
            }

            i = j;
            todolistWrapperResponses.add(
                new TodolistWrapperResponse(roomOrder, roomName, todolistResponses));
        }

        return todolistWrapperResponses;
    }

}
