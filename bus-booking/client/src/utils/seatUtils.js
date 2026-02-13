// Generate seat layout: 2x2 seating, 15 rows
// A1-A15 (left side), B1-B15 (right side)
export const generateSeatLayout = () => {
  const seats = [];
  for (let row = 1; row <= 15; row++) {
    seats.push(`A${row}`);
    seats.push(`B${row}`);
  }
  return seats;
};

// Get seat row number
export const getSeatRow = (seat) => {
  return parseInt(seat.substring(1));
};

// Get seat side (A or B)
export const getSeatSide = (seat) => {
  return seat.charAt(0);
};

// Validate seat format
export const validateSeat = (seat) => {
  const seatRegex = /^[AB]([1-9]|1[0-5])$/;
  return seatRegex.test(seat);
};

// Validate mobile number
export const validateMobileNumber = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

// Format date for input (YYYY-MM-DD)
export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format date for display
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
