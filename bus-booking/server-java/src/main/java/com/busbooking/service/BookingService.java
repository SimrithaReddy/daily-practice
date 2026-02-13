package com.busbooking.service;

import com.busbooking.dto.BookingRequest;
import com.busbooking.model.Booking;
import com.busbooking.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Service layer for booking business logic and validation.
 */
@Service
public class BookingService {

    private static final int MAX_SEATS_PER_MOBILE_PER_DAY = 6;
    private static final String SEAT_PATTERN = "^[AB]([1-9]|1[0-5])$";

    private final BookingRepository repository;

    public BookingService(BookingRepository repository) {
        this.repository = repository;
    }

    public List<Booking> getAllBookings() {
        return repository.findAll();
    }

    public List<Booking> getBookingsByDate(String date) {
        return repository.findByTravelDate(date);
    }

    public List<Booking> getOptimalBoardingSequence(String date) {
        List<Booking> bookings = repository.findByTravelDate(date);
        return calculateOptimalSequence(bookings);
    }

    public Booking createOrUpdateBooking(BookingRequest request) {
        validateSeats(request.getSeats());
        validatePastDate(request.getTravelDate());
        validateSeatAvailability(request);

        return repository.findByTravelDateAndMobile(request.getTravelDate(), request.getMobileNumber())
                .map(existing -> updateExistingBooking(existing, request))
                .orElseGet(() -> createNewBooking(request));
    }

    public Booking updateBoardingStatus(String bookingId, boolean boarded) {
        return repository.findByBookingId(bookingId)
                .map(booking -> {
                    booking.setBoarded(boarded);
                    booking.setUpdatedAt(BookingRepository.now());
                    return repository.save(booking);
                })
                .orElseThrow(() -> new NotFoundException("Booking not found"));
    }

    private void validateSeats(List<String> seats) {
        for (String seat : seats) {
            if (!seat.matches(SEAT_PATTERN)) {
                throw new ValidationException("Invalid seat format: " + seat);
            }
        }
    }

    private void validatePastDate(String travelDate) {
        LocalDate date = LocalDate.parse(travelDate);
        if (date.isBefore(LocalDate.now())) {
            throw new ValidationException("Cannot book for past dates");
        }
    }

    private void validateSeatAvailability(BookingRequest request) {
        List<Booking> bookingsForDate = repository.findByTravelDate(request.getTravelDate());
        Booking existing = repository.findByTravelDateAndMobile(request.getTravelDate(), request.getMobileNumber()).orElse(null);

        Set<String> bookedSeats = bookingsForDate.stream()
                .filter(b -> existing == null || !b.getBookingId().equals(existing.getBookingId()))
                .flatMap(b -> b.getSeats().stream())
                .collect(Collectors.toSet());

        List<String> conflicting = request.getSeats().stream()
                .filter(bookedSeats::contains)
                .toList();
        if (!conflicting.isEmpty()) {
            throw new ValidationException("Seats already booked: " + String.join(", ", conflicting));
        }

        long seatsForMobile = bookingsForDate.stream()
                .filter(b -> request.getMobileNumber().equals(b.getMobileNumber()))
                .filter(b -> existing == null || !b.getBookingId().equals(existing.getBookingId()))
                .flatMap(b -> b.getSeats().stream())
                .count();

        if (seatsForMobile + request.getSeats().size() > MAX_SEATS_PER_MOBILE_PER_DAY) {
            throw new ValidationException("Maximum 6 seats can be booked per mobile number per day");
        }
    }

    private Booking updateExistingBooking(Booking existing, BookingRequest request) {
        List<String> sortedSeats = request.getSeats().stream().sorted().toList();
        existing.setSeats(sortedSeats);
        existing.setUpdatedAt(BookingRepository.now());
        return repository.save(existing);
    }

    private Booking createNewBooking(BookingRequest request) {
        List<String> sortedSeats = request.getSeats().stream().sorted().toList();
        String now = BookingRepository.now();

        Booking booking = new Booking(
                BookingRepository.generateBookingId(),
                request.getTravelDate(),
                request.getMobileNumber(),
                sortedSeats
        );
        booking.setCreatedAt(now);
        booking.setUpdatedAt(now);
        booking.setBoarded(false);

        return repository.save(booking);
    }

    /**
     * Optimal boarding sequence: board from farthest seat to nearest (back to front).
     * This minimizes blocking since passengers at back seats don't block front seat access.
     */
    private List<Booking> calculateOptimalSequence(List<Booking> bookings) {
        List<Booking> result = bookings.stream()
                .map(b -> {
                    Booking copy = copyBooking(b);
                    int maxRow = b.getSeats().stream()
                            .mapToInt(this::getSeatRow)
                            .max().orElse(0);
                    int minRow = b.getSeats().stream()
                            .mapToInt(this::getSeatRow)
                            .min().orElse(0);
                    copy.setMaxRow(maxRow);
                    copy.setMinRow(minRow);
                    return copy;
                })
                .sorted((a, b) -> {
                    if (b.getMaxRow() != a.getMaxRow()) {
                        return Integer.compare(b.getMaxRow(), a.getMaxRow());
                    }
                    return Integer.compare(b.getMinRow(), a.getMinRow());
                })
                .toList();

        for (int i = 0; i < result.size(); i++) {
            result.get(i).setSequence(i + 1);
        }
        return result;
    }

    private int getSeatRow(String seat) {
        return Integer.parseInt(seat.substring(1));
    }

    private Booking copyBooking(Booking source) {
        Booking copy = new Booking();
        copy.setBookingId(source.getBookingId());
        copy.setTravelDate(source.getTravelDate());
        copy.setMobileNumber(source.getMobileNumber());
        copy.setSeats(source.getSeats());
        copy.setBoarded(source.isBoarded());
        copy.setCreatedAt(source.getCreatedAt());
        copy.setUpdatedAt(source.getUpdatedAt());
        return copy;
    }
}
