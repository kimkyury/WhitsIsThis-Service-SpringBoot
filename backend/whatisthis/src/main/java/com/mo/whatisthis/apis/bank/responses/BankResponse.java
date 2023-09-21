package com.mo.whatisthis.apis.bank.responses;

import com.mo.whatisthis.apis.bank.entities.BankEntity;
import lombok.Getter;

@Getter
public class BankResponse {

    private String code;
    private String name;
    private String englishName;

    public void of(BankEntity bankEntity) {
        this.code = bankEntity.getCode();
        this.name = bankEntity.getName();
        this.englishName = bankEntity.getEnglishName();
    }
}
