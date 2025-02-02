package com.example.backjava.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "records")
public class Records {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_records_id_gen")
    @SequenceGenerator(name = "account_records_id_gen", sequenceName = "account_records_id_gen", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;



}
