import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BADGE_COLORS = {
  'Most Popular': { bg: 'rgba(255,51,102,0.2)', color: '#ff6b8a', border: 'rgba(255,51,102,0.4)' },
  'Budget Friendly': { bg: 'rgba(16,185,129,0.2)', color: '#34d399', border: 'rgba(16,185,129,0.4)' },
  'UNESCO Site': { bg: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: 'rgba(245,158,11,0.4)' },
  'Adventure': { bg: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'rgba(239,68,68,0.4)' },
  'Nature & Wildlife': { bg: 'rgba(52,211,153,0.2)', color: '#6ee7b7', border: 'rgba(52,211,153,0.4)' },
  'Eco-Friendly': { bg: 'rgba(16,185,129,0.2)', color: '#34d399', border: 'rgba(16,185,129,0.4)' },
  'Spiritual': { bg: 'rgba(167,139,250,0.2)', color: '#c4b5fd', border: 'rgba(167,139,250,0.4)' },
  'Royal Heritage': { bg: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: 'rgba(245,158,11,0.4)' },
  'Weekend Special': { bg: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: 'rgba(99,102,241,0.4)' },
};

const SAMPLE_REVIEWS = [
  { name: 'Anjali Sharma', date: 'March 2025', rating: 5, comment: 'Absolutely fantastic! Well organized, knowledgeable guide, every detail taken care of. Will definitely book again!', initials: 'AS', gradient: 'linear-gradient(135deg, #FF3366, #7C3AED)' },
  { name: 'Rajesh Patil', date: 'February 2025', rating: 5, comment: 'Best tour in years. Shreeja Tours handled everything seamlessly. Excellent accommodations and perfectly timed sightseeing.', initials: 'RP', gradient: 'linear-gradient(135deg, #7C3AED, #06B6D4)' },
  { name: 'Meera Joshi', date: 'January 2025', rating: 4, comment: 'Really enjoyed the trip! Great value for money. The food included was delicious. Minor delay on Day 2 but overall great.', initials: 'MJ', gradient: 'linear-gradient(135deg, #06B6D4, #10B981)' },
];

function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`/api/tours/${id}`);
        const tourData = response.data.data || response.data;
        setTour(tourData);
      } catch (err) {
        setError('Tour not found');
        console.error('Error fetching tour:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 'clamp(60px, 15vw, 120px) 5%', textAlign: 'center' }}>
        <div style={{ width: 'clamp(32px, 8vw, 40px)', height: 'clamp(32px, 8vw, 40px)', border: '3px solid #30363d', borderTop: '3px solid #7C3AED', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#8b949e', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Loading tour details...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div style={{ padding: 'clamp(60px, 15vw, 120px) 5%', textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '16px' }}>🚫</div>
        <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', marginBottom: '10px' }}>Tour Not Found</h2>
        <p style={{ color: '#8b949e', marginBottom: '24px', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>The tour you're looking for doesn't exist.</p>
        <Link to="/tours" className="btn-primary" style={{ padding: 'clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>← Back to Tours</Link>
      </div>
    );
  }

  const badgeStyle = BADGE_COLORS[tour.badge] || BADGE_COLORS['Most Popular'];
  const tabs = ['overview'];
  if (tour.itinerary && Array.isArray(tour.itinerary) && tour.itinerary.length > 0) tabs.push('itinerary');
  if ((tour.inclusions && Array.isArray(tour.inclusions) && tour.inclusions.length > 0) || (tour.exclusions && Array.isArray(tour.exclusions) && tour.exclusions.length > 0)) tabs.push('inclusions');
  tabs.push('reviews');

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(280px, 60vh, 420px)', overflow: 'hidden', background: 'linear-gradient(135deg, #1c2331, #283046)' }}>
        <img src={tour.image || (tour.images && tour.images[0]) || '/images/destinations/default.png'} alt={tour.title || tour.name} onError={(e) => { e.target.style.display = 'none'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,17,23,1) 0%, rgba(13,17,23,0.4) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 'clamp(20px, 4vw, 40px)', left: '5%', right: '5%' }}>
          <div style={{ display: 'flex', gap: 'clamp(6px, 1.5vw, 10px)', marginBottom: '16px', flexWrap: 'wrap' }}>
            {tour.badge && <span style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', padding: '4px 12px', borderRadius: '20px', background: badgeStyle.bg, color: badgeStyle.color, border: `1px solid ${badgeStyle.border}`, fontWeight: '600' }}>{tour.badge}</span>}
            {tour.category && <span style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', color: '#a78bfa', padding: '4px 12px', borderRadius: '20px', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>{tour.category}</span>}
          </div>
          <h1 style={{ fontSize: 'clamp(1.3rem, 5vw, 3rem)', fontWeight: '800', marginBottom: 'clamp(8px, 2vw, 12px)', maxWidth: '700px' }}>{tour.title || tour.name}</h1>
          <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 24px)', flexWrap: 'wrap', alignItems: 'center', fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)' }}>
            {tour.rating && <span style={{ color: '#fbbf24' }}>★ <strong style={{ color: '#fff' }}>{tour.rating}</strong> <span style={{ color: '#8b949e' }}>({tour.reviews || 0} reviews)</span></span>}
            {(tour.location || tour.destination) && <span style={{ color: '#8b949e' }}>📅 {tour.location || tour.destination}</span>}
            {tour.duration && <span style={{ color: '#a78bfa' }}>🕒 {tour.duration}</span>}
            {tour.groupSize && <span style={{ color: '#8b949e' }}>👥 {tour.groupSize}</span>}
          </div>
        </div>
        <button onClick={() => navigate('/tours')} style={{ position: 'absolute', top: 'clamp(12px, 3vw, 24px)', left: '5%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', padding: 'clamp(8px, 1.5vw, 10px) clamp(12px, 2.5vw, 18px)', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)', fontWeight: '500' }}>← Back to Tours</button>
      </div>

      {/* Layout */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(24px, 5vw, 40px) 5% clamp(40px, 8vw, 60px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(20px, 4vw, 40px)', alignItems: 'start' }}>
        {/* Left */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--surface-border)', marginBottom: 'clamp(20px, 4vw, 32px)', overflowX: 'auto' }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: 'clamp(8px, 2vw, 12px) clamp(14px, 3vw, 20px)', background: 'transparent', border: 'none', borderBottom: activeTab === tab ? '2px solid #7C3AED' : '2px solid transparent', color: activeTab === tab ? '#7C3AED' : '#8b949e', fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', marginBottom: '-1px', whiteSpace: 'nowrap' }}>{tab}</button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', fontWeight: '700', marginBottom: 'clamp(12px, 2.5vw, 16px)' }}>About This Tour</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', marginBottom: 'clamp(20px, 4vw, 32px)' }}>{tour.longDescription || tour.description}</p>
              {tour.highlights && Array.isArray(tour.highlights) && tour.highlights.length > 0 && (
                <>
                  <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: '700', marginBottom: 'clamp(12px, 2.5vw, 16px)' }}>Tour Highlights</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 'clamp(8px, 2vw, 12px)' }}>
                    {tour.highlights.map((h, i) => (
                      <div key={i} className="glass-panel" style={{ padding: 'clamp(8px, 2vw, 12px) clamp(10px, 2vw, 16px)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#7C3AED', fontWeight: 'bold' }}>✓</span>
                        <span style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.92rem)' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'itinerary' && tour.itinerary && Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
            <div>
              <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', fontWeight: '700', marginBottom: 'clamp(16px, 3vw, 24px)' }}>Day-by-Day Itinerary</h2>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '19px', top: '24px', bottom: '24px', width: '2px', background: 'linear-gradient(to bottom, #7C3AED, #FF3366)', borderRadius: '2px' }} />
                {tour.itinerary.map((day, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'clamp(12px, 2.5vw, 20px)', marginBottom: 'clamp(16px, 3vw, 28px)' }}>
                    <div style={{ width: 'clamp(32px, 6vw, 40px)', height: 'clamp(32px, 6vw, 40px)', borderRadius: '50%', background: 'var(--brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', color: '#fff', flexShrink: 0, zIndex: 1 }}>{i + 1}</div>
                    <div className="glass-panel" style={{ flex: 1, borderRadius: '12px', padding: 'clamp(12px, 2.5vw, 20px) clamp(14px, 3vw, 24px)' }}>
                      <div style={{ color: '#a78bfa', fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{day.day}</div>
                      <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', fontWeight: '700', marginBottom: '10px' }}>{day.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && ((tour.inclusions && Array.isArray(tour.inclusions) && tour.inclusions.length > 0) || (tour.exclusions && Array.isArray(tour.exclusions) && tour.exclusions.length > 0)) && (
            <div>
              <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', fontWeight: '700', marginBottom: 'clamp(16px, 3vw, 24px)' }}>What's Included</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(16px, 3vw, 24px)' }}>
                {tour.inclusions && Array.isArray(tour.inclusions) && tour.inclusions.length > 0 && (
                  <div className="glass-panel" style={{ borderRadius: '14px', padding: 'clamp(16px, 3vw, 28px)' }}>
                    <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', fontWeight: '700', marginBottom: 'clamp(12px, 2.5vw, 20px)', color: '#34d399' }}>✅ Inclusions</h3>
                    {tour.inclusions.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ color: '#34d399' }}>✓</span>
                        <span style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', color: 'var(--text-secondary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {tour.exclusions && Array.isArray(tour.exclusions) && tour.exclusions.length > 0 && (
                  <div className="glass-panel" style={{ borderRadius: '14px', padding: 'clamp(16px, 3vw, 28px)' }}>
                    <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', fontWeight: '700', marginBottom: 'clamp(12px, 2.5vw, 20px)', color: '#f87171' }}>❌ Exclusions</h3>
                    {tour.exclusions.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <span style={{ color: '#f87171' }}>✗</span>
                        <span style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', color: 'var(--text-secondary)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(16px, 3vw, 28px)', flexWrap: 'wrap', gap: '12px' }}>
                <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', fontWeight: '700' }}>Traveller Reviews</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{tour.rating || 0}</span>
                  <div>
                    <div style={{ color: '#fbbf24', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}>{'★'.repeat(Math.round(tour.rating || 0))}</div>
                    <div style={{ color: '#8b949e', fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)' }}>{tour.reviews || 0} reviews</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 2.5vw, 20px)' }}>
                {SAMPLE_REVIEWS.map((review, i) => (
                  <div key={i} className="glass-panel" style={{ borderRadius: '14px', padding: 'clamp(14px, 3vw, 24px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: 'clamp(36px, 8vw, 44px)', height: 'clamp(36px, 8vw, 44px)', borderRadius: '50%', background: review.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: '#fff', flexShrink: 0 }}>{review.initials}</div>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{review.name}</div>
                          <div style={{ color: '#8b949e', fontSize: 'clamp(0.75rem, 1.5vw, 0.8rem)' }}>{review.date}</div>
                        </div>
                      </div>
                      <div style={{ color: '#fbbf24', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>{'★'.repeat(review.rating)}</div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — Booking Card */}
        <div style={{ position: 'sticky', top: 'clamp(60px, 10vw, 100px)' }}>
          <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(20px, 4vw, 30px)', border: '1px solid rgba(124,58,237,0.2)' }}>
            <div style={{ marginBottom: 'clamp(14px, 3vw, 20px)' }}>
              <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: '#8b949e', marginBottom: '4px' }}>Starting from</div>
              <div style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{tour.price?.toLocaleString()}</div>
              <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: '#8b949e' }}>per person</div>
            </div>
            <div style={{ borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)', padding: 'clamp(12px, 2.5vw, 20px) 0', marginBottom: 'clamp(12px, 2.5vw, 20px)', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 2vw, 12px)' }}>
              {[['🕒', 'Duration', tour.duration], ['📍', 'Destination', tour.destination || tour.location], ['👥', 'Category', tour.category || tour.groupSize], ['🌟', 'Rating', `${tour.rating || 0} (${tour.reviews || 0} reviews)`]].map(([icon, label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#8b949e', fontSize: 'clamp(0.8rem, 1.5vw, 0.88rem)' }}>{icon} {label}</span>
                  <span style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', fontWeight: '600', textAlign: 'right', maxWidth: '150px' }}>{val || 'N/A'}</span>
                </div>
              ))}
            </div>
            <Link to={`/book/${tour._id}`} className="btn-primary" style={{ width: '100%', padding: 'clamp(10px, 2vw, 15px)', fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', borderRadius: '12px', marginBottom: '12px', display: 'block', textAlign: 'center' }}>🎒 Book This Tour</Link>
            <Link to="/contact" className="btn-outline" style={{ width: '100%', padding: 'clamp(9px, 2vw, 13px)', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', borderRadius: '12px', display: 'block', textAlign: 'center' }}>💬 Ask a Question</Link>
            <div style={{ marginTop: 'clamp(12px, 2.5vw, 20px)', padding: 'clamp(10px, 2vw, 16px)', background: 'rgba(52,211,153,0.08)', borderRadius: '10px', border: '1px solid rgba(52,211,153,0.2)', textAlign: 'center' }}>
              <div style={{ color: '#34d399', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', fontWeight: '600' }}>✅ Free Cancellation</div>
              <div style={{ color: '#8b949e', fontSize: 'clamp(0.7rem, 1.5vw, 0.78rem)', marginTop: '4px' }}>Cancel up to 7 days before for a full refund</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
