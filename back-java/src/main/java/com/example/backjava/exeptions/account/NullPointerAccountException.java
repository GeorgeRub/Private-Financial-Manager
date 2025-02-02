package com.example.backjava.exeptions.account;

public class NullPointerAccountException extends RuntimeException {
    public NullPointerAccountException(String message) {
        super(message);
    }
}
