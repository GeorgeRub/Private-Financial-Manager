package com.example.backjava.dto;

public record AccountShortDTO(Integer id,
                              String accountName,
                              String currency,
                              Double amount) {

}
