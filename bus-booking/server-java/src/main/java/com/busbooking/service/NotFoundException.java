package com.busbooking.service;

/**
 * Exception for resource not found (404).
 */
public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}
