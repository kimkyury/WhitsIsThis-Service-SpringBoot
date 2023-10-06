package com.mo.whatisthis.apis;


import static com.mo.whatisthis.supports.utils.ApiResponseUtil.createSuccessResponse;

import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.SuccessCode;
import com.mo.whatisthis.supports.responses.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "0. Testing")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class BasicController {

    private final S3Service s3Service;

    @Value("${cloud.aws.s3.url}")
    private String s3URL;

    @Operation(summary = "Public 통신 테스트", tags = {"0. Testing"})
    @GetMapping("/ping")
    public @ResponseBody
    String ping() {
        return "pong";
    }

    @Operation(summary = "private 통신 테스트", tags = {"0. Testing"})
    @GetMapping("/private/ping")
    public @ResponseBody
    String register() {
        return "You have Auth! Pong";
    }

    @Operation(summary = "파일 업로드 테스트", tags = {"0. Testing"})
    @PostMapping("/upload")
    public ResponseEntity<SuccessResponse<String>> upload(
        @RequestPart("file") MultipartFile multipartFile) throws IOException {
        String url = s3Service.saveFile(multipartFile);

        return createSuccessResponse(SuccessCode.OK, "업로드 성공", s3URL + url);
    }

    @Operation(summary = "파일 다운로드 테스트", tags = {"0. Testing"})
    @GetMapping("/download/{fileURL}")
    public ResponseEntity<byte[]> download(@PathVariable String fileURL) throws IOException {
        return s3Service.downloadFile(fileURL, "report");
    }

}
