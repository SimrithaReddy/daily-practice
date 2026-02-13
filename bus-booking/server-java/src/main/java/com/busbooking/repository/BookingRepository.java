package com.busbooking.repository;

import com.busbooking.model.Booking;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository for booking persistence using JSON file storage.
 */
@Repository
public class BookingRepository {

    @Value("${bus-booking.data-file:data/bookings.json}")
    private String dataFilePath;

    private final ObjectMapper objectMapper = new ObjectMapper()
            .enable(SerializationFeature.INDENT_OUTPUT);

    private Path resolveDataFile() {
        Path path = Paths.get(dataFilePath);
        if (!path.isAbsolute()) {
            path = Paths.get(System.getProperty("user.dir"), dataFilePath);
        }
        return path;
    }

    @PostConstruct
    public void init() throws IOException {
        Path path = resolveDataFile();
        Path parent = path.getParent();
        if (parent != null && !Files.exists(parent)) {
            Files.createDirectories(parent);
        }
        if (!Files.exists(path)) {
            Files.write(path, "[]".getBytes());
        }
    }

    public List<Booking> findAll() {
        try {
            File file = resolveDataFile().toFile();
            return objectMapper.readValue(file, new TypeReference<List<Booking>>() {});
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    public List<Booking> findByTravelDate(String date) {
        return findAll().stream()
                .filter(b -> date.equals(b.getTravelDate()))
                .toList();
    }

    public Optional<Booking> findByBookingId(String bookingId) {
        return findAll().stream()
                .filter(b -> bookingId.equals(b.getBookingId()))
                .findFirst();
    }

    public Optional<Booking> findByTravelDateAndMobile(String travelDate, String mobileNumber) {
        return findAll().stream()
                .filter(b -> travelDate.equals(b.getTravelDate()) && mobileNumber.equals(b.getMobileNumber()))
                .findFirst();
    }

    public Booking save(Booking booking) {
        List<Booking> bookings = new ArrayList<>(findAll());
        int index = -1;
        for (int i = 0; i < bookings.size(); i++) {
            if (booking.getBookingId().equals(bookings.get(i).getBookingId())) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            bookings.set(index, booking);
        } else {
            bookings.add(booking);
        }
        writeAll(bookings);
        return booking;
    }

    public void writeAll(List<Booking> bookings) {
        try {
            objectMapper.writeValue(resolveDataFile().toFile(), bookings);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save bookings", e);
        }
    }

    public static String generateBookingId() {
        return UUID.randomUUID().toString();
    }

    public static String now() {
        return Instant.now().toString();
    }
}
