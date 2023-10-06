package com.mo.whatisthis.apis.history.responses;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class IntegratedHistoryResponse {

    private List<DamagedHistoryResponse> damaged;
    private List<DeviceHistoryResponse> device;
    private String drawingUrl;
}
