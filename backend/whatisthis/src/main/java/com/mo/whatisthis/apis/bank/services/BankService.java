package com.mo.whatisthis.apis.bank.services;

import com.mo.whatisthis.apis.bank.entities.BankEntity;
import com.mo.whatisthis.apis.bank.repositories.BankRepository;
import com.mo.whatisthis.apis.bank.responses.BankResponse;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BankService {

    private final BankRepository bankRepository;

    public List<BankResponse> getBanks() {
        List<BankResponse> bankResponses = new ArrayList<>();

        for (BankEntity bankEntity : bankRepository.findAll()) {
            BankResponse bankResponse = new BankResponse();
            bankResponse.of(bankEntity);

            bankResponses.add(bankResponse);
        }

        return bankResponses;
    }
}
