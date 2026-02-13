package com.busbooking.controller;

import com.busbooking.dto.BoardedRequest;
import com.busbooking.dto.BookingRequest;
import com.busbooking.dto.ErrorResponse;
import com.busbooking.model.Booking;
import com.busbooking.service.BookingService;
import com.busbooking.service.NotFoundException;
import com.busbooking.service.ValidationException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for booking API endpoints.
 * Mirrors the Node.js API for compatibility with the React frontend.
 */
@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/bookings/{date}")
    public List<Booking> getBookingsByDate(@PathVariable String date) {
        return bookingService.getBookingsByDate(date);
    }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createOrUpdateBooking(@Valid @RequestBody BookingRequest request) {
        Booking booking = bookingService.createOrUpdateBooking(request);
        return ResponseEntity.ok(booking);
    }

    @PatchMapping("/bookings/{bookingId}/boarded")
    public ResponseEntity<Booking> updateBoardingStatus(
            @PathVariable String bookingId,
            @RequestBody BoardedRequest request) {
        Booking booking = bookingService.updateBoardingStatus(bookingId, request.isBoarded());
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/bookings/{date}/boarding-sequence")
    public List<Booking> getBoardingSequence(@PathVariable String date) {
        return bookingService.getOptimalBoardingSequence(date);
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
                "status", "OK",
                "message", "Bus Booking API is running"
        );
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleBeanValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(e -> e.getDefaultMessage())
                .findFirst()
                .orElse("Validation failed");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(message));
    }
}
