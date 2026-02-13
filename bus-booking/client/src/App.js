import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import BookingScreen from './components/BookingScreen';
import BookingsList from './components/BookingsList';
import './App.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="main-nav">
      <Link 
        to="/" 
        className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
      >
        Book Seats
      </Link>
      <Link 
        to="/bookings" 
        className={location.pathname === '/bookings' ? 'nav-link active' : 'nav-link'}
      >
        View Bookings
      </Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🚌 Bus Ticket Booking System</h1>
          <Navigation />
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<BookingScreen />} />
            <Route path="/bookings" element={<BookingsList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
