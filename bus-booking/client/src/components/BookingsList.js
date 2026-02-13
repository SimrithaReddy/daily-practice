import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/api';
import './BookingsList.css';

const BookingsList = () => {
  const [travelDate, setTravelDate] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTravelDate(today);
  }, []);

  useEffect(() => {
    if (travelDate) {
      loadBookings();
    }
  }, [travelDate]);

  const loadBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const sequenceData = await bookingService.getBoardingSequence(travelDate);
      setBookings(sequenceData);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setError('Failed to load bookings. Please try again.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setTravelDate(e.target.value);
  };

  const handleCall = (mobileNumber) => {
    window.location.href = `tel:${mobileNumber}`;
  };

  const handleBoardingToggle = async (bookingId, currentStatus) => {
    try {
      const updated = await bookingService.updateBoardingStatus(bookingId, !currentStatus);
      // Update local state
      setBookings(bookings.map(b => 
        b.bookingId === bookingId ? { ...b, boarded: updated.boarded } : b
      ));
    } catch (error) {
      console.error('Error updating boarding status:', error);
      alert('Failed to update boarding status. Please try again.');
    }
  };

  const calculateTotalTime = () => {
    if (bookings.length === 0) return 0;
    // Since we board from farthest to nearest, total time is just 60 seconds per group
    // (all groups can board simultaneously without blocking)
    return bookings.length * 60;
  };

  return (
    <div className="bookings-list-screen">
      <div className="bookings-container">
        <h2>Booking List & Boarding Tracking</h2>

        <div className="date-filter">
          <label htmlFor="filterDate">Select Travel Date:</label>
          <input
            type="date"
            id="filterDate"
            value={travelDate}
            onChange={handleDateChange}
          />
          <button
            className="btn btn-primary"
            onClick={loadBookings}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load Bookings'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {bookings.length > 0 && (
          <div className="bookings-info">
            <div className="info-item">
              <strong>Total Bookings:</strong> {bookings.length}
            </div>
            <div className="info-item">
              <strong>Total Passengers:</strong>{' '}
              {bookings.reduce((sum, b) => sum + b.seats.length, 0)}
            </div>
            <div className="info-item">
              <strong>Estimated Boarding Time:</strong>{' '}
              {calculateTotalTime()} seconds ({Math.ceil(calculateTotalTime() / 60)} minutes)
            </div>
          </div>
        )}

        <div className="table-container">
          {loading ? (
            <div className="loading">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="no-data">
              {travelDate ? 'No bookings found for the selected date.' : 'Please select a date to view bookings.'}
            </div>
          ) : (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Sequence</th>
                  <th>Booking ID</th>
                  <th>Seat(s)</th>
                  <th>Mobile Number</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.bookingId}
                    className={booking.boarded ? 'boarded' : ''}
                  >
                    <td className="sequence-cell">
                      <span className="sequence-number">{booking.sequence}</span>
                    </td>
                    <td className="booking-id-cell">
                      <code>{booking.bookingId.substring(0, 8)}...</code>
                    </td>
                    <td className="seats-cell">
                      {booking.seats.map((seat, idx) => (
                        <span key={idx} className="seat-badge">
                          {seat}
                        </span>
                      ))}
                    </td>
                    <td className="mobile-cell">
                      <div className="mobile-container">
                        <span>{booking.mobileNumber}</span>
                        <button
                          className="call-btn"
                          onClick={() => handleCall(booking.mobileNumber)}
                          title="Call passenger"
                        >
                          📞
                        </button>
                      </div>
                    </td>
                    <td className="action-cell">
                      <button
                        className={`btn btn-sm ${
                          booking.boarded ? 'btn-success' : 'btn-outline'
                        }`}
                        onClick={() =>
                          handleBoardingToggle(booking.bookingId, booking.boarded)
                        }
                      >
                        {booking.boarded ? '✓ Boarded' : 'Mark as Boarded'}
                      </button>
                    </td>
                    <td className="status-cell">
                      <span
                        className={`status-badge ${
                          booking.boarded ? 'boarded' : 'pending'
                        }`}
                      >
                        {booking.boarded ? 'Boarded' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {bookings.length > 0 && (
          <div className="algorithm-info">
            <h3>📊 Optimal Boarding Sequence Information</h3>
            <p>
              The bookings are automatically sorted in the optimal boarding sequence to minimize total boarding time.
            </p>
            <ul>
              <li>
                <strong>Strategy:</strong> Boarding from farthest seats (back) to nearest seats (front)
              </li>
              <li>
                <strong>Benefit:</strong> Passengers at back seats don't block access to front seats
              </li>
              <li>
                <strong>Time per group:</strong> 60 seconds (settling time)
              </li>
              <li>
                <strong>Total time:</strong> {calculateTotalTime()} seconds (all groups can board in parallel)
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
