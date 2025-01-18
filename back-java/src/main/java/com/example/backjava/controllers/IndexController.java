package com.example.backjava.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/index")
@CrossOrigin(origins = "*")
public class IndexController {

    @GetMapping
    @PreAuthorize("hasRole('ROLE_pfm-user')")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("Hello World");
    }

}
