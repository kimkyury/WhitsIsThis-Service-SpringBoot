package com.mo.whatisthis.apis.request.services;

import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.State;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.apis.request.requests.RequestRegisterRequest;
import com.mo.whatisthis.apis.request.responses.RequestFindByCustomerResponse;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.DateUtil;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;

    public void createRequest(RequestRegisterRequest requestRegisterRequest,
        MultipartFile warrant) {

        RequestEntity requestEntity = new RequestEntity(
            requestRegisterRequest.getAddress(),
            requestRegisterRequest.getAddressDetail(),
            requestRegisterRequest.getRequesterName(),
            requestRegisterRequest.getRequesterPhone(),
            DateUtil.stringConvertToLocalDate(requestRegisterRequest.getInspectionStart()),
            DateUtil.stringConvertToLocalDate(requestRegisterRequest.getInspectionEnd())
        );

        String requestContent = requestRegisterRequest.getRequestContent();
        if (!requestContent.isEmpty() || !requestContent.isBlank()) {
            requestEntity.setRequestContent(requestContent);
        }

        String warrantFileUrl;
        if (!warrant.isEmpty()) {
            warrantFileUrl = "temporary/warrant_test.pdf";
            requestEntity.setWarrantUrl(warrantFileUrl);
        }
        requestEntity.setStatus(State.WAITING_FOR_PAY);
        requestEntity.setRequestedAt(LocalDateTime.now());

        requestRepository.save(requestEntity);
    }

    public void cancelRequest(Long requestId) {

        requestRepository.findById(requestId)
                         .ifPresent(
                             (selectRequest) -> {
                                 selectRequest.setStatus(State.CANCELED);
                                 requestRepository.save(selectRequest);
                             }
                         );

    }

    public RequestFindByCustomerResponse findRequestForCustomer(String requesterPhone) {

        RequestEntity requestEntityByPhone = requestRepository.findByRequesterPhone(requesterPhone)
                                                              .orElseThrow(
                                                                  () -> new CustomException(
                                                                      ErrorCode.NOT_FOUND));

        RequestFindByCustomerResponse requestFindByCustomerResponse = new RequestFindByCustomerResponse();
        requestFindByCustomerResponse.of(requestEntityByPhone);

        return requestFindByCustomerResponse;
    }
}
