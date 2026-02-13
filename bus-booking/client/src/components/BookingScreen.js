import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/api';
import { generateSeatLayout, validateMobileNumber } from '../utils/seatUtils';
import ConfirmationModal from './ConfirmationModal';
import './BookingScreen.css';

const BookingScreen = () => {
  const [travelDate, setTravelDate] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(new Set());
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [existingBooking, setExistingBooking] = useState(null);

  const seats = generateSeatLayout();
  const MAX_SEATS = 6;

  // Set minimum date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTravelDate(today);
  }, []);

  // Load booked seats when date changes
  useEffect(() => {
    if (travelDate) {
      loadBookedSeats();
    }
  }, [travelDate]);

  // Check for existing booking when mobile and date change
  useEffect(() => {
    if (travelDate && mobileNumber && validateMobileNumber(mobileNumber)) {
      checkExistingBooking();
    } else {
      setExistingBooking(null);
    }
  }, [travelDate, mobileNumber]);

  const loadBookedSeats = async () => {
    try {
      const bookings = await bookingService.getBookingsByDate(travelDate);
      const booked = new Set();
      bookings.forEach(booking => {
        // Exclude current booking if updating
        if (existingBooking && booking.bookingId === existingBooking.bookingId) {
          return;
        }
        booking.seats.forEach(seat => booked.add(seat));
      });
      setBookedSeats(booked);
    } catch (error) {
      console.error('Error loading booked seats:', error);
    }
  };

  const checkExistingBooking = async () => {
    try {
      const bookings = await bookingService.getBookingsByDate(travelDate);
      const existing = bookings.find(b => b.mobileNumber === mobileNumber);
      if (existing) {
        setExistingBooking(existing);
        setSelectedSeats([...existing.seats]);
      } else {
        setExistingBooking(null);
        setSelectedSeats([]);
      }
    } catch (error) {
      console.error('Error checking existing booking:', error);
    }
  };

  const handleSeatClick = (seat) => {
    if (bookedSeats.has(seat) && !selectedSeats.includes(seat)) {
      return; // Cannot select already booked seat
    }

    setError({});

    if (selectedSeats.includes(seat)) {
      // Deselect
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      // Select
      if (selectedSeats.length >= MAX_SEATS) {
        setError({ seat: `Maximum ${MAX_SEATS} seats can be selected` });
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
    setError({ mobile: '' });
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setTravelDate(date);
    setSelectedSeats([]);
    setError({});
  };

  const validateForm = () => {
    const errors = {};

    if (!travelDate) {
      errors.date = 'Travel date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(travelDate);
      if (selectedDate < today) {
        errors.date = 'Cannot book for past dates';
      }
    }

    if (!mobileNumber) {
      errors.mobile = 'Mobile number is required';
    } else if (!validateMobileNumber(mobileNumber)) {
      errors.mobile = 'Invalid mobile number. Must be 10 digits starting with 6-9';
    }

    if (selectedSeats.length === 0) {
      errors.seat = 'Please select at least one seat';
    } else if (selectedSeats.length > MAX_SEATS) {
      errors.seat = `Maximum ${MAX_SEATS} seats can be selected`;
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError({});

    try {
      const bookingData = {
        travelDate,
        mobileNumber,
        seats: selectedSeats.sort()
      };

      const result = await bookingService.createOrUpdateBooking(bookingData);
      
      setBookingConfirmation(result);
      setShowModal(true);
      setExistingBooking(result);
      
      // Reload booked seats
      await loadBookedSeats();
      
      // Reset form if new booking
      if (!existingBooking) {
        setMobileNumber('');
        setSelectedSeats([]);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to save booking. Please try again.';
      setError({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedSeats([]);
    setError({});
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getSeatClass = (seat) => {
    let className = 'seat';
    if (selectedSeats.includes(seat)) {
      className += ' selected';
    } else if (bookedSeats.has(seat)) {
      className += ' booked';
    } else {
      className += ' available';
    }
    return className;
  };

  return (
    <div className="booking-screen">
      <div className="booking-container">
        <h2>Book / Update / Edit Booking</h2>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="travelDate">
              Travel Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="travelDate"
              value={travelDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            {error.date && <span className="error-message">{error.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber">
              Mobile Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={handleMobileChange}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              required
            />
            {error.mobile && <span className="error-message">{error.mobile}</span>}
            {existingBooking && (
              <span className="info-message">
                Existing booking found. You can update it by changing seats.
              </span>
            )}
          </div>

          <div className="form-group">
            <label>
              Select Seats <span className="required">*</span>
            </label>
            <div className="seat-selection-info">
              <span>Maximum {MAX_SEATS} seats per mobile number per day</span>
              <span className="selected-count">
                Selected: <strong>{selectedSeats.length}/{MAX_SEATS}</strong>
              </span>
            </div>
            <div className="seat-layout">
              <div className="seat-legend">
                <span className="legend-item">
                  <span className="seat-legend-box available"></span> Available
                </span>
                <span className="legend-item">
                  <span className="seat-legend-box selected"></span> Selected
                </span>
                <span className="legend-item">
                  <span className="seat-legend-box booked"></span> Booked
                </span>
              </div>
              <div className="bus-layout">
                <div className="bus-aisle">
                  <div className="seat-row-label">Row</div>
                </div>
                <div className="seats-container">
                  {Array.from({ length: 15 }, (_, i) => i + 1).map(row => (
                    <div key={row} className="seat-row">
                      <div className="row-number">{row}</div>
                      <div className="seats-row">
                        {['A', 'B'].map(side => {
                          const seat = `${side}${row}`;
                          return (
                            <button
                              key={seat}
                              type="button"
                              className={getSeatClass(seat)}
                              onClick={() => handleSeatClick(seat)}
                              disabled={bookedSeats.has(seat) && !selectedSeats.includes(seat)}
                              title={seat}
                            >
                              {seat}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {error.seat && <span className="error-message">{error.seat}</span>}
          </div>

          {error.submit && (
            <div className="error-message submit-error">{error.submit}</div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processing...' : existingBooking ? 'Update Booking' : 'Book Seats'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
              disabled={loading}
            >
              Clear Selection
            </button>
          </div>
        </form>
      </div>

      {showModal && bookingConfirmation && (
        <ConfirmationModal
          booking={bookingConfirmation}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default BookingScreen;
