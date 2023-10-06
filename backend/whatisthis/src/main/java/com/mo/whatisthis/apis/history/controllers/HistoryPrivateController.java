package com.mo.whatisthis.apis.history.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.history.requests.CreateTodolistRequest;
import com.mo.whatisthis.apis.history.responses.AllHistoryResponse;
import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.apis.todolist.responses.TodolistWrapperResponse;
import com.mo.whatisthis.apis.todolist.services.TodolistService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/private/histories")
@Tag(name = "4. History")
@RequiredArgsConstructor
public class HistoryPrivateController {

    private final TodolistService todolistService;

    private final HistoryService historyService;

    @PostMapping("/{id}/todolists")
    @Operation(summary = "방 선택 후 투두리스트 생성", tags = {
        "6. Inspection"})
    public ResponseEntity<SuccessResponse<TodolistWrapperResponse>> createTodolist(
        @PathVariable Long id,
        @Valid @RequestBody
        CreateTodolistRequest createTodolistRequest) {

        return createSuccessResponse(SuccessCode.CREATED, "선택한 방에 대한 투두리스트 생성",
            todolistService.createTodolist(id, createTodolistRequest.getRoomId()));
    }

    @Operation(summary = "보고서 업로드", tags = {"4. History"})
    @PostMapping("/{id}/report")
    public ResponseEntity<SuccessResponse<String>> uploadReport(@PathVariable Long id,
        @RequestPart("report") MultipartFile multipartFile) throws IOException {
        String url = historyService.uploadReport(id, multipartFile);
        historyService.packToZip(id, url);

        return createSuccessResponse(SuccessCode.OK, "업로드 성공");
    }

    @Operation(summary = "전체 기록 조회 (손상, IoT 장비, 투두리스트)", tags = {"4. History"})
    @GetMapping("/{id}")
    public ResponseEntity<SuccessResponse<AllHistoryResponse>> getAllHistory(
        @PathVariable Long id) {
        return createSuccessResponse(SuccessCode.OK, "전체 기록 조회", historyService.getAllHistory(id));
    }

    @Operation(summary = "투두리스트 조회", tags = {"6. Inspection"})
    @GetMapping("/{id}/todolists")
    public ResponseEntity<SuccessResponse<List<TodolistWrapperResponse>>> getTodolists(
        @PathVariable Long id) {
        return createSuccessResponse(SuccessCode.OK, "투두리스트 조회", historyService.getTodolists(id));
    }
}
