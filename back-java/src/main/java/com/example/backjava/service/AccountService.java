package com.example.backjava.service;

import com.example.backjava.entity.Account;
import com.example.backjava.exeptions.account.NullPointerAccountException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;


/**
 * Service for accounts.
 *
 * @author Heorhii Rublov
 * @email rublev.georgij@gmail.com
 */
@Service
@AllArgsConstructor
@Slf4j
public class AccountService {

    private final AccountRepo accountRepo;

    public List<Account> accountList(Principal principal) {
        if(principal == null) throw new NullPointerAccountException("No principal");
        log.info("accountList");
        log.info(principal.getName());
        return accountRepo.findByKeycloakUserId(principal.getName());
    }

    public Account addAccount(Account account, Principal principal) {
        account.setKeycloakUserId(principal.getName());
        return accountRepo.save(account);
    }

    public Optional<Account> getAccount(Integer id, String name) {
        return accountRepo.findByIdAndKeycloakUserId(id, name);
    }
}
