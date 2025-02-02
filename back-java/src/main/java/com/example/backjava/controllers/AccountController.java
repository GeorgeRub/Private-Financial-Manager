package com.example.backjava.controllers;

import com.example.backjava.dto.AccountDTO;
import com.example.backjava.dto.AccountOTD;
import com.example.backjava.dto.AccountShortDTO;
import com.example.backjava.dto.mapping.impl.AccountMapperImpl;
import com.example.backjava.entity.Account;
import com.example.backjava.service.AccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/account")
@AllArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class AccountController {

    private final AccountService accountService;
    private final AccountMapperImpl accountMapper;


    @GetMapping
    @PreAuthorize("hasRole('ROLE_pfm-user')")
    public ResponseEntity<List<AccountShortDTO>> accountList(Principal principal) {
        List<Account> accounts = accountService.accountList(principal);
        if (accounts.isEmpty()) {
            log.warn("Account list is empty for user {}", principal.getName());
            return ResponseEntity.noContent().build();
        }
        log.info("accountList size {} for user {}", accounts.size(), principal.getName());
        List<AccountShortDTO> accountShortDTOS = accounts
                .stream()
                .map(accountMapper::toAccountShortDTO).toList();
        log.info("accountShortDTOS size {}", accountShortDTOS.size());
        return ResponseEntity.ok(accountShortDTOS);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_pfm-user')")
    @RequestMapping("/{id}")
    public ResponseEntity<AccountDTO> account(Principal principal, @PathVariable Integer id) {
        Optional<Account> account = accountService.getAccount(id, principal.getName());
        return account.map(value -> ResponseEntity.ok(accountMapper.toAccountDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_pfm-user')")
    public ResponseEntity<AccountShortDTO> addAccount(@RequestBody AccountOTD accountOTD, Principal principal) {
        Account account = accountMapper.toAccount(accountOTD, principal);
        account = accountService.addAccount(account, principal);
        if (account == null) {
            log.warn("Account is null for user {}", principal.getName());
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok(accountMapper.toAccountShortDTO(account));
    }

}
