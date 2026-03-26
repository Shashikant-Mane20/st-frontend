import React from 'react';
import { Link } from 'react-router-dom';

const STATS = [
  { value: '10+', label: 'Years of Experience', icon: '🏆' },
  { value: '500+', label: 'Tours Completed', icon: '✈️' },
  { value: '15,000+', label: 'Happy Travellers', icon: '😊' },
  { value: '50+', label: 'Destinations', icon: '🗺️' },
];

const TEAM = [
  {
    name: 'Shreeja Kulkarni',
    role: 'Founder & CEO',
    bio: 'Passionate traveller with 15+ years of experience crafting unforgettable journeys across India and beyond.',
    initials: 'SK',
    gradient: 'linear-gradient(135deg, #FF3366, #7C3AED)',
  },
  {
    name: 'Rahul Patil',
    role: 'Head of Tours & Operations',
    bio: 'Expert in Maharashtra tourism with deep knowledge of local culture, hidden gems, and seamless trip planning.',
    initials: 'RP',
    gradient: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
  },
  {
    name: 'Priya Deshmukh',
    role: 'Customer Experience Lead',
    bio: 'Dedicated to ensuring every traveller feels looked after — from first inquiry to safe return home.',
    initials: 'PD',
    gradient: 'linear-gradient(135deg, #06B6D4, #10B981)',
  },
];

const VALUES = [
  {
    icon: '🛡️',
    title: 'Trust & Transparency',
    desc: 'No hidden fees. No surprises. We believe in honest pricing and clear communication at every step.',
  },
  {
    icon: '🌿',
    title: 'Responsible Tourism',
    desc: 'We promote eco-friendly travel that respects local communities, cultures, and the natural environment.',
  },
  {
    icon: '🎯',
    title: 'Tailored Experiences',
    desc: 'Every traveller is unique. We craft personalised itineraries that match your pace, budget, and passions.',
  },
  {
    icon: '🤝',
    title: 'Dedicated Support',
    desc: '24/7 support before, during, and after your trip. Our team is always here when you need us.',
  },
  {
    icon: '💎',
    title: 'Premium Quality',
    desc: 'Carefully vetted hotels, guides, and transport to ensure the highest quality travel experience.',
  },
  {
    icon: '🔄',
    title: 'Flexible Booking',
    desc: 'Life is unpredictable. We offer flexible cancellation policies so you can book with peace of mind.',
  },
];

function About() {
  return (
    <div className="animate-fade-in">

      {/* ── Hero ── */}
      <section style={{
        padding: '100px 5% 80px',
        textAlign: 'center',
        background: 'radial-gradient(circle at 70% 0%, rgba(124,58,237,0.15) 0%, transparent 55%), radial-gradient(circle at 20% 100%, rgba(255,51,102,0.1) 0%, transparent 50%)',
        borderBottom: '1px solid var(--surface-border)',
      }}>
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '30px', padding: '6px 18px', fontSize: '0.85rem', color: '#a78bfa', marginBottom: '24px', letterSpacing: '1px' }}>
          🌍 OUR STORY
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '24px' }}>
          Turning Dreams into <br />
          <span className="text-gradient">Unforgettable Journeys</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 40px', lineHeight: '1.8' }}>
          Shreeja Tours And Travels was born from a single belief — that every person deserves to experience the magic of travel.
          Since 2014, we have been Maharashtra's most trusted travel companion, curating experiences that blend adventure, culture, and comfort.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/tours" className="btn-primary" style={{ padding: '14px 30px', fontSize: '1rem' }}>Explore Packages</Link>
          <Link to="/register" className="btn-outline" style={{ padding: '14px 30px', fontSize: '1rem' }}>Join Us</Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '70px 5%', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
          {STATS.map((s, i) => (
            <div key={i} className="glass-panel" style={{ borderRadius: 'var(--card-radius)', padding: '36px 24px', textAlign: 'center', transition: 'transform 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ fontSize: '2.8rem', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px' }}>
                {s.value}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '500' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid var(--surface-border)' }}>
        <div className="page-container" style={{ padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* Mission */}
          <div className="glass-panel" style={{ borderRadius: 'var(--card-radius)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(255,51,102,0.15), transparent)', borderRadius: '50%' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🚀</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '16px' }}>Our Mission</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
              To make travel accessible, meaningful, and memorable for every person — by delivering personalised tour experiences across Maharashtra and India, with unmatched hospitality and care.
            </p>
          </div>
          {/* Vision */}
          <div className="glass-panel" style={{ borderRadius: 'var(--card-radius)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent)', borderRadius: '50%' }} />
            <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🌟</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '16px' }}>Our Vision</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
              To become India's leading regional travel brand — celebrated for authentic cultural experiences, responsible tourism, and a community of travellers who explore the world with purpose.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '55px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '14px' }}>
            What We Stand <span className="text-gradient">For</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            Six core values that guide every tour, every interaction, and every decision we make.
          </p>
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '24px' }}>
          {VALUES.map((v, i) => (
            <div key={i} className="glass-panel" style={{ borderRadius: 'var(--card-radius)', padding: '30px', display: 'flex', gap: '20px', alignItems: 'flex-start', transition: 'transform 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>{v.icon}</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7' }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ padding: '80px 5%', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '55px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '14px' }}>
            Meet the <span className="text-gradient">Team</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            The passionate people behind every journey we create.
          </p>
        </div>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {TEAM.map((member, i) => (
            <div key={i} className="glass-panel" style={{ borderRadius: 'var(--card-radius)', padding: '36px 30px', textAlign: 'center', transition: 'transform 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Avatar */}
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: member.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.6rem', fontWeight: '700', color: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                {member.initials}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px' }}>{member.name}</h3>
              <div style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: '600', marginBottom: '14px', letterSpacing: '0.5px' }}>{member.role}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact Info ── */}
      <section style={{ padding: '70px 5%', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '800', marginBottom: '12px' }}>
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>We'd love to help you plan your next adventure.</p>
        </div>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {[
            { icon: '📍', label: 'Address', value: 'Pune, Maharashtra, India' },
            { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
            { icon: '📧', label: 'Email', value: 'hello@shreejatours.in' },
            { icon: '🕘', label: 'Office Hours', value: 'Mon–Sat: 9 AM – 7 PM' },
          ].map((item, i) => (
            <div key={i} className="glass-panel" style={{ borderRadius: 'var(--card-radius)', padding: '28px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{item.label}</div>
              <div style={{ fontSize: '1rem', fontWeight: '600' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '100px 5%',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, rgba(124,58,237,0.12) 0%, transparent 65%)',
      }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', marginBottom: '16px' }}>
          Ready to Start Your <span className="text-gradient">Adventure?</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto 40px', lineHeight: '1.8' }}>
          Browse our curated Maharashtra packages and book the trip of a lifetime today.
        </p>
        <Link to="/tours" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
          Browse Destinations →
        </Link>
      </section>

    </div>
  );
}

export default About;
