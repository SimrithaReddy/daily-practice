# Bus Booking Server - Spring Boot

Java/Spring Boot backend for the Bus Ticket Booking System. Provides the same API as the Node.js server for compatibility with the React frontend.

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Configuration

- **Port**: 5001 (different from Node.js server on 5000 to avoid conflicts)
- **Data file**: `data/bookings.json` (relative to working directory)

## Run

```bash
# From server-java directory
./mvnw spring-boot:run

# Or with installed Maven
mvn spring-boot:run
```

## Build

```bash
mvn clean package
java -jar target/bus-booking-server-1.0.0.jar
```

## Use with React Frontend

To use this Java backend instead of the Node.js one:

1. Ensure the Java server is running on port 5001.
2. In the client, set the API URL:
   - Create `.env` in `client/` with: `REACT_APP_API_URL=http://localhost:5001/api`
   - Or edit `client/src/services/api.js` and set `API_BASE_URL` to `http://localhost:5001/api`
3. Start the React app: `cd client && npm start`

## API Endpoints

Same as Node.js server:

- `GET /api/bookings` - All bookings
- `GET /api/bookings/{date}` - Bookings by date
- `POST /api/bookings` - Create/update booking
- `PATCH /api/bookings/{bookingId}/boarded` - Update boarding status
- `GET /api/bookings/{date}/boarding-sequence` - Optimal boarding sequence
- `GET /api/health` - Health check
