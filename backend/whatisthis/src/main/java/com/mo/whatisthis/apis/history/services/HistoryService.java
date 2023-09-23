package com.mo.whatisthis.apis.history.services;

import com.mo.whatisthis.apis.history.entities.HistoryEntity;
import com.mo.whatisthis.apis.history.repositories.HistoryRepository;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import java.io.IOException;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final S3Service s3Service;

    private final HistoryRepository historyRepository;

    public ResponseEntity<byte[]> downloadReport(Long id)
        throws CustomException, IOException {
        HistoryEntity historyEntity = historyRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        String reportUrl = historyEntity.getReportUrl();

        return s3Service.downloadFile(reportUrl, "report");
    }

    public ResponseEntity<byte[]> downloadDrawing(Long id)
        throws CustomException, IOException {
        HistoryEntity historyEntity = historyRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        String drawingUrl = historyEntity.getDrawingUrl();

        return s3Service.downloadFile(drawingUrl, "drawing");
    }

    public ResponseEntity<byte[]> downloadZip(Long id)
        throws CustomException, IOException {
        HistoryEntity historyEntity = historyRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        String zipUrl = historyEntity.getZipUrl();

        return s3Service.downloadFile(zipUrl, "zip");
    }

    @Transactional
    public void uploadReport(Long id, MultipartFile report) throws IOException {
        String url = s3Service.saveFile(report);

        HistoryEntity historyEntity = historyRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        historyEntity.setReportUrl(url);

        historyRepository.save(historyEntity);
    }

    @Transactional
    public void uploadZip(Long id, MultipartFile zip) throws IOException {
        String url = s3Service.saveFile(zip);

        HistoryEntity historyEntity = historyRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        historyEntity.setZipUrl(url);

        historyRepository.save(historyEntity);
    }

    @Transactional
    public void uploadDrawing(Long id, MultipartFile drawing) throws IOException {
        String url = s3Service.saveFile(drawing);

        HistoryEntity historyEntity = historyRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        historyEntity.setDrawingUrl(url);

        historyRepository.save(historyEntity);
    }

}
