package com.mo.whatisthis.apis.auth.services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.mo.whatisthis.apis.auth.requests.DeviceLoginRequest;
import com.mo.whatisthis.apis.auth.requests.EmployeeLoginRequest;
import com.mo.whatisthis.apis.auth.requests.SendAuthMessageRequest;
import com.mo.whatisthis.apis.auth.requests.VerifyAuthCodeRequest;
import com.mo.whatisthis.apis.auth.responses.EmployeeLoginResponse.EmployeeInfo;
import com.mo.whatisthis.apis.member.entities.MemberEntity;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import com.mo.whatisthis.apis.member.repositories.MemberRepository;
import com.mo.whatisthis.exception.CustomException;
import com.mo.whatisthis.jwt.dtos.TokenDto;
import com.mo.whatisthis.jwt.services.JwtTokenProvider;
import com.mo.whatisthis.redis.services.RedisService;
import com.mo.whatisthis.security.utils.SecurityUtil;
import com.mo.whatisthis.sms.requests.SmsRequest;
import com.mo.whatisthis.sms.requests.SmsRequest.MessageDto;
import com.mo.whatisthis.sms.responses.SmsResponse;
import com.mo.whatisthis.sms.services.NaverSmsService;
import com.mo.whatisthis.supports.codes.ErrorCode;
import com.mo.whatisthis.supports.utils.AWSS3ResponseUtil;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.Random;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisService redisService;
    private final MemberRepository memberRepository;
    private final NaverSmsService naverSmsService;
    private final AWSS3ResponseUtil awss3ResponseUtil;
    private final PasswordEncoder passwordEncoder;

    public TokenDto loginEmployee(EmployeeLoginRequest employeeLoginRequest) {

        MemberEntity memberEntity = memberRepository.findByUsername(
            employeeLoginRequest.getUsername())
                                                    .orElseThrow(
                                                        () -> new CustomException(
                                                            ErrorCode.USERNAME_INVALID)
                                                    );

        if (!passwordEncoder.matches(employeeLoginRequest.getPassword(),
            memberEntity.getPassword())) {
            throw new CustomException(ErrorCode.PASSWORD_INVALID);
        }

        // 인증 정보를 가진 인스턴스 생성
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(
                employeeLoginRequest.getUsername(), employeeLoginRequest.getPassword());

        // DB에 존재하는지 확인, 성공할시 사용자의 세부 정보과 권한 정보를 갖고 있음
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

    public String loginDevice(DeviceLoginRequest deviceLoginRequest) {

        String serialNumber = deviceLoginRequest.getSerialNumber();
        // 1. Redis에 존재하는가
        if (redisService.getValue("device:" + serialNumber) == null) {
            throw new CustomException(ErrorCode.SERIALNUMBER_INVALID);
        }

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(
                serialNumber, "TURTLE");

        Authentication authentication = authenticationManagerBuilder.getObject()
                                                                    .authenticate(
                                                                        authenticationToken);

        String deviceAuthority = authentication.getAuthorities()
                                               .iterator()
                                               .next()
                                               .getAuthority();

        String accessToken = jwtTokenProvider.createAccessToken(serialNumber, deviceAuthority);

        return accessToken;
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
                                                .username(employeeEntity.getUsername())
                                                .name(employeeEntity.getName())
                                                .phone(employeeEntity.getPhone())
                                                .role(employeeEntity.getRole()
                                                                    .name())
                                                .imageUrl(awss3ResponseUtil.concatURL(
                                                    employeeEntity.getImageUrl()))
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

    public SmsResponse sendMessageProcedure(SendAuthMessageRequest sendAuthMessageRequest) {

        String authCode = createAuthCode();

        redisService.saveDataWithTimeout(sendAuthMessageRequest.getPhone(), authCode, (long) 500);

        String authMessageContent = "[이게MO징] 인증번호 : " + authCode;

        MessageDto authMessageDto = naverSmsService.makeMessageDto(
            sendAuthMessageRequest.getPhone(), authMessageContent);

        SmsRequest authSmsRequest = naverSmsService.makeSmsRequest(authMessageDto);

        try {
            return naverSmsService.sendSmsRequest(authSmsRequest);
        } catch (URISyntaxException | JsonProcessingException e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException | InvalidKeyException e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public static String createAuthCode() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 6자리
            key.append((rnd.nextInt(10)));
        }

        return key.toString();
    }

    public void confirmAuthCode(HttpServletRequest request,
        VerifyAuthCodeRequest verifyAuthCodeRequest) {

        String inputAuthCodeKey = (String) request.getSession()
                                                  .getAttribute("phone");

        System.out.println("phone>>>>>" + inputAuthCodeKey);
        String inputAuthCodeValue = verifyAuthCodeRequest.getAuthCode();

        String redisAuthCodeValue = redisService.getValue(inputAuthCodeKey);

        if (redisAuthCodeValue.isEmpty()) {
            throw new CustomException(ErrorCode.PHONE_INVALID);
        }

        if (!inputAuthCodeValue.equals(redisAuthCodeValue)) {
            throw new CustomException(ErrorCode.AUTHCODE_INVALID);
        }

        redisService.deleteValue(inputAuthCodeKey);
    }

    public void logout(String requestAccessToken) {

        String username = SecurityUtil.getUsername()
                                      .get();
        String refreshTokenKey = redisService.getRefreshTokenKey(username);

        redisService.deleteValue(refreshTokenKey);
        redisService.saveDataWithTimeout(requestAccessToken.substring(7), "blockAccessToken",
            (long) 900);
    }


    public void setSessionExpiryDuration(HttpServletRequest request,
        VerifyAuthCodeRequest verifyAuthCodeRequest) {

        String sessionId = request.getSession()
                                  .getId();
        String phone = (String) request.getSession()
                                       .getAttribute("phone");

        redisService.saveCustomerSession(sessionId, phone);
    }

    public void setSessionPhone(HttpServletRequest request,
        SendAuthMessageRequest sendAuthMessageRequest) {

        String phone = sendAuthMessageRequest.getPhone();
        request.getSession()
               .setAttribute("phone", phone);
    }
}
