package com.mo.whatisthis.apis.bank.repositories;

import com.mo.whatisthis.apis.bank.entities.BankEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankRepository extends JpaRepository<BankEntity, String> {

    List<BankEntity> findAllByCodeIn(List<String> codes);
}
