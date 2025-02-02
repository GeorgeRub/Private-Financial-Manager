package com.example.backjava.dto;

import lombok.Data;

@Data
public class AccountOTD {

    private String name;
    private String description;
    private String shortName;
    private String currency;
    private Double amount;

}
