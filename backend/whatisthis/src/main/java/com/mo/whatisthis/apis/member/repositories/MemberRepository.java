package com.mo.whatisthis.apis.member.repositories;

import com.mo.whatisthis.apis.member.entities.MemberEntity;
import com.mo.whatisthis.apis.member.entities.MemberEntity.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {

    Optional<MemberEntity> findByUsername(String username);

    Optional<MemberEntity> findTopByRoleOrderByUsernameDesc(Role role);
}
