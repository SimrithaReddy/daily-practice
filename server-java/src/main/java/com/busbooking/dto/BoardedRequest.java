package com.busbooking.dto;

/**
 * DTO for boarding status update request.
 */
public class BoardedRequest {

    private boolean boarded;

    public BoardedRequest() {
    }

    public BoardedRequest(boolean boarded) {
        this.boarded = boarded;
    }

    public boolean isBoarded() {
        return boarded;
    }

    public void setBoarded(boolean boarded) {
        this.boarded = boarded;
    }
}
