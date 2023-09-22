package com.mo.whatisthis.apis.request.services;

import com.mo.whatisthis.apis.member.repositories.MemberRepository;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.apis.request.requests.RequestRegisterRequest;
import com.mo.whatisthis.apis.request.responses.AssignedRequestResponse;
import com.mo.whatisthis.apis.request.responses.DoneRequestResponse;
import com.mo.whatisthis.apis.request.responses.RequestFindByCustomerResponse;
import com.mo.whatisthis.apis.request.responses.WaitingRequestResponse;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.DateUtil;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final MemberRepository memberRepository;
    private final S3Service s3Service;

    public void createRequest(RequestRegisterRequest requestRegisterRequest,
        MultipartFile warrant) throws IOException {

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

        if (!warrant.isEmpty()) {
            String warrantFileUrl = s3Service.saveFile(warrant);
            requestEntity.setWarrantUrl(warrantFileUrl);
        }
        requestEntity.setStatus(Status.WAITING_FOR_PAY);
        requestEntity.setRequestedAt(LocalDateTime.now());

        requestRepository.save(requestEntity);
    }

    public void cancelRequest(Long requestId) {

        requestRepository.findById(requestId)
                         .ifPresent(
                             (selectRequest) -> {
                                 selectRequest.setStatus(Status.CANCELED);
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

    public List<AssignedRequestResponse> getAssignedRequest(Integer employeeId) {
        List<RequestEntity> requestEntities = requestRepository.findByEmployeeIdAndStatusIn(
            employeeId, List.of(Status.WAITING_FOR_INSPECTION, Status.IN_PROGRESS, Status.DONE));

        Map<String, AssignedRequestResponse> assignedRequestResponseMap = new HashMap<>();

        for (RequestEntity requestEntity : requestEntities) {
            AssignedRequestResponse assignedRequestResponse = assignedRequestResponseMap.get(
                requestEntity.getAddress());

            if (assignedRequestResponse == null) {
                assignedRequestResponse = new AssignedRequestResponse(requestEntity);

                assignedRequestResponseMap.put(requestEntity.getAddress(), assignedRequestResponse);
            } else {
                assignedRequestResponse.add(requestEntity);
            }
        }

        List<AssignedRequestResponse> assignedRequestResponses = new ArrayList<>();

        assignedRequestResponseMap.forEach((k, v) -> {
            assignedRequestResponses.add(v);
        });

        return assignedRequestResponses;
    }

    @Transactional
    public void assignRequest(Long id, Integer employeeId) {
        RequestEntity requestEntity = requestRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        requestEntity.setEmployee(memberRepository.findById(employeeId)
                                                  .orElseThrow(() -> new CustomException(
                                                      ErrorCode.BAD_REQUEST)));

        requestRepository.save(requestEntity);
    }

    public List<WaitingRequestResponse> getWaitingRequest() {
        List<WaitingRequestResponse> waitingRequestResponses = new ArrayList<>();

        for (RequestEntity requestEntity : requestRepository.findByStatus(
            Status.WAITING_INSPECTION_DATE)) {
            waitingRequestResponses.add(new WaitingRequestResponse(requestEntity));
        }

        return waitingRequestResponses;
    }


    public List<DoneRequestResponse> getDoneRequests() {
        List<DoneRequestResponse> doneRequestResponses = new ArrayList<>();

        for (RequestEntity requestEntity : requestRepository.findByStatus(
            Status.DONE)) {
            doneRequestResponses.add(new DoneRequestResponse(requestEntity));
        }

        return doneRequestResponses;
    }
}
