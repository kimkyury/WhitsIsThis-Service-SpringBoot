package com.mo.whatisthis.apis.history.controllers;

import com.mo.whatisthis.apis.history.services.HistoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
