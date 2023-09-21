package com.mo.whatisthis.apis.history.services;

import com.mo.whatisthis.apis.history.entities.HistoryEntity;
import com.mo.whatisthis.apis.history.repositories.HistoryRepository;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final S3Service s3Service;

    private final HistoryRepository historyRepository;

    public ResponseEntity<byte[]> downloadReport(Long requestId)
        throws CustomException, IOException {
        HistoryEntity historyEntity = historyRepository.findByRequestId(requestId)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        String reportUrl = historyEntity.getReportUrl();

        return s3Service.downloadFile(reportUrl, "report");
    }

    public ResponseEntity<byte[]> downloadDrawing(Long requestId)
        throws CustomException, IOException {
        HistoryEntity historyEntity = historyRepository.findByRequestId(requestId)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        String drawingUrl = historyEntity.getDrawingUrl();

        return s3Service.downloadFile(drawingUrl, "drawing");
    }

    public ResponseEntity<byte[]> downloadZip(Long requestId)
        throws CustomException, IOException {
        HistoryEntity historyEntity = historyRepository.findByRequestId(requestId)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        String zipUrl = historyEntity.getZipUrl();

        return s3Service.downloadFile(zipUrl, "zip");
    }

}
