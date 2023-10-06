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

    public List<BankResponse> getAssignedBanks() {
        List<BankResponse> bankResponses = new ArrayList<>();

        for (BankEntity bankEntity : bankRepository.findAllByCodeIn(
            List.of(
                "39",  // 경남은행
                "34",  // 광주은행
                "06",  // KB국민은행
                "03",  // IBK기업은행
                "11",  // NH농협은행
                "31",  // DGB대구은행
                "32",  // 부산은행
                "45",  // 새마을금고
                "07",  // Sh수협은행
                "88",  // 신한은행
                "20",  // 우리은행
                "71",  // 우체국예금보험
                "37",  // 전북은행
                "81"   // 하나은행
            ))) {
            BankResponse bankResponse = new BankResponse();
            bankResponse.of(bankEntity);

            bankResponses.add(bankResponse);
        }

        return bankResponses;
    }
}
