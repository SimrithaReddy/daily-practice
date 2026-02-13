# Quick Start Guide

## Quick Setup (3 Steps)

### 1. Install All Dependencies
```bash
npm run install-all
```

### 2. Start the Application
```bash
npm run dev
```

### 3. Open Browser
Navigate to: `http://localhost:3000`

That's it! The application is now running.

---

## What's Running?

- **Backend API**: `http://localhost:5000`
- **Frontend React App**: `http://localhost:3000`

## Troubleshooting

### Port Already in Use?
If port 3000 or 5000 is already in use:

**For Backend (port 5000):**
- Edit `server/index.js` and change `PORT` variable
- Or set environment variable: `PORT=5001`

**For Frontend (port 3000):**
- React will automatically suggest using port 3001
- Or set in `.env` file: `PORT=3001`

### Dependencies Not Installing?
Make sure you have Node.js v14 or higher:
```bash
node --version
```

### API Connection Errors?
1. Make sure the backend server is running on port 5000
2. Check browser console for errors
3. Verify `client/src/services/api.js` has correct API URL

## First Time Usage

1. **Create a Booking:**
   - Go to "Book Seats" screen
   - Select today's date
   - Enter a mobile number (e.g., 9876543210)
   - Select some seats
   - Click "Book Seats"

2. **View Bookings:**
   - Go to "View Bookings" screen
   - Select the same date
   - Click "Load Bookings"
   - You'll see your booking with optimal boarding sequence

## Data Storage

All bookings are stored in: `server/data/bookings.json`

This file is automatically created on first booking.
