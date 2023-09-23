package com.mo.whatisthis.apis.history.controllers;

import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.apis.history.services.HistoryService;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/histories")
@Tag(name = "4. History")
@RequiredArgsConstructor
public class HistoryPublicController {

    private final HistoryService historyService;

    @Operation(summary = "보고서 다운로드", tags = {"4. History"})
    @GetMapping("/{id}/report")
    public ResponseEntity<byte[]> downloadReport(@PathVariable Long id) throws IOException {
        return historyService.downloadReport(id);
    }

    @Operation(summary = "보고서 업로드", tags = {"4. History"})
    @PostMapping("/{id}/report")
    public ResponseEntity<SuccessResponse<String>> uploadReport(@PathVariable Long id,
        @RequestPart("report") MultipartFile multipartFile) throws IOException {
        historyService.uploadReport(id, multipartFile);

        return createSuccessResponse(SuccessCode.OK, "업로드 성공");
    }

    @Operation(summary = "도면 다운로드", tags = {"4. History"})
    @GetMapping("/{id}/drawing")
    public ResponseEntity<byte[]> downloadDrawing(@PathVariable Long id) throws IOException {
        return historyService.downloadDrawing(id);
    }

    @Operation(summary = "압축 파일 다운로드", tags = {"4. History"})
    @GetMapping("/{id}/zip")
    public ResponseEntity<byte[]> downloadZip(@PathVariable Long id) throws IOException {
        return historyService.downloadZip(id);
    }

    @Operation(summary = "압축 파일 업로드", tags = {"4. History"})
    @PostMapping("/{id}/zip")
    public ResponseEntity<SuccessResponse<String>> uploadZip(@PathVariable Long id,
        @RequestPart("zip") MultipartFile multipartFile) throws IOException {
        historyService.uploadZip(id, multipartFile);

        return createSuccessResponse(SuccessCode.OK, "업로드 성공");
    }
}
