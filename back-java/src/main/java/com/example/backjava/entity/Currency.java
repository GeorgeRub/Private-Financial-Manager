package com.example.backjava.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

/**
 * Represents a currency entity used in the application.
 *
 * <p>This class is mapped to a database table using JPA annotations. It
 * includes fields for currency ID, full currency name, and short currency name.
 * The currency ID is auto-generated using a sequence strategy.</p>
 *
 * <p>Fields:</p>
 * <ul>
 *   <li>id - Unique identifier for the currency, generated using a sequence.</li>
 *   <li>currencyName - The full name of the currency, with a maximum length of 25 characters.</li>
 *   <li>shortCurrencyName - The abbreviated name of the currency, with a maximum length of 3 characters.</li>
 *   <li>created - The date and time when the currency was created.</li>
 *   <li>updated - The date and time when the currency was last updated.</li>
 * </ul>
 */

@Entity
@Data
public class Currency {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "currency_id_gen")
    @SequenceGenerator(name = "currency_id_gen", sequenceName = "currency_id_gen", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Integer id;

    /**
     * This field represents the full name of the currency.
     * size: 25
     */
    @Column(name = "currency_name", nullable = false, length = 25)
    private String currencyName;


    /**
     * Short currency name shows the international short currency name.
     * size: 3
     */
    @Column(name = "short_currency_name", nullable = false, length = 3)
    private String shortCurrencyName;

    @Column(name = "created", nullable = false)
    public Date created;

    @Column(name = "updated", nullable = false)
    public Date updated;

}
