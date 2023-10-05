package com.mo.whatisthis.apis.history.services;

import com.mo.whatisthis.apis.history.entities.HistoryEntity;
import com.mo.whatisthis.apis.history.repositories.HistoryRepository;
import com.mo.whatisthis.apis.history.responses.AllHistoryResponse;
import com.mo.whatisthis.apis.history.responses.DamagedHistoryResponse;
import com.mo.whatisthis.apis.history.responses.IntegratedHistoryResponse;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.apis.todolist.responses.TodolistImageResponse;
import com.mo.whatisthis.apis.todolist.responses.TodolistResponse;
import com.mo.whatisthis.apis.todolist.responses.TodolistWrapperResponse;
import com.mo.whatisthis.apis.todolist.services.TodolistService;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.AWSS3ResponseUtil;
import com.mo.whatisthis.supports.utils.WebSocketUtils;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

    private final DamagedHistoryService damagedHistoryService;

    private final DeviceHistoryService deviceHistoryService;

    private final TodolistService todolistService;

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
    public String uploadReport(Long id, MultipartFile report) throws IOException {
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

        return url;
    }

    public void packToZip(Long id, String reportUrl) throws IOException {
        List<String> keys = new ArrayList<>();
        keys.add(reportUrl);

        AllHistoryResponse allHistoryResponse = getAllHistory(id);

        if (allHistoryResponse.getHistory() != null && allHistoryResponse.getHistory()
                                                                         .getDamaged() != null) {
            for (DamagedHistoryResponse damagedHistoryResponse : allHistoryResponse.getHistory()
                                                                                   .getDamaged()) {
                if (damagedHistoryResponse.getImageUrl() != null) {
                    keys.add(damagedHistoryResponse.getImageUrl());
                }
            }
        }

        if (allHistoryResponse.getHistory() != null && allHistoryResponse.getHistory()
                                                                         .getDrawingUrl() != null) {
            keys.add(allHistoryResponse.getHistory()
                                       .getDrawingUrl());
        }

        if (allHistoryResponse.getTodolist() != null) {
            for (TodolistWrapperResponse todolistWrapperResponse : allHistoryResponse.getTodolist()) {
                if (todolistWrapperResponse.getTodolist() != null) {
                    for (TodolistResponse todolistResponse : todolistWrapperResponse.getTodolist()) {
                        if (todolistResponse.getImages() != null) {
                            for (TodolistImageResponse todolistImageResponse : todolistResponse.getImages()) {
                                if (todolistImageResponse.getImageUrl() != null) {
                                    keys.add(todolistImageResponse.getImageUrl());
                                }
                            }
                        }
                    }
                }
            }
        }

        byte[] zip = s3Service.downloadFilesAsZip(keys);
        uploadZip(id, WebSocketUtils.convertToMultipartFile(zip, "zip.zip"));
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

    public IntegratedHistoryResponse getIntegratedHistory(Long id) {
        HistoryEntity historyEntity = historyRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        return new IntegratedHistoryResponse(damagedHistoryService.getDamagedHistories(id),
            deviceHistoryService.getDeviceHistories(id), historyEntity.getDrawingUrl());
    }

    public List<TodolistWrapperResponse> getTodolists(Long id) {
        return todolistService.getTodolists(id);
    }

    public AllHistoryResponse getAllHistory(Long id) {
        return new AllHistoryResponse(getIntegratedHistory(id), todolistService.getTodolists(id));
    }

}
