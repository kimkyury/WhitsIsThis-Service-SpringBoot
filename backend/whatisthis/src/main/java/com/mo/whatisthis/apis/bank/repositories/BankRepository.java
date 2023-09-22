package com.mo.whatisthis.apis.bank.repositories;

import com.mo.whatisthis.apis.bank.entities.BankEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankRepository extends JpaRepository<BankEntity, String> {
    
}
