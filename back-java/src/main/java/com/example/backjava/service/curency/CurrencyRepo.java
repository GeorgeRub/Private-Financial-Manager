package com.example.backjava.service.curency;

import com.example.backjava.entity.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrencyRepo extends JpaRepository<Currency, Integer> {

    Optional<Currency> findByShortCurrencyName(String shortCurrencyName);

}
