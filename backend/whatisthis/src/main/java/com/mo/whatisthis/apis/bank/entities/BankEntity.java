package com.mo.whatisthis.apis.bank.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "banks")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BankEntity {

    @Id
    private String code;

    private String name;

    private String englishName;
}
