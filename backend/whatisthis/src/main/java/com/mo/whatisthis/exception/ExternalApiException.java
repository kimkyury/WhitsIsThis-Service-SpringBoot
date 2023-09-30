package com.mo.whatisthis.exception;

import org.springframework.http.HttpStatus;

public class ExternalApiException extends RuntimeException {

    private HttpStatus status;

    public ExternalApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    // Getter for the status
    public HttpStatus getStatus() {
        return status;
    }
}
