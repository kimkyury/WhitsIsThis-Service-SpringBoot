package com.mo.whatisthis.apis.history.services;

import com.mo.whatisthis.apis.history.entities.DeviceHistoryEntity;
import com.mo.whatisthis.apis.history.entities.DeviceHistoryEntity.Category;
import com.mo.whatisthis.apis.history.repositories.DeviceHistoryRepository;
import com.mo.whatisthis.apis.history.responses.DeviceHistoryResponse;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeviceHistoryService {

    private final DeviceHistoryRepository deviceHistoryRepository;

    public void createDeviceHistory(Long historyId, Float x, Float y,
        Category category, Boolean isWorked) {
        deviceHistoryRepository.save(new DeviceHistoryEntity(historyId, x, y, category,
            isWorked));
    }

    public List<DeviceHistoryResponse> getDeviceHistories(Long historyId) {
        List<DeviceHistoryResponse> deviceHistoryResponses = new ArrayList<>();

        for (DeviceHistoryEntity deviceHistoryEntity : deviceHistoryRepository.findAllByHistoryId(
            historyId)) {
            deviceHistoryResponses.add(new DeviceHistoryResponse(deviceHistoryEntity));
        }

        return deviceHistoryResponses;
    }
}
