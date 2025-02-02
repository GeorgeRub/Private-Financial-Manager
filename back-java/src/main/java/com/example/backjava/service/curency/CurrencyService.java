package com.example.backjava.service.curency;

import com.example.backjava.entity.Currency;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CurrencyService {

    private final CurrencyRepo currencyRepo;

    /**
     * Retrieve a list of all currencies.
     *
     * @return a list of Currency objects representing all available currencies.
     */
    public List<Currency> getCurrencies() {
        return currencyRepo.findAll();
    }

    /**
     * Add a new currency.
     *
     * @param currency the currency to add.
     * @return the added currency.
     */
    public Currency addCurrency(Currency currency) {
        if(currency.getCreated() == null) currency.setCreated(new Date());
        currency.setUpdated(new Date());
        return currencyRepo.save(currency);
    }

    public Optional<Currency> findByShortCurrencyName(String currency) {
        return currencyRepo.findByShortCurrencyName(currency);
    }
}
