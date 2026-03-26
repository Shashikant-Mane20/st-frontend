import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken, isAuthenticated } from '../utils/auth';

const inputStyle = { width: '100%', padding: 'clamp(10px, 2vw, 13px) clamp(12px, 2.5vw, 16px)', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(0.9rem, 2vw, 0.97rem)', outline: 'none', transition: 'border-color 0.25s ease' };
const labelStyle = { display: 'block', marginBottom: '7px', fontSize: 'clamp(0.75rem, 1.5vw, 0.88rem)', color: '#8b949e', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };

function Booking() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  
  const [tour, setTour] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', travelers: 2, travelDate: '', roomType: 'double', specialReq: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [tourLoading, setTourLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tour from API
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`/api/tours/${tourId}`);
        setTour(response.data.data || response.data);
      } catch (error) {
        setError('Tour not found. Please select a tour from our catalog.');
        setTour(null);
      } finally {
        setTourLoading(false);
      }
    };
    
    fetchTour();
  }, [tourId]);

  const gst = tour ? Math.round(form.travelers * tour.price * 0.05) : 0;
  const total = tour ? form.travelers * tour.price + gst : 0;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const token = getToken();
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // Prepare booking data
      const bookingData = {
        tourId: tour._id,
        startDate: form.travelDate,
        endDate: new Date(new Date(form.travelDate).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Add 2 days for end date
        numberOfPeople: parseInt(form.travelers),
      };

      // Submit booking to backend API
      const response = await axios.post('/api/bookings', bookingData, config);
      
      setBookingId(response.data.data?._id || 'BK' + Date.now());
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (tourLoading) {
    return (
      <div className="animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vw, 40px) 5%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '20px', animation: 'spin 1s linear infinite' }}>⏳</div>
          <p style={{ color: '#8b949e', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vw, 40px) 5%' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '20px' }}>❌</div>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', marginBottom: '10px' }}>Tour not found</h2>
          <Link to="/tours" className="btn-primary" style={{ padding: 'clamp(10px, 2vw, 12px) clamp(20px, 3vw, 28px)', display: 'inline-block', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Back to Tours</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vw, 40px) 5%' }}>
        <div className="glass-panel" style={{ borderRadius: '24px', padding: 'clamp(30px, 6vw, 60px) clamp(20px, 4vw, 50px)', textAlign: 'center', maxWidth: '520px', width: '100%' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', fontWeight: '800', marginBottom: '12px' }}>Booking <span className="text-gradient">Confirmed!</span></h2>
          <p style={{ color: '#8b949e', marginBottom: '30px', lineHeight: '1.7', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Your trip to <strong style={{ color: '#e6edf3' }}>{tour?.name || tour?.title}</strong> has been booked successfully. A confirmation will be sent to <strong style={{ color: '#a78bfa' }}>{form.email}</strong>.</p>
          <div style={{ background: 'rgba(124,58,237,0.08)', borderRadius: '12px', padding: 'clamp(12px, 2vw, 20px)', marginBottom: '30px', border: '1px solid rgba(124,58,237,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#8b949e', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>Booking ID</span>
              <span style={{ fontWeight: '700', color: '#a78bfa', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>{bookingId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#8b949e', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>Travel Date</span>
              <span style={{ fontWeight: '700', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>{form.travelDate || '—'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8b949e', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>Total Paid</span>
              <span style={{ fontWeight: '800', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{total.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/my-bookings" className="btn-primary" style={{ padding: 'clamp(10px, 2vw, 12px) clamp(18px, 3vw, 28px)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>View My Bookings</Link>
            <Link to="/tours" className="btn-outline" style={{ padding: 'clamp(10px, 2vw, 12px) clamp(18px, 3vw, 28px)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>Explore More</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'clamp(40px, 8vw, 60px) 5% clamp(30px, 6vw, 40px)', borderBottom: '1px solid var(--surface-border)', background: 'radial-gradient(circle at 70% 0%, rgba(124,58,237,0.1), transparent 50%)' }}>
        <button onClick={() => navigate(`/tours/${tour._id}`)} style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', fontFamily: 'Outfit,sans-serif', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}>← Back to Tour</button>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>Complete Your <span className="text-gradient">Booking</span></h1>
        <p style={{ color: '#8b949e', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Fill in the details below to secure your spot</p>
        
        {error && (
          <div style={{ marginTop: '20px', padding: 'clamp(10px, 2vw, 14px) clamp(12px, 2vw, 16px)', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#f87171', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>
            ⚠️ {error}
          </div>
        )}
        {/* Progress Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '30px', maxWidth: '400px' }}>
          {['Details', 'Preferences', 'Confirm'].map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step > i ? 'var(--brand-gradient)' : step === i + 1 ? 'var(--brand-gradient)' : 'var(--surface-color)', border: step > i || step === i + 1 ? 'none' : '2px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', color: step >= i + 1 ? '#fff' : '#8b949e' }}>{step > i + 1 ? '✓' : i + 1}</div>
                <span style={{ fontSize: '0.75rem', color: step === i + 1 ? '#a78bfa' : '#8b949e', fontWeight: step === i + 1 ? '600' : '400' }}>{s}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: '2px', background: step > i + 1 ? 'var(--brand-gradient)' : '#30363d', marginBottom: '18px' }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: 'clamp(20px, 4vw, 40px) auto', padding: '0 5% clamp(40px, 10vw, 60px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'start' }}>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(20px, 4vw, 36px)' }}>
              <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: '700', marginBottom: 'clamp(16px, 3vw, 28px)' }}>👤 Personal Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(12px, 2.5vw, 20px)' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="e.g. Priya Sharma" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input style={inputStyle} name="email" type="email" value={form.email} onChange={handleChange} placeholder="priya@example.com" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input style={inputStyle} name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>City / State *</label>
                  <input style={inputStyle} name="city" value={form.city} onChange={handleChange} placeholder="e.g. Pune, Maharashtra" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
              </div>
              <button type="button" onClick={() => { if (form.name && form.email && form.phone && form.city) setStep(2); }} className="btn-primary" style={{ marginTop: 'clamp(16px, 3vw, 28px)', padding: 'clamp(10px, 2vw, 14px) clamp(24px, 4vw, 36px)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(20px, 4vw, 36px)' }}>
              <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: '700', marginBottom: 'clamp(16px, 3vw, 28px)' }}>🏕️ Trip Preferences</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(12px, 2.5vw, 20px)' }}>
                <div>
                  <label style={labelStyle}>Travel Date *</label>
                  <input style={inputStyle} name="travelDate" type="date" value={form.travelDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Number of Travellers *</label>
                  <input style={inputStyle} name="travelers" type="number" min="1" max="30" value={form.travelers} onChange={handleChange} required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Room Type</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} name="roomType" value={form.roomType} onChange={handleChange}>
                    <option value="single">Single Occupancy</option>
                    <option value="double">Double Occupancy</option>
                    <option value="triple">Triple Occupancy</option>
                    <option value="family">Family Suite</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Special Requests (Optional)</label>
                  <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} name="specialReq" value={form.specialReq} onChange={handleChange} placeholder="Any dietary requirements, wheelchair access, anniversary setup, etc." onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', marginTop: 'clamp(16px, 3vw, 28px)' }}>
                <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ padding: 'clamp(10px, 2vw, 14px) clamp(20px, 3vw, 28px)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>← Back</button>
                <button type="button" onClick={() => { if (form.travelDate && form.travelers) setStep(3); }} className="btn-primary" style={{ padding: 'clamp(10px, 2vw, 14px) clamp(24px, 4vw, 36px)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Review Booking →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(20px, 4vw, 36px)' }}>
              <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: '700', marginBottom: 'clamp(16px, 3vw, 28px)' }}>✅ Confirm Your Booking</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 2vw, 14px)', marginBottom: 'clamp(16px, 3vw, 28px)' }}>
                {[['👤 Name', form.name], ['📧 Email', form.email], ['📞 Phone', form.phone], ['🏙️ City', form.city], ['📅 Travel Date', form.travelDate], ['👥 Travellers', form.travelers], ['🛏️ Room Type', form.roomType]].map(([label, val], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2vw, 16px)', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid #30363d', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#8b949e', fontSize: '0.9rem' }}>{label}</span>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem', textTransform: 'capitalize' }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(52,211,153,0.08)', borderRadius: '12px', padding: 'clamp(10px, 2vw, 16px) clamp(12px, 2.5vw, 20px)', marginBottom: 'clamp(16px, 3vw, 28px)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>>🔐</span>
                <span style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.88rem)', color: '#8b949e' }}>Your data is safe and secure. We follow strict privacy practices.</span>
              </div>
              <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)' }}>
                <button type="button" onClick={() => setStep(2)} className="btn-outline" style={{ padding: 'clamp(10px, 2vw, 14px) clamp(20px, 3vw, 28px)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>← Edit</button>
                <button type="submit" className="btn-primary" style={{ padding: 'clamp(10px, 2vw, 14px) clamp(24px, 4vw, 36px)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', flex: 1, opacity: loading ? 0.7 : 1 }} disabled={loading}>{loading ? '⏳ Booking...' : '🎒 Confirm & Book Now'}</button>
              </div>
            </div>
          )}
        </form>

        {/* Order Summary */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(16px, 3vw, 28px)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <h3 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: '700', marginBottom: 'clamp(12px, 2.5vw, 20px)' }}>📋 Order Summary</h3>
            <div style={{ height: 'clamp(120px, 25vw, 160px)', borderRadius: '12px', overflow: 'hidden', marginBottom: 'clamp(12px, 2.5vw, 20px)', background: 'linear-gradient(135deg,#1c2331,#283046)' }}>
              <img src={tour.image || (tour.images && tour.images[0]) || '/images/destinations/default.png'} alt={tour.title || tour.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <h4 style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', fontWeight: '700', marginBottom: '6px' }}>{tour.name || tour.title}</h4>
            <p style={{ color: '#8b949e', fontSize: 'clamp(0.8rem, 1.5vw, 0.85rem)', marginBottom: 'clamp(12px, 2.5vw, 20px)' }}>🕒 {tour.duration} &nbsp;|&nbsp; ⭐ {tour.rating}</p>
            <div style={{ borderTop: '1px solid #30363d', paddingTop: 'clamp(10px, 2vw, 16px)', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.5vw, 10px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', gap: '12px' }}>
                <span style={{ color: '#8b949e' }}>₹{tour.price.toLocaleString()} × {form.travelers} person{form.travelers > 1 ? 's' : ''}</span>
                <span>₹{(form.travelers * tour.price).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>
                <span style={{ color: '#8b949e' }}>GST (5%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', fontWeight: '800', borderTop: '1px solid #30363d', paddingTop: 'clamp(8px, 2vw, 12px)', marginTop: '4px' }}>
                <span>Total</span>
                <span style={{ background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ marginTop: 'clamp(10px, 2vw, 16px)', display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 1vw, 8px)' }}>
              {['✅ Free Cancellation (7 days)', '🔒 Secure Payment', '📞 24/7 Support'].map((item, i) => (
                <div key={i} style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.82rem)', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px' }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
