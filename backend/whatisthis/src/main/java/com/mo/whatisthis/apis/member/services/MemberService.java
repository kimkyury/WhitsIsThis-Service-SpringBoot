package com.mo.whatisthis.apis.member.services;

import com.mo.whatisthis.apis.member.entities.MemberEntity;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.member.repositories.MemberRepository;
import com.mo.whatisthis.apis.member.requests.DeviceRegisterRequest;
import com.mo.whatisthis.apis.member.requests.DeviceRegisterToHistoryRequest;
import com.mo.whatisthis.apis.member.requests.EmployeeUpdateRequest;
import com.mo.whatisthis.apis.member.responses.MemberCreateResponse;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.s3.services.S3Service;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.UUIDUtil;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Service s3Service;
    private final RedisService redisService;

    public MemberCreateResponse createEmployee() {

        Optional<MemberEntity> topEmployeeNo = memberRepository.findTopByRoleOrderByUsernameDesc(
            Role.ROLE_EMPLOYEE);

        String newEmployeeNo = null;
        if (topEmployeeNo.isEmpty()) {
            newEmployeeNo = LocalDate.now()
                                     .getYear() + "00000001";
        } else {
            newEmployeeNo = String.valueOf(Long.parseLong(topEmployeeNo.get()
                                                                       .getUsername()) + 1);
        }

        String tempPassword = UUIDUtil.generateEfficientUUID();
        String encodedTempPassword = passwordEncoder.encode(tempPassword);
        MemberEntity newEmployeeEntity = new MemberEntity(newEmployeeNo, encodedTempPassword,
            Role.ROLE_EMPLOYEE);
        memberRepository.save(newEmployeeEntity);

        MemberCreateResponse memberCreateResponse = MemberCreateResponse.builder()
                                                                        .userName(newEmployeeNo)
                                                                        .tempPassword(tempPassword)
                                                                        .build();

        return memberCreateResponse;
    }

    public void registerDevice(DeviceRegisterRequest deviceRegisterRequest) {

        String serialNumber = deviceRegisterRequest.getSerialNumber();
        String encodedDevicePassword = passwordEncoder.encode("TURTLE");

        MemberEntity newDeviceEntity = new MemberEntity(serialNumber, encodedDevicePassword,
            Role.ROLE_DEVICE);
        memberRepository.save(newDeviceEntity);
    }

    public void registerEmployee(Integer loginId, EmployeeUpdateRequest employeeRegisterRequest,
        MultipartFile profileImage) throws IOException {

        String name = employeeRegisterRequest.getName();
        String phone = employeeRegisterRequest.getPhone();
        String password = passwordEncoder.encode(employeeRegisterRequest.getPassword());

        String profileImgURL = s3Service.saveFile(profileImage);

        Optional<MemberEntity> employee = memberRepository.findById(loginId);
        employee.ifPresent(selectEmployee -> {
            selectEmployee.setInitialInfo(name, phone, password, profileImgURL);
            memberRepository.save(selectEmployee);
        });
    }

    public void registerDeviceToHistory(
        DeviceRegisterToHistoryRequest deviceRegisterToHistoryRequest) {

        String serialNumber = deviceRegisterToHistoryRequest.getSerialNumber();

        memberRepository.findByUsername(serialNumber)
                        .orElseThrow(() -> new CustomException(ErrorCode.BAD_REQUEST));

        String historyId = deviceRegisterToHistoryRequest.getHistoryId();

        // TODO: redis에 저장된 이 데이터는 삭제되는 시점이 있어야함 (후보: Socket 통신 중 turtle봇의 종료 신호)
        redisService.saveData("device:" + serialNumber + ":history", historyId);

    }
}
