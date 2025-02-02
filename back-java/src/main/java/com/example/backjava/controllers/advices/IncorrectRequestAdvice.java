package com.example.backjava.controllers.advices;

import com.example.backjava.exeptions.account.IncorrectRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class IncorrectRequestAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IncorrectRequest.class)
    public ResponseEntity<Object> incorrectRequest(IncorrectRequest e,
                                                   WebRequest request) {
        return handleExceptionInternal(e, e.getMessage(),
                new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

}
