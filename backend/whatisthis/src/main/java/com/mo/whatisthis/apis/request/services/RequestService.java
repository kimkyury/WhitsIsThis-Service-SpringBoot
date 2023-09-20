package com.mo.whatisthis.apis.request.services;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.State;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.apis.request.requests.RequestRegisterRequest;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;

    public void createRequest(RequestRegisterRequest requestRegisterRequest) {
        RequestEntity requestEntity = new RequestEntity(
            requestRegisterRequest.getAddress(),
            requestRegisterRequest.getAddressDetail(),
            requestRegisterRequest.getRequesterName(),
            requestRegisterRequest.getRequesterPhone(),
            requestRegisterRequest.getInspectionStart(),
            requestRegisterRequest.getInspectionEnd()
        );

        String requestContent = requestRegisterRequest.getRequestContent();
        if (!requestContent.isEmpty() || !requestContent.isBlank()) {
            requestEntity.setRequestContent(requestContent);
        }

        requestEntity.setStatus(State.WAITING_FOR_PAY);
        requestEntity.setRequestedAt(LocalDateTime.now());

        requestRepository.save(requestEntity);
    }

    public void cancelRequest(Long requestId) {

        requestRepository.findById(requestId).ifPresent(
            (selectRequest) -> {
                selectRequest.setStatus(State.CANCELED);
                requestRepository.save(selectRequest);
            }
        );

    }
}
