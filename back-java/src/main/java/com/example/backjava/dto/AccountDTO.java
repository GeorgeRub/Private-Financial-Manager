package com.example.backjava.dto;

public record AccountDTO(Integer id,
                         String accountName,
                         String shortName,
                         String description,
                         String currency,
                         Double amount) {

}
