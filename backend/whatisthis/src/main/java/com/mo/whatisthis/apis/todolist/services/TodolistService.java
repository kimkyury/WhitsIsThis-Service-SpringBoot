package com.mo.whatisthis.apis.todolist.services;

import com.mo.whatisthis.apis.request.responses.CreateTodolistResponse;
import com.mo.whatisthis.apis.todolist.entities.TodolistEntity;
import com.mo.whatisthis.apis.todolist.entities.TodolistImageEntity;
import com.mo.whatisthis.apis.todolist.entities.TodolistOptionEntity;
import com.mo.whatisthis.apis.todolist.repositories.TodolistImageRepository;
import com.mo.whatisthis.apis.todolist.repositories.TodolistOptionsRepository;
import com.mo.whatisthis.apis.todolist.repositories.TodolistRepository;
import com.mo.whatisthis.apis.todolist.responses.TodolistImageResponse;
import com.mo.whatisthis.apis.todolist.responses.TodolistResponse;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.AWSS3ResponseUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
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
    private final S3Service s3Service;
    private final AWSS3ResponseUtil awss3ResponseUtil;

    @Transactional
    public List<CreateTodolistResponse> createTodolist(Long historyId, Integer roomId) {
        List<TodolistEntity> todolistEntities = new ArrayList<>();

        for (TodolistOptionEntity todolistOptionEntity : todolistOptionsRepository.findAllByRoomId(
            roomId)) {
            todolistEntities.add(new TodolistEntity(historyId, todolistOptionEntity));
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

    public String uploadTodolistImage(Long id, MultipartFile image) throws IOException {
        String url = s3Service.saveFile(image);

        TodolistImageEntity todolistImageEntity = new TodolistImageEntity(id, url);
        todolistImageRepository.save(todolistImageEntity);

        return awss3ResponseUtil.concatURL(url);
    }

    public List<TodolistResponse> getTodolists(Long historyId) {
        List<Object[]> results = todolistRepository.fetchTodolistWithImagesAndOptionByHistoryId(
            historyId);

        // Mapping the results into a map to associate images with their respective TodolistEntity
        Map<TodolistEntity, List<TodolistImageEntity>> todolistMap = new HashMap<>();

        for (Object[] result : results) {
            TodolistEntity todolist = (TodolistEntity) result[0];
            TodolistImageEntity image = (TodolistImageEntity) result[1];

            todolistMap
                .computeIfAbsent(todolist, k -> new ArrayList<>())
                .add(image);
        }

        // Convert the map into a list of TodolistResponse
        List<TodolistResponse> responses = new ArrayList<>();

        for (Map.Entry<TodolistEntity, List<TodolistImageEntity>> entry : todolistMap.entrySet()) {
            TodolistEntity todolist = entry.getKey();

            List<TodolistImageResponse> imageResponses = entry.getValue()
                                                              .stream()
                                                              .filter(
                                                                  Objects::nonNull)  // Filter out null TodolistImageEntity objects
                                                              .map(
                                                                  image -> new TodolistImageResponse(
                                                                      image.getId(),
                                                                      image.getImageUrl()))
                                                              .collect(Collectors.toList());

            responses.add(new TodolistResponse(
                todolist.getId(),
                todolist.getTodolistOption()
                        .getContent(),
                todolist.getIsChecked(),
                todolist.getSignificant(),
                imageResponses
            ));
        }

        return responses;
    }

}
