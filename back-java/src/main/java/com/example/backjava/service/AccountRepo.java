package com.example.backjava.service;

import com.example.backjava.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {
    List<Account> findByKeycloakUserId(String keycloakUserId);


    Optional<Account> findByIdAndKeycloakUserId(Integer id, String keycloakUserId);
}
