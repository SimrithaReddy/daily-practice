package com.busbooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

/**
 * Domain model representing a bus seat booking.
 */
public class Booking {

    private String bookingId;
    private String travelDate;
    private String mobileNumber;
    private List<String> seats = new ArrayList<>();
    private boolean boarded;
    private String createdAt;
    private String updatedAt;

    @JsonIgnore
    private int maxRow;

    @JsonIgnore
    private int minRow;

    @JsonProperty("sequence")
    private Integer sequence;

    public Booking() {
    }

    public Booking(String bookingId, String travelDate, String mobileNumber, List<String> seats) {
        this.bookingId = bookingId;
        this.travelDate = travelDate;
        this.mobileNumber = mobileNumber;
        this.seats = seats != null ? new ArrayList<>(seats) : new ArrayList<>();
        this.boarded = false;
    }

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(String travelDate) {
        this.travelDate = travelDate;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats != null ? new ArrayList<>(seats) : new ArrayList<>();
    }

    public boolean isBoard() {
        return boarded;
    }

    @JsonProperty("boarded")
    public boolean isBoarded() {
        return boarded;
    }

    public void setBoarded(boolean boarded) {
        this.boarded = boarded;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public int getMaxRow() {
        return maxRow;
    }

    public void setMaxRow(int maxRow) {
        this.maxRow = maxRow;
    }

    public int getMinRow() {
        return minRow;
    }

    public void setMinRow(int minRow) {
        this.minRow = minRow;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }
}
