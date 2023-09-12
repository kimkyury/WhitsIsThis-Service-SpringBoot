package com.mo.whatisthis.apis.members.services;

import com.mo.whatisthis.apis.members.entities.MemberEntity;
import com.mo.whatisthis.apis.members.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.members.repositories.MemberRepository;
import com.mo.whatisthis.apis.members.requests.DeviceRegisterRequest;
import com.mo.whatisthis.supports.utils.UUIDUtil;
import java.time.LocalDate;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void createEmployee() {
        String lastENO = memberRepository.findTopByRoleOrderByUsernameDesc(
            Role.ROLE_EMPLOYEE.name())
                                         .get()
                                         .getName();

        String newENO = String.valueOf(Integer.parseInt(lastENO) + 1);
        String password = UUIDUtil.generateEfficientUUID();

        MemberEntity newEmployeeEntity = new MemberEntity(newENO, password, Role.ROLE_EMPLOYEE);
        memberRepository.save(newEmployeeEntity);
    }

    public void registerDevice(DeviceRegisterRequest deviceRegisterRequest) {

        String serialNumber = deviceRegisterRequest.getSerialNumber();

        MemberEntity newDeviceEntity = new MemberEntity(serialNumber, "TURTLE", Role.ROLE_DEVICE);
        memberRepository.save(newDeviceEntity);
    }
}
