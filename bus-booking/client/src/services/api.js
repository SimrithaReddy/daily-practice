import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookingService = {
  // Get all bookings for a specific date
  getBookingsByDate: async (date) => {
    const response = await api.get(`/bookings/${date}`);
    return response.data;
  },

  // Get all bookings
  getAllBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  // Create or update booking
  createOrUpdateBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Update boarding status
  updateBoardingStatus: async (bookingId, boarded) => {
    const response = await api.patch(`/bookings/${bookingId}/boarded`, { boarded });
    return response.data;
  },

  // Get optimal boarding sequence
  getBoardingSequence: async (date) => {
    const response = await api.get(`/bookings/${date}/boarding-sequence`);
    return response.data;
  },
};

export default api;
