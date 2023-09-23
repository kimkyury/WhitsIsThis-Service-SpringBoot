package com.mo.whatisthis.apis.history.services;

import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity;
import com.mo.whatisthis.apis.history.entities.DamagedHistoryEntity.Category;
import com.mo.whatisthis.apis.history.repositories.DamagedHistoryRepository;
import com.mo.whatisthis.apis.history.responses.DamagedHistoryResponse;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.utils.AWSS3ResponseUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class DamagedHistoryService {

    private final DamagedHistoryRepository damagedHistoryRepository;
    private final S3Service s3Service;
    private final AWSS3ResponseUtil awss3ResponseUtil;

    public String createDamagedHistory(Long historyId, MultipartFile image, Float x, Float y,
        Category category) throws IOException {
        String url = s3Service.saveFile(image);

        DamagedHistoryEntity damagedHistoryEntity = new DamagedHistoryEntity(historyId, url, x, y,
            category);

        damagedHistoryRepository.save(damagedHistoryEntity);

        return awss3ResponseUtil.concatURL(url);
    }

    public List<DamagedHistoryResponse> getDamagedHistories(Long historyId) {
        List<DamagedHistoryResponse> damagedHistoryResponses = new ArrayList<>();

        for (DamagedHistoryEntity damagedHistoryEntity : damagedHistoryRepository.findAllByHistoryId(
            historyId)) {
            damagedHistoryResponses.add(new DamagedHistoryResponse(damagedHistoryEntity));

            damagedHistoryResponses.get(damagedHistoryResponses.size() - 1)
                                   .setImageUrl(awss3ResponseUtil.concatURL(
                                       damagedHistoryResponses.get(
                                                                  damagedHistoryResponses.size() - 1)
                                                              .getImageUrl()));
        }

        return damagedHistoryResponses;
    }
}
