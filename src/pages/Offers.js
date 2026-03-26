import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TYPE_COLORS = {
  'Flash': { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.3)' },
  'Seasonal': { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  'Couple': { bg: 'rgba(255,51,102,0.15)', color: '#ff6b8a', border: 'rgba(255,51,102,0.3)' },
  'Group': { bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
  'Budget': { bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  'Limited': { bg: 'rgba(167,139,250,0.15)', color: '#c4b5fd', border: 'rgba(167,139,250,0.3)' },
};

function Offers() {
  const [offers, setOffers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [copiedCode, setCopiedCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const TYPE_FILTERS = ['All', 'Flash', 'Seasonal', 'Couple', 'Group', 'Budget', 'Limited'];

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('/api/tours');
      const toursData = response.data.data ? response.data.data : response.data;
      
      // Filter tours with active discounts
      const offersData = (toursData || [])
        .filter(tour => tour.discount > 0 && tour.offerType !== 'None')
        .map(tour => ({
          id: tour._id,
          title: tour.name,
          badge: tour.offerBadge,
          discount: `${tour.discount}% OFF`,
          originalPrice: tour.price,
          salePrice: Math.round(tour.price * (1 - tour.discount / 100)),
          destination: tour.destination,
          validUntil: tour.offerValidUntil ? `Valid till ${new Date(tour.offerValidUntil).toLocaleDateString()}` : 'Limited time offer',
          code: `TOUR${tour._id.slice(-4).toUpperCase()}`,
          image: tour.images && tour.images[0] ? tour.images[0] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
          type: tour.offerType,
          desc: tour.description,
          tourId: tour._id
        }));
      
      setOffers(offersData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError('Failed to load offers');
      setOffers([]);
      setLoading(false);
    }
  };

  const filtered = filter === 'All' ? offers : offers.filter(o => o.type === filter);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section style={{ padding: '80px 5% 60px', textAlign: 'center', background: 'radial-gradient(circle at 70% 0%, rgba(255,51,102,0.15), transparent 50%), radial-gradient(circle at 20% 100%, rgba(124,58,237,0.1), transparent 50%)', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,51,102,0.15)', border: '1px solid rgba(255,51,102,0.3)', borderRadius: '30px', padding: '6px 16px', fontSize: '0.85rem', color: '#ff6b8a', marginBottom: '20px', letterSpacing: '1px' }}>🔥 EXCLUSIVE DEALS</div>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: '800', marginBottom: '16px' }}>Hot Offers & <span className="text-gradient">Travel Deals</span></h1>
        <p style={{ color: '#8b949e', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 30px' }}>Limited time discounts on our most popular Maharashtra tour packages. Don't miss out!</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,51,102,0.1)', border: '1px solid rgba(255,51,102,0.25)', borderRadius: '12px', padding: '12px 24px' }}>
          <span style={{ fontSize: '1.1rem' }}>⏰</span>
          <span style={{ color: '#ff6b8a', fontWeight: '600', fontSize: '0.9rem' }}>Prices valid for limited time · Book before they expire!</span>
        </div>
      </section>

      {/* Type Filter */}
      <div style={{ display: 'flex', gap: '10px', padding: '24px 5%', borderBottom: '1px solid var(--surface-border)', overflowX: 'auto', scrollbarWidth: 'none', flexWrap: 'wrap' }}>
        {TYPE_FILTERS.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ whiteSpace: 'nowrap', padding: '9px 22px', borderRadius: '30px', border: filter === t ? 'none' : '1px solid #30363d', background: filter === t ? 'var(--brand-gradient)' : 'transparent', color: filter === t ? '#fff' : '#8b949e', fontFamily: 'Outfit,sans-serif', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', boxShadow: filter === t ? '0 4px 15px rgba(124,58,237,0.3)' : 'none' }}>{t}</button>
        ))}
      </div>

      {/* Offers Grid */}
      <section style={{ padding: '40px 5% 60px', maxWidth: '1300px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#8b949e' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #30363d', borderTop: '3px solid #7C3AED', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <p>Loading offers...</p>
          </div>
        ) : offers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(124,58,237,0.05)', border: '1px dashed rgba(124,58,237,0.3)', borderRadius: '16px', color: '#8b949e' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎁</div>
            <h3 style={{ fontSize: '1.3rem', color: '#e6edf3', marginBottom: '10px' }}>No Active Offers</h3>
            <p>Check back soon for amazing deals on your favorite tours!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: '28px' }}>
            {filtered.map(offer => {
              const typeStyle = TYPE_COLORS[offer.type] || TYPE_COLORS['Limited'];
              const savingsAmt = offer.originalPrice - offer.salePrice;
              return (
                <div key={offer.id} className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', display: 'flex', flexDirection: 'column' }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                  {/* Image */}
                  <div style={{ height: '200px', background: 'linear-gradient(135deg,#1c2331,#283046)', position: 'relative', overflow: 'hidden' }}>
                    <img src={offer.image} alt={offer.destination} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'transform 0.5s ease' }} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80'; }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                    {/* Discount Badge */}
                    <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'var(--brand-gradient)', borderRadius: '10px', padding: '8px 14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>{offer.discount}</div>
                    </div>
                    {/* Type Badge */}
                    <div style={{ position: 'absolute', top: '14px', left: '14px', background: typeStyle.bg, border: `1px solid ${typeStyle.border}`, borderRadius: '20px', padding: '4px 12px', fontSize: '0.78rem', color: typeStyle.color, fontWeight: '700', backdropFilter: 'blur(4px)' }}>{offer.badge || offer.type}</div>
                    <div style={{ position: 'absolute', bottom: '12px', left: '14px', fontWeight: '700', fontSize: '1rem', color: '#fff' }}>{offer.destination}</div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.3' }}>{offer.title}</h3>
                    <p style={{ color: '#8b949e', fontSize: '0.9rem', lineHeight: '1.6' }}>{offer.desc}</p>

                    {/* Price Display */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{offer.salePrice.toLocaleString()}</span>
                      <span style={{ fontSize: '1rem', color: '#8b949e', textDecoration: 'line-through' }}>₹{offer.originalPrice.toLocaleString()}</span>
                      <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '700', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '6px', padding: '2px 8px' }}>Save ₹{savingsAmt.toLocaleString()}</span>
                    </div>

                    {/* Coupon Code */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(124,58,237,0.08)', border: '1px dashed rgba(124,58,237,0.3)', borderRadius: '10px', padding: '12px 14px' }}>
                      <span style={{ color: '#8b949e', fontSize: '0.82rem' }}>Coupon Code:</span>
                      <code style={{ color: '#a78bfa', fontWeight: '700', fontSize: '0.9rem', flex: 1 }}>{offer.code}</code>
                      <button onClick={() => copyCode(offer.code)} style={{ background: copiedCode === offer.code ? 'rgba(52,211,153,0.2)' : 'rgba(124,58,237,0.2)', border: 'none', borderRadius: '6px', color: copiedCode === offer.code ? '#34d399' : '#a78bfa', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontSize: '0.78rem', fontWeight: '600' }}>
                        {copiedCode === offer.code ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>

                    <div style={{ color: '#8b949e', fontSize: '0.8rem' }}>⏳ {offer.validUntil}</div>

                    <Link to={`/book/${offer.tourId}`} className="btn-primary" style={{ textAlign: 'center', padding: '13px', fontSize: '0.97rem', borderRadius: '10px', marginTop: 'auto' }}>
                      Grab This Deal →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.12), transparent 65%)', borderTop: '1px solid var(--surface-border)', padding: '70px 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>Never Miss a <span className="text-gradient">Deal!</span></h2>
        <p style={{ color: '#8b949e', marginBottom: '28px', fontSize: '1.05rem' }}>Subscribe and get exclusive offers delivered to your inbox.</p>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input type="email" placeholder="Enter your email address" style={{ flex: 1, minWidth: '220px', padding: '14px 18px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontFamily: 'Outfit,sans-serif', fontSize: '0.97rem', outline: 'none' }} onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
          <button className="btn-primary" style={{ padding: '14px 24px', whiteSpace: 'nowrap' }}>🔔 Subscribe</button>
        </div>
      </section>
    </div>
  );
}

export default Offers;
