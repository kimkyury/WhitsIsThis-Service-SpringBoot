package com.mo.whatisthis.apis.members.services;

import com.mo.whatisthis.apis.members.entities.MemberEntity;
import com.mo.whatisthis.apis.members.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.members.repositories.MemberRepository;
import com.mo.whatisthis.apis.members.requests.DeviceRegisterRequest;
import com.mo.whatisthis.apis.members.requests.EmployeeRegisterRequest;
import com.mo.whatisthis.apis.members.responses.MemberCreateResponse;
import com.mo.whatisthis.supports.utils.UUIDUtil;
import java.time.LocalDate;
import java.util.Optional;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberCreateResponse createEmployee() {

        String lastENO = memberRepository.findTopByRoleOrderByUsernameDesc(Role.ROLE_EMPLOYEE)
                                         .get()
                                         .getUsername();

        String newENO = String.valueOf(Long.parseLong(lastENO) + 1);
        String tempPassword = UUIDUtil.generateEfficientUUID();
        String encodedTempPassword = passwordEncoder.encode(tempPassword);
        MemberEntity newEmployeeEntity = new MemberEntity(newENO, encodedTempPassword,
            Role.ROLE_EMPLOYEE);
        memberRepository.save(newEmployeeEntity);

        MemberCreateResponse memberCreateResponse = MemberCreateResponse.builder()
                                                                        .userName(newENO)
                                                                        .tempPassword(tempPassword)
                                                                        .build();

        return memberCreateResponse;
    }

    public void registerDevice(DeviceRegisterRequest deviceRegisterRequest) {

        String serialNumber = deviceRegisterRequest.getSerialNumber();

        MemberEntity newDeviceEntity = new MemberEntity(serialNumber, "TURTLE", Role.ROLE_DEVICE);
        memberRepository.save(newDeviceEntity);
    }

    public void registerEmployee(Integer loginId, EmployeeRegisterRequest employeeRegisterRequest,
        MultipartFile profileImage) {

        String name = employeeRegisterRequest.getName();
        String phone = employeeRegisterRequest.getPhone();
        String profileImgURL = "/Img/testImgURL.png";

        Optional<MemberEntity> employee = memberRepository.findById(loginId);
        employee.ifPresent(selectEmployee -> {
            selectEmployee.setInitialInfo(name, phone, profileImgURL);
        });

    }
}
