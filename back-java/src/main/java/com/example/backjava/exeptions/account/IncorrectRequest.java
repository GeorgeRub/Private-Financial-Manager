package com.example.backjava.exeptions.account;

public class IncorrectRequest extends RuntimeException {
    public IncorrectRequest(String message) {
        super(message);
    }
}
