import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Offers from './pages/Offers';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { isAuthenticated, getUser, logout } from './utils/auth';
import './App.css';
import './index.css';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [menuOpen, setMenuOpen] = useState(false);
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', width: '100%' }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '20px' }}>ST</div>
        <h2 style={{ margin: 0, fontSize: 'clamp(1rem, 3vw, 1.4rem)', fontWeight: '700', whiteSpace: 'nowrap' }}>
          Shreeja <span className="text-gradient">Tours</span>
        </h2>
      </Link>

      {/* Hamburger Menu Button */}
      <button 
        className="hamburger-menu" 
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#e6edf3',
          cursor: 'pointer',
          display: 'none',
          flexDirection: 'column',
          gap: '6px',
          padding: '8px',
          marginLeft: 'auto'
        }}
        aria-label="Toggle menu"
      >
        <span style={{ width: '24px', height: '2px', background: '#e6edf3', transition: 'all 0.3s ease' }}></span>
        <span style={{ width: '24px', height: '2px', background: '#e6edf3', transition: 'all 0.3s ease' }}></span>
        <span style={{ width: '24px', height: '2px', background: '#e6edf3', transition: 'all 0.3s ease' }}></span>
      </button>

      {/* Navigation Links & Auth */}
      <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
        {/* Main Navigation */}
        <Link to="/" className={isActive('/')} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/tours" className={isActive('/tours')} onClick={() => setMenuOpen(false)}>Destinations</Link>
        <Link to="/offers" className={isActive('/offers')} style={{ position: 'relative' }} onClick={() => setMenuOpen(false)}>
          Offers
          <span style={{ position: 'absolute', top: '-8px', right: '-14px', background: 'var(--brand-gradient)', borderRadius: '10px', padding: '1px 6px', fontSize: '0.6rem', fontWeight: '700', color: '#fff' }}>HOT</span>
        </Link>
        <Link to="/gallery" className={isActive('/gallery')} onClick={() => setMenuOpen(false)}>Gallery</Link>
        <Link to="/about" className={isActive('/about')} onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" className={isActive('/contact')} onClick={() => setMenuOpen(false)}>Contact</Link>

        {/* Auth Section */}
        {loggedIn ? (
          <div className="nav-auth-section">
            <Link to="/my-bookings" className={`${isActive('/my-bookings')} nav-trips-link`} onClick={() => setMenuOpen(false)}>
              🎒 My Trips
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className={`${isActive('/admin')} nav-admin-link`} onClick={() => setMenuOpen(false)}>
                ⚙️ Admin
              </Link>
            )}
            <div className="nav-user-profile">
              <span className="nav-user-name">{user?.name?.split(' ')[0] || 'Traveller'}</span>
            </div>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="btn-logout">
              Log Out
            </button>
          </div>
        ) : (
          <div className="nav-auth-section">
            <Link to="/login" className="btn-outline nav-auth-btn">Log In</Link>
            <Link to="/register" className="btn-primary nav-auth-btn">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            <Route path="/book/:tourId" element={<Booking />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {getUser()?.role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--surface-border)', padding: '50px 5% 30px', background: 'rgba(13,17,23,0.8)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>ST</div>
                <span style={{ fontWeight: '700', fontSize: '1rem' }}>Shreeja Tours And Travels</span>
              </div>
              <p style={{ color: '#8b949e', fontSize: '0.88rem', lineHeight: '1.8' }}>Maharashtra's most trusted travel partner since 2014. Crafting unforgettable journeys across India.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '14px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#8b949e' }}>Quick Links</h4>
              {[['/', 'Home'], ['/tours', 'Destinations'], ['/offers', 'Offers & Deals'], ['/gallery', 'Gallery']].map(([to, label]) => (
                <Link key={to} to={to} style={{ display: 'block', color: '#8b949e', fontSize: '0.88rem', marginBottom: '10px', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#e6edf3'} onMouseOut={e => e.target.style.color = '#8b949e'}>{label}</Link>
              ))}
            </div>
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '14px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#8b949e' }}>Company</h4>
              {[['/about', 'About Us'], ['/contact', 'Contact Us'], ['/my-bookings', 'My Bookings']].map(([to, label]) => (
                <Link key={to} to={to} style={{ display: 'block', color: '#8b949e', fontSize: '0.88rem', marginBottom: '10px', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#e6edf3'} onMouseOut={e => e.target.style.color = '#8b949e'}>{label}</Link>
              ))}
            </div>
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '14px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#8b949e' }}>Contact</h4>
              {[['📍', 'Pune, Maharashtra, India'], ['📞', '+91 98765 43210'], ['📧', 'hello@shreejatours.in'], ['🕘', 'Mon–Sat: 9 AM – 7 PM']].map(([icon, text], i) => (
                <div key={i} style={{ color: '#8b949e', fontSize: '0.88rem', marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>© 2026 Shreeja Tours And Travels. All rights reserved.</span>
            <span style={{ color: '#8b949e', fontSize: '0.85rem' }}>Made with ❤️ in Pune, Maharashtra</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
