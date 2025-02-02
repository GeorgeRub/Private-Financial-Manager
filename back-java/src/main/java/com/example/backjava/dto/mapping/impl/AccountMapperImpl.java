package com.example.backjava.dto.mapping.impl;

import com.example.backjava.dto.AccountDTO;
import com.example.backjava.dto.AccountOTD;
import com.example.backjava.dto.AccountShortDTO;
import com.example.backjava.dto.mapping.AccountMapper;
import com.example.backjava.entity.Account;
import com.example.backjava.entity.Currency;
import com.example.backjava.exeptions.account.IncorrectRequest;
import com.example.backjava.exeptions.account.NullPointerAccountException;
import com.example.backjava.service.curency.CurrencyService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Implementation of the {@link AccountMapper} interface.
 *
 * <p>This class provides methods for mapping {@link Account} objects to and from
 * DTOs. It uses the {@link CurrencyService} to retrieve the currency for an
 * account's currency ID.</p>
 *
 * <p>Exceptions:
 * <ul>
 *     <li>{@link NullPointerAccountException} - if an {@link Account} is null</li>
 *     <li>{@link IncorrectRequest} - if an account's currency ID is null or empty</li>
 * </ul>
 * </p>
 *
 * @author Heorhii Rublov
 * @email reblev.georgij@gmail.com
 */


@Component
@Slf4j
@AllArgsConstructor
public class AccountMapperImpl implements AccountMapper {

    private final CurrencyService currencyService;

    @Override
    public AccountShortDTO toAccountShortDTO(Account account) throws NullPointerAccountException {
        if (account == null) {
            throw new NullPointerAccountException("Account is null");
        }
        return new AccountShortDTO(account.getId(),
                account.getShortName(),
                account.getCurrency().getShortCurrencyName(),
                account.getAmount());
    }

    @Override
    public AccountDTO toAccountDTO(Account account) throws NullPointerAccountException {
        if (account == null) {
            throw new NullPointerAccountException("Account is null");
        }
        return new AccountDTO(account.getId(),
                account.getName(),
                account.getShortName(),
                account.getDescription(),
                account.getCurrency().getShortCurrencyName(),
                account.getAmount());
    }

    @Override
    public Account toAccount(AccountOTD accountOTD, Principal principal) {
        Optional<Currency> currency = currencyService.findByShortCurrencyName(accountOTD.getCurrency());
        if (currency.isEmpty()) throw new IncorrectRequest("Currency not found");

        extracted(accountOTD);

        Account account = new Account();
        account.setName(accountOTD.getName());
        account.setShortName(accountOTD.getShortName());
        account.setKeycloakUserId(principal.getName());
        account.setCurrency(currency.get());
        if (accountOTD.getAmount() == null) {
            account.setAmount(0.0);
        } else {
            account.setAmount(accountOTD.getAmount());
        }
        if (accountOTD.getDescription() != null) account.setDescription(accountOTD.getDescription());
        return account;
    }

    private static void extracted(AccountOTD accountOTD) throws IncorrectRequest {
        Map<String, String> errorMap = getStringStringMap(accountOTD);

        if (!errorMap.isEmpty()) {
            StringBuilder stringBuilder = new StringBuilder();
            for (Map.Entry<String, String> entry : errorMap.entrySet()) {
                stringBuilder.append(entry.getKey()).append(": ").append(entry.getValue()).append("\n");
            }
            throw new IncorrectRequest(stringBuilder.toString());
        }
    }

    private static Map<String, String> getStringStringMap(AccountOTD accountOTD) {
        Map<String, String> errorMap = new HashMap<>();

        if (accountOTD.getName() == null || accountOTD.getName().isEmpty()) {
            errorMap.put("name", "Account name is null");
        }

        if (accountOTD.getShortName() == null || accountOTD.getShortName().isEmpty()) {
            errorMap.put("shortName", "Account short name is null");
        }

        if (accountOTD.getCurrency() == null || accountOTD.getCurrency().isEmpty()) {
            errorMap.put("currency", "Account currency is null");
        }
        return errorMap;
    }
}
