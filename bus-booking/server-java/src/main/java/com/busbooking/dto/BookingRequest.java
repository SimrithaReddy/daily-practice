package com.busbooking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * DTO for create/update booking request.
 */
public class BookingRequest {

    @NotBlank(message = "Travel date is required")
    private String travelDate;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid mobile number. Must be 10 digits starting with 6-9")
    private String mobileNumber;

    @NotEmpty(message = "At least one seat must be selected")
    @Size(max = 6, message = "Maximum 6 seats can be booked per mobile number per day")
    private List<String> seats;

    public BookingRequest() {
    }

    public BookingRequest(String travelDate, String mobileNumber, List<String> seats) {
        this.travelDate = travelDate;
        this.mobileNumber = mobileNumber;
        this.seats = seats;
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
        this.seats = seats;
    }
}
