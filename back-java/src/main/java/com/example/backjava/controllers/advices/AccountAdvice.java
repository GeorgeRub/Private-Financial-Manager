package com.example.backjava.controllers.advices;

import com.example.backjava.exeptions.account.NullPointerAccountException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class AccountAdvice extends ResponseEntityExceptionHandler {


    /**
     * Handles NullPointerAccountException by returning a ResponseEntity with an internal server error status.
     *
     * @param e       the exception thrown when a null account is encountered
     * @param request the current web request
     * @return a ResponseEntity with details of the exception and an internal server error status
     */
    @ExceptionHandler(NullPointerAccountException.class)
    public ResponseEntity<Object> nullPointerAccountException(
            NullPointerAccountException e,
            WebRequest request) {
        return handleExceptionInternal(e, e.getMessage(),
                new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

}
