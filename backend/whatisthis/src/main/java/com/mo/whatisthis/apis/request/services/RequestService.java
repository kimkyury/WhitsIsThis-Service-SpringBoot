package com.mo.whatisthis.apis.request.services;

import com.mo.whatisthis.apis.history.entities.HistoryEntity;
import com.mo.whatisthis.apis.history.repositories.HistoryRepository;
import com.mo.whatisthis.apis.member.repositories.MemberRepository;
import com.mo.whatisthis.apis.request.entities.RequestEntity;
import com.mo.whatisthis.apis.request.entities.RequestEntity.Status;
import com.mo.whatisthis.apis.request.repositories.RequestRepository;
import com.mo.whatisthis.apis.request.requests.RequestRegisterRequest;
import com.mo.whatisthis.apis.request.responses.AssignedRequestResponse;
import com.mo.whatisthis.apis.request.responses.DoneRequestResponse;
import com.mo.whatisthis.apis.request.responses.RequestDetailRequests;
import com.mo.whatisthis.apis.request.responses.RequestFindByCustomerResponse;
import com.mo.whatisthis.apis.request.responses.WaitingRequestResponse;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.DateUtil;
import com.mo.whatisthis.toss.models.Payment;
import com.mo.whatisthis.toss.requests.CreateVirtualAccountRequest;
import com.mo.whatisthis.toss.services.TossService;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final MemberRepository memberRepository;
    private final HistoryRepository historyRepository;
    private final S3Service s3Service;
    private final TossService tossService;
    private final Float weight = 0.305f;
    private final Integer money = 5000;

    public void createRequest(RequestRegisterRequest requestRegisterRequest,
        MultipartFile warrant) throws IOException {

        RequestEntity requestEntity = new RequestEntity(
            requestRegisterRequest.getAddress(),
            requestRegisterRequest.getAddressDetail(),
            requestRegisterRequest.getRequesterName(),
            requestRegisterRequest.getRequesterPhone(),
            DateUtil.stringConvertToLocalDate(requestRegisterRequest.getInspectionStart()),
            DateUtil.stringConvertToLocalDate(requestRegisterRequest.getInspectionEnd()),
            requestRegisterRequest.getBuildingArea()
        );

        String requestContent = requestRegisterRequest.getRequestContent();
        if (!requestContent.isEmpty()) {
            requestEntity.setRequestContent(requestContent);
        }

        if (!warrant.isEmpty()) {
            String warrantFileUrl = s3Service.saveFile(warrant);
            requestEntity.setWarrantUrl(warrantFileUrl);
        }
        requestEntity.setStatus(Status.WAITING_FOR_PAY);
        requestEntity.setRequestedAt(LocalDateTime.now());

        /*
         * 결제 관련 작업
         */
        Integer amount = (int) (requestRegisterRequest.getBuildingArea() * weight * money);
        Payment payment = tossService.createVirtualAccount(
            CreateVirtualAccountRequest.of(amount, requestRegisterRequest.getRequesterName(),
                requestRegisterRequest.getBankCode(), requestRegisterRequest.getRequesterPhone()));

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
        LocalDate today = LocalDate.now();
        List<RequestEntity> requestEntities = requestRepository.findByEmployeeIdAndStatusInAndInspectionStartLessThanEqualAndInspectionEndGreaterThanEqual(
            employeeId,
            List.of(Status.WAITING_FOR_INSPECTION, Status.IN_PROGRESS, Status.DONE), today, today);

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
    public void assignRequest(Long id, Integer employeeId, LocalDate inspectionDate) {
        RequestEntity requestEntity = requestRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        if (!Status.WAITING_INSPECTION_DATE.equals(requestEntity.getStatus())) {
            throw new CustomException(ErrorCode.STATUS_INVALID);
        }

        requestEntity.setEmployee(memberRepository.findById(employeeId)
                                                  .orElseThrow(() -> new CustomException(
                                                      ErrorCode.BAD_REQUEST)));
        requestEntity.setInspectionDate(inspectionDate);
        requestEntity.setStatus(Status.WAITING_FOR_INSPECTION);
        requestRepository.save(requestEntity);

        HistoryEntity historyEntity = new HistoryEntity(requestEntity.getId());
        historyRepository.save(historyEntity);
    }

    public List<WaitingRequestResponse> getWaitingRequest(Integer page) {
        List<WaitingRequestResponse> waitingRequestResponses = new ArrayList<>();

        PageRequest pageRequest = PageRequest.of(page - 1, 10);

        Slice<RequestEntity> requestEntitySlice = requestRepository.findByStatus(
            Status.WAITING_INSPECTION_DATE, pageRequest);

        for (RequestEntity requestEntity : requestEntitySlice.getContent()) {
            waitingRequestResponses.add(new WaitingRequestResponse(requestEntity));
        }

        return waitingRequestResponses;
    }


    public List<DoneRequestResponse> getDoneRequests(Integer page) {
        List<DoneRequestResponse> doneRequestResponses = new ArrayList<>();

        PageRequest pageRequest = PageRequest.of(page - 1, 10);

        Slice<RequestEntity> requestEntitySlice = requestRepository.findByStatus(
            Status.DONE, pageRequest);

        for (RequestEntity requestEntity : requestEntitySlice.getContent()) {
            doneRequestResponses.add(new DoneRequestResponse(requestEntity));
        }

        return doneRequestResponses;
    }

    public RequestDetailRequests getRequestDetail(Long id) {
        RequestEntity requestEntity = requestRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        RequestDetailRequests requestDetailRequests = new RequestDetailRequests(requestEntity);

        Optional<HistoryEntity> historyEntity = historyRepository.findByRequestId(
            requestEntity.getId());

        historyEntity.ifPresent(requestDetailRequests::setHistory);

        return requestDetailRequests;
    }

    public void setRequestStatus(Long id, Status status) {
        RequestEntity requestEntity = requestRepository.findById(id)
                                                       .orElseThrow(() -> new CustomException(
                                                           ErrorCode.BAD_REQUEST));

        requestEntity.setStatus(status);

        requestRepository.save(requestEntity);
    }
}
