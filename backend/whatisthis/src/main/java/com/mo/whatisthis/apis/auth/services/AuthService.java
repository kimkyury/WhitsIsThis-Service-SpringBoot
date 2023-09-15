package com.mo.whatisthis.apis.auth.services;


import com.mo.whatisthis.apis.auth.requests.EmployeeLoginRequest;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse.EmployeeInfo;
import com.mo.whatisthis.apis.members.entities.MemberEntity;
import com.mo.whatisthis.apis.members.repositories.MemberRepository;
import com.mo.whatisthis.jwt.dtos.TokenDto;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.security.service.UserDetailsImpl;
import java.util.Collection;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisService redisService;
    private final MemberRepository memberRepository;

    private UserDetailsImpl userDetails;

    public TokenDto loginEmployee(EmployeeLoginRequest employeeLoginRequest) {

        // 인증 정보를 가진 인스턴스 생성
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(
                employeeLoginRequest.getUsername(), employeeLoginRequest.getPassword());

        // DB에 존재하는지 확인, 성공할시 사용자의 세부 정보과 권한 정보를 갖고 있음

        System.out.println(authenticationToken);
        Authentication authentication = authenticationManagerBuilder.getObject()
                                                                    .authenticate(
                                                                        authenticationToken);
        // 인증된 사용자의 정보 저장소
        SecurityContextHolder.getContext()
                             .setAuthentication(authentication);

        String employeeNo = authentication.getName();
        String employAuthority = authentication.getAuthorities()
                                               .iterator()
                                               .next()
                                               .getAuthority();

        return issueTokens(employeeNo, employAuthority);
    }

    public TokenDto issueTokens(String memberNo, String role) {
        TokenDto tokenDto = jwtTokenProvider.createToken(memberNo, role);
        redisService.saveRefreshToken(memberNo, role);
        return tokenDto;
    }


    public int isInitLoginUser() {
        userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                                                             .getAuthentication();
        if (userDetails.getPhone()
                       .isEmpty()) {
            return 1;
        }
        return 0;
    }

    public EmployeeInfo findEmployeeInfoUseSCH() {

        Integer id = userDetails.getUserId();
        MemberEntity  employeeEntity =  memberRepository.findById(id).get();

        EmployeeInfo employeeInfo = EmployeeInfo.builder()
            .id(employeeEntity.getId())
            .username(employeeEntity.getUsername())
            .name(employeeEntity.getName())
            .phone(employeeEntity.getPhone())
            .role(employeeEntity.getRole().name())
            .imageUrl(employeeEntity.getImageUrl())
            .build();

        return employeeInfo;
    }
}
