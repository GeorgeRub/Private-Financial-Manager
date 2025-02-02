package com.example.backjava.controllers;

import com.example.backjava.entity.Currency;
import com.example.backjava.service.curency.CurrencyService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/currency")
@CrossOrigin(origins = "*")
@AllArgsConstructor
@Slf4j
public class CurrencyController {

    private final CurrencyService currencyService;

    /**
     * Retrieves a list of all currencies.
     *
     * @return a list of all currencies
     */
    @GetMapping
    public ResponseEntity<List<Currency>> getCurrencies() {
        List<Currency> currencies = currencyService.getCurrencies(); // Replace with your actual service method>

        if (currencies == null || currencies.isEmpty()) {
            Currency currency = new Currency();
            currency.setCurrencyName("Canadian Dollar");
            currency.setShortCurrencyName("CAD");
            currency = currencyService.addCurrency(currency);
            if(currencies == null) currencies = new ArrayList<>();
            currencies.add(currency);
        }

        return ResponseEntity.ok(currencies);
    }

    /**
     * Adds a new currency.
     *
     * @param currency the currency to add
     * @return the newly added currency
     */
    @PostMapping
    public ResponseEntity<Currency> addCurrency(@RequestBody Currency currency) {
        Currency createdCurrency = currencyService.addCurrency(currency);
        log.info("New currency added: {} with id: {}", createdCurrency.getCurrencyName(), createdCurrency.getId());
        return ResponseEntity.ok(currencyService.addCurrency(createdCurrency));
    }

}
