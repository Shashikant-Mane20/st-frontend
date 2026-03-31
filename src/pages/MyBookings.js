import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingsAPI } from '../utils/api';
import { isAuthenticated, clearDemoData } from '../utils/auth';

const STATUS_STYLES = {
  'confirmed': { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  'pending': { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  'cancelled': { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
  'completed': { bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
  'Confirmed': { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  'Pending': { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  'Cancelled': { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
  'Completed': { bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [cancelId, setCancelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Clear old demo booking data
    clearDemoData();
    
    const fetchBookings = async () => {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        setError('Please log in to view your bookings');
        setLoading(false);
        return;
      }

      try {
        const response = await bookingsAPI.getUserBookings();
        console.log('Bookings response:', response.data); // Debug log
        
        // Handle both direct array and wrapped data
        const bookingsList = response.data.data || response.data || [];
        
        if (Array.isArray(bookingsList) && bookingsList.length > 0) {
          // Convert API response to format expected by UI
          const apiBookings = bookingsList.map(b => ({
            id: b._id,
            tourId: b.tourId?._id || b.tourId,
            tourTitle: b.tourId?.name || 'Unknown Tour',
            tourImage: b.tourId?.images?.[0] || '/images/destinations/default.png',
            duration: b.tourId?.duration || '—',
            category: b.tourId?.destination || 'Tour',
            travelDate: new Date(b.startDate).toISOString().split('T')[0],
            travelers: b.numberOfPeople,
            total: b.totalPrice,
            status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
            tourIsCompleted: b.tourId?.isCompleted || false,
            bookedOn: b.createdAt,
          }));
          setBookings(apiBookings);
        } else {
          setBookings([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch bookings:', err.response?.data || err.message);
        setError('Failed to load bookings. Please try again.');
        setBookings([]);
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  const filters = ['All', 'pending', 'confirmed', 'cancelled'];
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status?.toLowerCase() === filter.toLowerCase());

  const handleCancel = async (id) => {
    try {
      await bookingsAPI.cancelBooking(id);
      // Refresh bookings after cancel
      const response = await bookingsAPI.getUserBookings();
      const bookingsList = response.data.data || response.data || [];
      if (Array.isArray(bookingsList) && bookingsList.length > 0) {
        const apiBookings = bookingsList.map(b => ({
          id: b._id,
          tourId: b.tourId?._id || b.tourId,
          tourTitle: b.tourId?.name || 'Unknown Tour',
          tourImage: b.tourId?.images?.[0] || '/images/destinations/default.png',
          duration: b.tourId?.duration || '—',
          category: b.tourId?.destination || 'Tour',
          travelDate: new Date(b.startDate).toISOString().split('T')[0],
          travelers: b.numberOfPeople,
          total: b.totalPrice,
          status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
          tourIsCompleted: b.tourId?.isCompleted || false,
          bookedOn: b.createdAt,
        }));
        setBookings(apiBookings);
      } else {
        setBookings([]);
      }
      setCancelId(null);
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: '📋' },
    { label: 'Upcoming Trips', value: bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length, icon: '✈️' },
    { label: 'Completed Trips', value: bookings.filter(b => b.status === 'confirmed').length, icon: '🏆' },
    { label: 'Total Spent', value: '₹' + bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + (b.total || 0), 0).toLocaleString(), icon: '💰' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section style={{ padding: 'clamp(40px, 8vw, 70px) 5% clamp(30px, 6vw, 50px)', background: 'radial-gradient(circle at 70% 0%, rgba(124,58,237,0.12), transparent 50%)', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '30px', padding: '6px 16px', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#a78bfa', marginBottom: '20px', letterSpacing: '1px' }}>
          🎒 MY TRAVEL HISTORY
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '12px' }}>My <span className="text-gradient">Bookings</span></h1>
        <p style={{ color: '#8b949e', fontSize: '1.05rem' }}>Track and manage all your Shreeja Tours adventures</p>
      </section>

      {/* Stats */}
      <section style={{ padding: 'clamp(30px, 6vw, 40px) 5%', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 'clamp(12px, 3vw, 20px)' }}>
          {stats.map((s, i) => (
            <div key={i} className="glass-panel" style={{ borderRadius: '16px', padding: 'clamp(16px, 3vw, 28px) clamp(14px, 2.5vw, 24px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)', textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</div>
                <div style={{ color: '#8b949e', fontSize: 'clamp(0.75rem, 2vw, 0.88rem)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* Filter Tabs */}
      <div style={{ padding: 'clamp(16px, 4vw, 24px) 5%', borderBottom: '1px solid var(--surface-border)', display: 'flex', gap: 'clamp(8px, 2vw, 10px)', flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: 'clamp(6px, 1.5vw, 8px) clamp(16px, 3vw, 22px)', borderRadius: '30px', border: filter === f ? 'none' : '1px solid #30363d', background: filter === f ? 'var(--brand-gradient)' : 'transparent', color: filter === f ? '#fff' : '#8b949e', fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: '600', cursor: 'pointer', boxShadow: filter === f ? '0 4px 15px rgba(124,58,237,0.3)' : 'none' }}>{f}</button>
        ))}
      </div>

      {/* Bookings List */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(30px, 6vw, 40px) 5% clamp(40px, 8vw, 60px)' }}>
        {error && (
          <div style={{ textAlign: 'center', padding: 'clamp(20px, 5vw, 40px) clamp(15px, 3vw, 20px)' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '16px' }}>🔐</div>
            <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: '700', marginBottom: '12px' }}>{error}</h3>
            <Link to="/login" className="btn-primary" style={{ padding: '12px 28px', display: 'inline-block', marginTop: '16px' }}>Go to Login</Link>
          </div>
        )}
        {!error && loading && (
          <div style={{ textAlign: 'center', padding: 'clamp(40px, 10vw, 80px) clamp(15px, 3vw, 20px)' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '20px', animation: 'spin 2s linear infinite' }}>⏳</div>
            <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: '700', color: '#8b949e' }}>Loading your bookings...</h3>
          </div>
        )}
        {!error && !loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'clamp(40px, 10vw, 80px) clamp(15px, 3vw, 20px)' }}>
            <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '20px' }}>🗺️</div>
            <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: '700', marginBottom: '12px' }}>No bookings found</h3>
            <p style={{ color: '#8b949e', marginBottom: '30px', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>You haven't made any {filter !== 'All' ? filter.toLowerCase() : ''} bookings yet.</p>
            <Link to="/tours" className="btn-primary" style={{ padding: '14px 30px' }}>Explore Tours</Link>
          </div>
        )}
        {!error && !loading && filtered.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filtered.map(booking => {
              const statusStyle = STATUS_STYLES[booking.status] || STATUS_STYLES['pending'];
              const travelDate = new Date(booking.travelDate);
              const isUpcoming = travelDate > new Date() && booking.status !== 'cancelled';
              return (
                <div key={booking.id} className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', transition: 'transform 0.3s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: 'clamp(120px, 30vw, 160px)', minHeight: '120px', background: 'linear-gradient(135deg, #2a3f5f, #3d5a80)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={booking.tourImage} alt={booking.tourTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 1 }} onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div style="font-size: 2rem; color: #8b949e;">🖼️</div>'; }} />
                    {isUpcoming && <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(52,211,153,0.9)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', fontWeight: '700', color: '#000' }}>UPCOMING</div>}
                  </div>
                  <div style={{ padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3vw, 28px)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1.5vw, 10px)', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, borderRadius: '20px', padding: '3px 12px', fontSize: 'clamp(0.7rem, 1.5vw, 0.78rem)', fontWeight: '700' }}>{booking.status}</span>
                      {booking.tourIsCompleted && (
                        <span style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '20px', padding: '3px 12px', fontSize: 'clamp(0.7rem, 1.5vw, 0.78rem)', fontWeight: '700' }}>✓ Tour Completed</span>
                      )}
                      <span style={{ color: '#8b949e', fontSize: 'clamp(0.75rem, 1.5vw, 0.82rem)' }}>#{booking.id}</span>
                    </div>
                    <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: '700', marginBottom: '8px' }}>{booking.tourTitle}</h3>
                    <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 20px)', flexWrap: 'wrap', marginBottom: '12px', fontSize: 'clamp(0.8rem, 1.5vw, 0.88rem)' }}>
                      <span style={{ color: '#8b949e' }}>📅 {booking.travelDate}</span>
                      <span style={{ color: '#8b949e' }}>🕒 {booking.duration}</span>
                      <span style={{ color: '#8b949e' }}>👥 {booking.travelers} traveller{booking.travelers > 1 ? 's' : ''}</span>
                      <span style={{ color: '#8b949e' }}>🛏️ {booking.roomType} room</span>
                    </div>
                    <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.8rem)', color: '#8b949e' }}>Booked on {new Date(booking.bookedOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div style={{ padding: 'clamp(16px, 3vw, 24px) clamp(16px, 3vw, 28px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderLeft: '1px solid var(--surface-border)', minWidth: 'auto' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', color: '#8b949e', marginBottom: '4px' }}>Total Amount</div>
                      <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{booking.total?.toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.5vw, 8px)', width: '100%' }}>
                      <Link to={`/tours/${booking.tourId}`} className="btn-outline" style={{ padding: 'clamp(7px, 1.5vw, 9px) clamp(14px, 2.5vw, 16px)', fontSize: 'clamp(0.8rem, 1.5vw, 0.85rem)', textAlign: 'center' }}>View Tour</Link>
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <button onClick={() => setCancelId(booking.id)} style={{ padding: 'clamp(7px, 1.5vw, 9px) clamp(14px, 2.5vw, 16px)', fontSize: 'clamp(0.8rem, 1.5vw, 0.85rem)', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', color: '#f87171', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontWeight: '600' }}>Cancel</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Cancel Confirm Modal */}
      {cancelId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 'clamp(12px, 3vw, 20px)' }}>
          <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(24px, 5vw, 40px)', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)', fontWeight: '700', marginBottom: '12px' }}>Cancel Booking?</h3>
            <p style={{ color: '#8b949e', marginBottom: '28px', lineHeight: '1.7', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Are you sure you want to cancel this booking? Refunds are processed within 7 business days as per our cancellation policy.</p>
            <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setCancelId(null)} className="btn-outline" style={{ padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Keep Booking</button>
              <button onClick={() => handleCancel(cancelId)} style={{ padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)', background: 'rgba(248,113,113,0.2)', border: '1px solid rgba(248,113,113,0.4)', borderRadius: '8px', color: '#f87171', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontWeight: '700', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
