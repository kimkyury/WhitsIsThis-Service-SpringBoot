package com.mo.whatisthis.apis.auth.services;


import com.mo.whatisthis.apis.auth.requests.EmployeeLoginRequest;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse.EmployeeInfo;
import com.mo.whatisthis.apis.member.entities.MemberEntity;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.member.repositories.MemberRepository;
import com.mo.whatisthis.jwt.dtos.TokenDto;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.security.utils.SecurityUtil;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisService redisService;
    private final MemberRepository memberRepository;

    public TokenDto loginEmployee(EmployeeLoginRequest employeeLoginRequest) {

        // 인증 정보를 가진 인스턴스 생성
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(
                employeeLoginRequest.getUsername(), employeeLoginRequest.getPassword());

        System.out.println("----------- Done Make Token");
        // DB에 존재하는지 확인, 성공할시 사용자의 세부 정보과 권한 정보를 갖고 있음

        Authentication authentication = authenticationManagerBuilder.getObject()
                                                                    .authenticate(
                                                                        authenticationToken);
        System.out.println("----------- Done Make Token22222");
        // 인증된 사용자의 정보 저장소
        SecurityContextHolder.getContext()
                             .setAuthentication(authentication);

        String employeeNo = authentication.getName();
        String employAuthority = authentication.getAuthorities()
                                               .iterator()
                                               .next()
                                               .getAuthority();

        System.out.println(employeeNo + " " + employAuthority);

        return issueTokens(employeeNo, employAuthority);
    }

    public TokenDto issueTokens(String memberNo, String role) {
        TokenDto tokenDto = jwtTokenProvider.createToken(memberNo, role);
        redisService.saveRefreshToken("member:" + memberNo + ":refreshToken",
            tokenDto.getRefreshToken());
        return tokenDto;
    }

    public int isInitLoginUser() {

        if (SecurityUtil.getPhone()
                        .isEmpty()) {
            System.out.println(SecurityUtil.getPhone());
            return 1;
        }
        return 0;
    }

    public EmployeeInfo findEmployeeInfoUseSCH() {

        Integer id = SecurityUtil.getLoginId()
                                 .get();
        MemberEntity employeeEntity = memberRepository.findById(id)
                                                      .get();

        EmployeeInfo employeeInfo = EmployeeInfo.builder()
                                                .id(employeeEntity.getId())
                                                .username(employeeEntity.getUsername())
                                                .name(employeeEntity.getName())
                                                .phone(employeeEntity.getPhone())
                                                .role(employeeEntity.getRole()
                                                                    .name())
                                                .imageUrl(employeeEntity.getImageUrl())
                                                .build();

        return employeeInfo;
    }

    public Optional<String> reissueAccessToken(String refreshToken) {

        String memberNo = jwtTokenProvider.getClaimsFromRefreshToken(refreshToken)
                                          .get("memberNo")
                                          .toString();

        Role memberRole = memberRepository.findByUsername(memberNo)
                                          .get()
                                          .getRole();

        String accessTokenValue = jwtTokenProvider.createAccessToken(memberNo, memberRole.name());

        return Optional.ofNullable(accessTokenValue);
    }
}
