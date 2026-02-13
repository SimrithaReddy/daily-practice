# Bus Ticket Booking System

A comprehensive bus ticket booking system designed for bus conductors with features for booking management and optimal boarding sequence calculation.

## Features

- **Screen 1: Book/Update/Edit Booking**
  - Travel date selection
  - Mobile number input with validation
  - Interactive seat selection (2×2 seating, 15 rows = 60 seats)
  - Maximum 6 seats per mobile number per day
  - Booking confirmation with system-generated Booking ID

- **Screen 2: Booking List & Boarding Tracking**
  - View all bookings for a selected travel date
  - Click-to-call mobile numbers
  - Mark passengers as boarded
  - Optimal boarding sequence algorithm to minimize total boarding time

## Technology Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js (Express) or Java (Spring Boot) - see `server/` and `server-java/`
- **Storage**: JSON file-based storage (can be easily migrated to database)
- **Styling**: CSS3 with responsive design

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- *(Optional)* **Java 17+** and **Maven** if using the Spring Boot backend

## Setup Instructions

### Step 1: Install Dependencies

From the project root directory, run:

```bash
# Install root dependencies (concurrently for running both servers)
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

**OR** use the convenience script:

```bash
npm run install-all
```

### Step 2: Start the Application

#### Option A: Run Both Server and Client Together (Recommended)

From the project root:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- React frontend on `http://localhost:3000`

#### Option B: Run Separately

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start React Frontend:**
```bash
cd client
npm start
```

### Step 3: Access the Application

1. Open your web browser
2. Navigate to `http://localhost:3000`
3. The application will automatically open with Screen 1 (Booking Screen)
4. Use the navigation menu to switch between screens

### Using Java/Spring Boot Backend (Alternative)

To use the Spring Boot backend instead of Node.js:

1. **Start Java server** (requires Java 17+ and Maven):
   ```bash
   cd server-java
   mvn spring-boot:run
   ```
   Server runs on port **5001**.

2. **Point React to Java API**: Create `client/.env` with:
   ```
   REACT_APP_API_URL=http://localhost:5001/api
   ```
   Or edit `client/src/services/api.js` and set the base URL.

3. Start the React client: `cd client && npm start`

See `server-java/README.md` for more details.

## Project Structure

```
bus-booking/
├── README.md                 # This file
├── package.json              # Root package.json with convenience scripts
├── server/                   # Backend Node.js/Express API (port 5000)
│   ├── package.json
│   ├── index.js              # Express server and API routes
│   └── data/                 # JSON data storage (auto-created)
│       └── bookings.json     # Bookings data file
├── server-java/              # Backend Java/Spring Boot API (port 5001) - alternative
│   ├── pom.xml
│   ├── README.md             # Java server setup instructions
│   └── src/main/java/com/busbooking/
└── client/                   # React frontend
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js          # React entry point
        ├── App.js            # Main App component with routing
        ├── App.css
        ├── components/       # React components
        │   ├── BookingScreen.js      # Screen 1: Booking form
        │   ├── BookingScreen.css
        │   ├── BookingsList.js       # Screen 2: Bookings list
        │   ├── BookingsList.css
        │   ├── ConfirmationModal.js
        │   └── ConfirmationModal.css
        ├── services/         # API service layer
        │   └── api.js        # Axios API client
        └── utils/            # Utility functions
            └── seatUtils.js  # Seat-related utilities
```

## Execution Steps

### Screen 1: Book/Update/Edit Booking

1. **Select Travel Date**
   - Click on the date input field
   - Choose a date (cannot select past dates)
   - Date defaults to today

2. **Enter Mobile Number**
   - Enter a 10-digit mobile number (must start with 6-9)
   - System validates the format automatically
   - If a booking exists for this mobile number and date, it will be loaded for editing

3. **Select Seats**
   - Click on available seats (green) to select
   - Selected seats turn blue
   - Maximum 6 seats can be selected per mobile number per day
   - Click again to deselect
   - Booked seats (red) cannot be selected

4. **Submit Booking**
   - Click "Book Seats" or "Update Booking" button
   - A confirmation modal will appear with:
     - Booking ID (auto-generated UUID)
     - Travel Date
     - Mobile Number
     - Selected Seats

5. **Update Existing Booking**
   - Enter the same mobile number and date
   - Existing seats will be pre-selected
   - Modify seat selection
   - Click "Update Booking" to save changes

### Screen 2: Booking List & Boarding Tracking

1. **Select Travel Date**
   - Choose the date to view bookings
   - Date defaults to today
   - Click "Load Bookings" button

2. **View Bookings**
   - All bookings for the selected date are displayed in a table
   - Bookings are automatically sorted by optimal boarding sequence
   - View total bookings, passengers, and estimated boarding time

3. **Call Passenger**
   - Click the phone icon (📞) next to a booking
   - Your device's default dialer will open with the mobile number

4. **Mark as Boarded**
   - Click "Mark as Boarded" button for passengers who have boarded
   - The status updates in real-time
   - Boarded rows are highlighted in green

5. **View Optimal Sequence**
   - The system automatically calculates the optimal boarding order
   - Passengers are sorted from farthest to nearest seat to minimize blocking
   - Algorithm information is displayed at the bottom

## Algorithm: Optimal Boarding Sequence

The system implements an algorithm that minimizes total boarding time by:

1. **Grouping by Booking ID**: All passengers with the same Booking ID board together
2. **Sorting by Seat Position**: Boarding from farthest seat (back) to nearest (front)
3. **Avoiding Blocking**: Passengers at front seats don't block access to back seats

**Key Constraints:**
- Each passenger takes 60 seconds to settle
- While settling, no one can cross past that seat
- All passengers under the same Booking ID board together
- Boarding happens only through the front gate

**Example:**
- Booking 111: Seat A1 (front) → Board last
- Booking 222: Seat A7 (middle) → Board second
- Booking 333: Seat A15 (back) → Board first

This minimizes total boarding time from 180 seconds to 60 seconds.

## Seat Layout

- **Arrangement**: 2×2 seating (2 seats on each side)
- **Rows**: 15 rows
- **Total Seats**: 60 seats
- **Naming**: A1-A15 (left side), B1-B15 (right side)

## Data Persistence

All booking data is stored in the browser's LocalStorage. Data persists across browser sessions but is specific to the browser and device.

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Edge
- Safari
- Opera

## API Endpoints

### Backend API (Port 5000)

- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:date` - Get bookings for a specific date
- `POST /api/bookings` - Create or update a booking
- `PATCH /api/bookings/:bookingId/boarded` - Update boarding status
- `GET /api/bookings/:date/boarding-sequence` - Get optimal boarding sequence
- `GET /api/health` - Health check endpoint

## Algorithm Details

### Optimal Boarding Sequence Algorithm

The system implements an algorithm that minimizes total boarding time by:

1. **Grouping**: All passengers with the same Booking ID board together
2. **Sorting Strategy**: Board from farthest seats (back) to nearest seats (front)
3. **Why This Works**: 
   - Passengers at back seats (A15, B15) board first
   - They don't block access to front seats
   - Passengers at front seats (A1, B1) board last
   - No blocking occurs, minimizing total time

**Time Calculation:**
- Each group takes 60 seconds to settle
- With optimal sequence, all groups can board in parallel (no blocking)
- Total time = Number of groups × 60 seconds

**Example:**
- Booking 111: Seats A1, A2 (front) → Sequence 3 (board last)
- Booking 222: Seats A7, A8 (middle) → Sequence 2
- Booking 333: Seats A15, B15 (back) → Sequence 1 (board first)
- Total time: 3 × 60 = 180 seconds (all can board simultaneously)

## Notes

- Data is stored in `server/data/bookings.json` (JSON file-based storage)
- Mobile number validation: 10 digits, starting with 6-9
- Maximum 6 seats per mobile number per day
- Past dates cannot be selected for booking
- Booking IDs are auto-generated UUIDs

## Development

### Project Structure
- **Frontend**: React with functional components and hooks
- **Backend**: Express.js RESTful API
- **State Management**: React useState/useEffect hooks
- **API Communication**: Axios
- **Routing**: React Router

### Code Quality Features
- ✅ Clean, readable code with proper naming conventions
- ✅ Comprehensive error handling
- ✅ Input validation (client and server side)
- ✅ Edge case handling
- ✅ Responsive UI design
- ✅ Proper documentation and comments
- ✅ Efficient algorithm implementation

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Export booking data to CSV/Excel
- Print boarding passes
- Multiple bus routes
- Payment integration
- Email/SMS notifications
- User authentication
- Admin dashboard
- Real-time updates with WebSockets

## Support

For issues or questions, please refer to:
- Code comments in source files
- README.md for setup instructions
- QUICKSTART.md for quick setup guide
