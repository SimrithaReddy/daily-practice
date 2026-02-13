import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <h2>✅ Booking Confirmed!</h2>
        </div>
        <div className="confirmation-details">
          <div className="detail-item">
            <strong>Booking ID:</strong>
            <span className="booking-id">{booking.bookingId}</span>
          </div>
          <div className="detail-item">
            <strong>Travel Date:</strong>
            <span>{new Date(booking.travelDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="detail-item">
            <strong>Mobile Number:</strong>
            <span>{booking.mobileNumber}</span>
          </div>
          <div className="detail-item">
            <strong>Selected Seats:</strong>
            <span className="seats-list">{booking.seats.join(', ')}</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
