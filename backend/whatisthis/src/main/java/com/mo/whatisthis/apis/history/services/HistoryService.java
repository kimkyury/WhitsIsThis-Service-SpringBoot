package com.mo.whatisthis.apis.history.services;

import com.mo.whatisthis.apis.history.entities.HistoryEntity;
import com.mo.whatisthis.apis.history.repositories.HistoryRepository;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.AWSS3ResponseUtil;
import java.io.IOException;
import java.time.LocalDateTime;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final S3Service s3Service;

    private final AWSS3ResponseUtil awss3ResponseUtil;

    private final HistoryRepository historyRepository;

    private final RequestRepository requestRepository;

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

        RequestEntity requestEntity = requestRepository.findById(historyEntity.getRequestId())
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        historyEntity.setReportUrl(url);
        historyEntity.setInspectedAt(LocalDateTime.now());
        requestEntity.setStatus(Status.DONE);

        historyRepository.save(historyEntity);
        requestRepository.save(requestEntity);
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
    public String uploadDrawing(Long id, MultipartFile drawing) throws IOException {
        String url = s3Service.saveFile(drawing);

        HistoryEntity historyEntity = historyRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        historyEntity.setDrawingUrl(url);

        historyRepository.save(historyEntity);

        return awss3ResponseUtil.concatURL(url);
    }

}
