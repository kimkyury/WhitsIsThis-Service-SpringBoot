package com.mo.whatisthis.apis.room.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.room.responses.RoomResponse;
import com.mo.whatisthis.apis.room.services.RoomService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/private/rooms")
@Tag(name = "5. Common code")
@RequiredArgsConstructor
public class RoomPrivateController {

    private final RoomService roomService;

    @GetMapping("")
    @Operation(summary = "모든 방 종류 가져오기", tags = {"5. Common code"})
    public ResponseEntity<SuccessResponse<List<RoomResponse>>> getRooms() {
        return createSuccessResponse(SuccessCode.OK, "모든 방 정보 조회", roomService.getRooms());
    }
}
