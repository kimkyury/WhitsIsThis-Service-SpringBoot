package com.mo.whatisthis.apis.todolist.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.todolist.requests.UpdateStatusRequest;
import com.mo.whatisthis.apis.todolist.services.TodolistService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/private/todolists")
@Tag(name = "6. Inspection")
@RequiredArgsConstructor
public class TodolistPrivateController {

    private final TodolistService todolistService;

    @PatchMapping("/{id}/status")
    @Operation(summary = "투두리스트 기록 체크 및 특이사항 기입", tags = {
        "6. Inspection"})
    public ResponseEntity<SuccessResponse<Object>> updateTodolistStatus(@PathVariable Long id,
        @Valid @RequestBody UpdateStatusRequest updateStatusRequest) {
        todolistService.updateTodolistStatus(id, updateStatusRequest.getIsChecked(),
            updateStatusRequest.getSignificant());

        return createSuccessResponse(SuccessCode.NO_CONTENT, "변경되었습니다.");
    }
}
