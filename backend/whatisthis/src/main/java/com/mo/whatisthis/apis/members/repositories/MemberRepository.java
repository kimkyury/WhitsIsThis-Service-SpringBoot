package com.mo.whatisthis.apis.members.repositories;

import com.mo.whatisthis.apis.members.entities.MemberEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {

    Optional<MemberEntity> findById(Integer id);

    Optional<MemberEntity> findByUsername(String username);

    Optional<MemberEntity> findTopByRoleOrderByUsernameDesc(String role);
}
