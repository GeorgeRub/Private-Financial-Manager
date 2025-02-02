package com.example.backjava.dto.mapping;

import com.example.backjava.dto.AccountDTO;
import com.example.backjava.dto.AccountOTD;
import com.example.backjava.dto.AccountShortDTO;
import com.example.backjava.entity.Account;
import com.example.backjava.exeptions.account.NullPointerAccountException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.security.Principal;

@Mapper(componentModel = "spring", uses = AccountMapper.class)
public interface AccountMapper {

    @Mapping(target = "currency", expression = "java(account.getCurrency().getShortCurrencyName())")
    AccountShortDTO toAccountShortDTO(Account account) throws NullPointerAccountException;

    @Mapping(target = "currency", expression = "java(account.getCurrency().getShortCurrencyName())")
    AccountDTO toAccountDTO(Account account) throws NullPointerAccountException;

    Account toAccount(AccountOTD accountOTD, Principal principal);

}
