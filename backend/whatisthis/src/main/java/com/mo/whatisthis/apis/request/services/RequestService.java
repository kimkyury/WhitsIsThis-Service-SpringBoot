package com.mo.whatisthis.apis.request.services;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.apis.request.requests.RequestRegisterRequest;
import lombok.RequiredArgsConstructor;
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

        String requestContent = requestEntity.getRequestContent();
        if (!requestContent.isEmpty() && !requestContent.isBlank()) {
            requestEntity.setRequestContent(requestContent);
        }

        requestRepository.save(requestEntity);
    }

}
