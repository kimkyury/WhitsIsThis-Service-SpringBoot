package com.mo.whatisthis.security.service;

import com.mo.whatisthis.apis.member.entities.MemberEntity;
import com.mo.whatisthis.apis.member.repositories.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        MemberEntity memberEntity = memberRepository.findByUsername(username)
            .orElseThrow();

        UserDetailsImpl userDetails = new UserDetailsImpl(memberEntity);
        return userDetails;
    }
}
