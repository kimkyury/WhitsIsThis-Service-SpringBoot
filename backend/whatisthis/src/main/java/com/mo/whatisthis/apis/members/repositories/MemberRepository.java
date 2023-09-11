package com.mo.whatisthis.apis.members.repositories;

import com.mo.whatisthis.apis.members.entities.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

}
