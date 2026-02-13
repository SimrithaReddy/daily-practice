const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'bookings.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper function to read bookings
function readBookings() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bookings:', error);
    return [];
  }
}

// Helper function to write bookings
function writeBookings(bookings) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing bookings:', error);
    return false;
  }
}

// Validate mobile number
function validateMobileNumber(mobile) {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
}

// Validate seat format (A1-A15, B1-B15)
function validateSeat(seat) {
  const seatRegex = /^[AB]([1-9]|1[0-5])$/;
  return seatRegex.test(seat);
}

// Get seat row number
function getSeatRow(seat) {
  return parseInt(seat.substring(1));
}

// Get seat side (A or B)
function getSeatSide(seat) {
  return seat.charAt(0);
}

// API Routes

// Get all bookings for a specific date
app.get('/api/bookings/:date', (req, res) => {
  try {
    const { date } = req.params;
    const bookings = readBookings();
    const filteredBookings = bookings.filter(booking => booking.travelDate === date);
    res.json(filteredBookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = readBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Create or update booking
app.post('/api/bookings', (req, res) => {
  try {
    const { travelDate, mobileNumber, seats } = req.body;

    // Validation
    if (!travelDate || !mobileNumber || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validateMobileNumber(mobileNumber)) {
      return res.status(400).json({ error: 'Invalid mobile number. Must be 10 digits starting with 6-9' });
    }

    if (seats.length > 6) {
      return res.status(400).json({ error: 'Maximum 6 seats can be booked per mobile number per day' });
    }

    // Validate all seats
    for (const seat of seats) {
      if (!validateSeat(seat)) {
        return res.status(400).json({ error: `Invalid seat format: ${seat}` });
      }
    }

    // Check date is not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(travelDate);
    if (bookingDate < today) {
      return res.status(400).json({ error: 'Cannot book for past dates' });
    }

    const bookings = readBookings();

    // Check for existing booking with same mobile number and date
    const existingBookingIndex = bookings.findIndex(
      b => b.travelDate === travelDate && b.mobileNumber === mobileNumber
    );

    // Check seat availability for the date
    const bookingsForDate = bookings.filter(b => b.travelDate === travelDate);
    const bookedSeats = new Set();
    bookingsForDate.forEach(booking => {
      if (existingBookingIndex !== -1 && bookings[existingBookingIndex].bookingId === booking.bookingId) {
        // Skip current booking if updating
        return;
      }
      booking.seats.forEach(seat => bookedSeats.add(seat));
    });

    // Check if any selected seat is already booked
    const conflictingSeats = seats.filter(seat => bookedSeats.has(seat));
    if (conflictingSeats.length > 0) {
      return res.status(400).json({ 
        error: `Seats already booked: ${conflictingSeats.join(', ')}` 
      });
    }

    // Check if same mobile number has more than 6 seats for the date (excluding current booking)
    const seatsForMobileDate = bookingsForDate
      .filter(b => b.mobileNumber === mobileNumber && 
                   (existingBookingIndex === -1 || bookings[existingBookingIndex].bookingId !== b.bookingId))
      .reduce((total, b) => total + b.seats.length, 0);
    
    if (seatsForMobileDate + seats.length > 6) {
      return res.status(400).json({ 
        error: 'Maximum 6 seats can be booked per mobile number per day' 
      });
    }

    let booking;
    if (existingBookingIndex !== -1) {
      // Update existing booking
      booking = {
        ...bookings[existingBookingIndex],
        seats: seats,
        updatedAt: new Date().toISOString()
      };
      bookings[existingBookingIndex] = booking;
    } else {
      // Create new booking
      booking = {
        bookingId: uuidv4(),
        travelDate,
        mobileNumber,
        seats: seats.sort(),
        boarded: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      bookings.push(booking);
    }

    if (writeBookings(bookings)) {
      res.json(booking);
    } else {
      res.status(500).json({ error: 'Failed to save booking' });
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update boarding status
app.patch('/api/bookings/:bookingId/boarded', (req, res) => {
  try {
    const { bookingId } = req.params;
    const { boarded } = req.body;

    const bookings = readBookings();
    const bookingIndex = bookings.findIndex(b => b.bookingId === bookingId);

    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    bookings[bookingIndex].boarded = boarded === true;
    bookings[bookingIndex].updatedAt = new Date().toISOString();

    if (writeBookings(bookings)) {
      res.json(bookings[bookingIndex]);
    } else {
      res.status(500).json({ error: 'Failed to update booking' });
    }
  } catch (error) {
    console.error('Error updating boarding status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get optimal boarding sequence
app.get('/api/bookings/:date/boarding-sequence', (req, res) => {
  try {
    const { date } = req.params;
    const bookings = readBookings();
    const filteredBookings = bookings.filter(booking => booking.travelDate === date);

    // Calculate optimal sequence
    const sequencedBookings = calculateOptimalSequence(filteredBookings);
    res.json(sequencedBookings);
  } catch (error) {
    console.error('Error calculating boarding sequence:', error);
    res.status(500).json({ error: 'Failed to calculate boarding sequence' });
  }
});

// Optimal boarding sequence algorithm
function calculateOptimalSequence(bookings) {
  // Group bookings by bookingId (all passengers with same ID board together)
  const bookingGroups = bookings.map(booking => ({
    ...booking,
    maxRow: Math.max(...booking.seats.map(seat => getSeatRow(seat))),
    minRow: Math.min(...booking.seats.map(seat => getSeatRow(seat)))
  }));

  // Sort by maxRow descending (farthest seat first)
  // This ensures passengers boarding to back seats don't block front seat passengers
  bookingGroups.sort((a, b) => {
    if (b.maxRow !== a.maxRow) {
      return b.maxRow - a.maxRow; // Farther seats first
    }
    // If same max row, sort by minRow descending
    return b.minRow - a.minRow;
  });

  // Add sequence numbers
  return bookingGroups.map((booking, index) => ({
    ...booking,
    sequence: index + 1
  }));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bus Booking API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
