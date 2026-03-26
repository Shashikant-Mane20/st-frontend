import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tours from your backend connected to MongoDB!
    const fetchTours = async () => {
      try {
        const response = await axios.get('/api/tours');
        // Depending on your backend, tours might be in response.data or response.data.data
        setTours(response.data.data ? response.data.data : response.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTours();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ 
        padding: '100px 5%', 
        textAlign: 'center', 
        background: 'radial-gradient(circle at top right, rgba(124, 58, 237, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(255, 51, 102, 0.1), transparent 40%)',
        borderBottom: '1px solid var(--surface-border)'
      }}>
        <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
          Discover the World <br />
          with <span className="text-gradient">Shreeja Tours And Travels</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Experience breathtaking destinations, exclusive packages, and unforgettable memories tailored just for you.
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Explore Tours</button>
          <button className="btn-outline" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>Watch Video</button>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="page-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '10px' }}>Popular packages</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Handpicked destinations for your next adventure</p>
          </div>
          <button className="btn-outline">View All</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-secondary)' }}>
            <div style={{ 
              width: '40px', height: '40px', border: '3px solid var(--surface-border)', 
              borderTop: '3px solid #7C3AED', borderRadius: '50%', margin: '0 auto 20px',
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            Loading awesome tours...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {tours.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', background: 'var(--surface-color)', borderRadius: 'var(--card-radius)', border: '1px dashed var(--surface-border)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌍</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No tours available</h3>
                <p style={{ color: 'var(--text-secondary)' }}>We're adding new exciting destinations soon!</p>
              </div>
            ) : (
              tours.map(tour => (
                <div key={tour._id} className="glass-panel" style={{ 
                  borderRadius: 'var(--card-radius)', overflow: 'hidden', 
                  transition: 'transform 0.3s ease', cursor: 'pointer' 
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ height: '220px', background: 'var(--surface-color)', position: 'relative', overflow: 'hidden' }}>
                    <img 
                      src={tour.image || (tour.images && tour.images[0]) || 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80'} 
                      alt={tour.name || tour.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80'; }}
                    />
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                      ₹{tour.price}
                    </div>
                  </div>
                  <div style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ffc107', fontSize: '0.9rem', marginBottom: '10px' }}>
                      ★ 4.8 (120 reviews)
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '15px' }}>{tour.name || tour.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {tour.description || 'Experience the beauty of this amazing destination with our exclusive tour package designed just for you.'}
                    </p>
                    <button className="btn-primary" style={{ width: '100%' }}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
