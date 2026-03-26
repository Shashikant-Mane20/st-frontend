import React, { useState } from 'react';

const inputStyle = { width: '100%', padding: '13px 16px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontFamily: 'Outfit,sans-serif', fontSize: '0.97rem', outline: 'none', transition: 'border-color 0.25s ease' };
const labelStyle = { display: 'block', marginBottom: '7px', fontSize: '0.88rem', color: '#8b949e', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };

const FAQS = [
  { q: 'How do I book a tour?', a: 'Simply browse our Destinations page, click on your preferred tour, and click "Book This Tour". Fill in your details and confirm the booking.' },
  { q: 'What is the cancellation policy?', a: 'We offer free cancellation up to 7 days before your travel date. Cancellations within 7 days may attract a 20% cancellation fee.' },
  { q: 'Are the tours suitable for families with children?', a: 'Yes! Most of our tours are family-friendly. We mention any age restrictions or special considerations on each tour\'s detail page.' },
  { q: 'Do you offer customized tour packages?', a: 'Absolutely! Contact us via the form below or call us directly. Our team will craft a personalized itinerary just for you.' },
  { q: 'What is included in the tour price?', a: 'Each tour clearly lists its inclusions such as accommodation, meals, transport, and guide. Please check individual tour pages for specifics.' },
];

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section style={{ padding: 'clamp(50px, 10vw, 80px) 5% clamp(40px, 8vw, 60px)', textAlign: 'center', background: 'radial-gradient(circle at 70% 0%, rgba(124,58,237,0.12), transparent 50%), radial-gradient(circle at 20% 100%, rgba(255,51,102,0.08), transparent 50%)', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '30px', padding: '6px 16px', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#a78bfa', marginBottom: '20px', letterSpacing: '1px' }}>📞 CONTACT US</div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 3.2rem)', fontWeight: '800', marginBottom: '16px' }}>We'd Love to <span className="text-gradient">Hear From You</span></h1>
        <p style={{ color: '#8b949e', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', maxWidth: '580px', margin: '0 auto' }}>Have questions about a tour or need help planning your trip? Our team is here to help 7 days a week.</p>
      </section>

      {/* Contact Info Cards */}
      <section style={{ padding: 'clamp(30px, 6vw, 50px) 5%', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(12px, 3vw, 20px)' }}>
          {[
            { icon: '📍', title: 'Our Office', lines: ['Shreeja Tours & Travels', 'FC Road, Shivaji Nagar', 'Pune – 411005, Maharashtra'], color: '#FF3366' },
            { icon: '📞', title: 'Call Us', lines: ['+91 98765 43210', '+91 98765 43211', 'Mon–Sat: 9 AM – 7 PM'], color: '#7C3AED' },
            { icon: '📧', title: 'Email Us', lines: ['hello@shreejatours.in', 'bookings@shreejatours.in', 'We reply within 2 hours'], color: '#06B6D4' },
            { icon: '💬', title: 'WhatsApp', lines: ['+91 98765 43210', 'Chat with our team', 'Quick responses guaranteed'], color: '#10B981' },
          ].map((card, i) => (
            <div key={i} className="glass-panel" style={{ borderRadius: '16px', padding: 'clamp(16px, 3vw, 28px) clamp(16px, 3vw, 24px)', textAlign: 'center', transition: 'transform 0.3s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: `${card.color}22`, border: `1px solid ${card.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 16px' }}>{card.icon}</div>
              <h3 style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', fontWeight: '700', marginBottom: '10px' }}>{card.title}</h3>
              {card.lines.map((line, j) => <p key={j} style={{ color: j === 2 ? card.color : '#8b949e', fontSize: 'clamp(0.8rem, 1.5vw, 0.88rem)', lineHeight: '1.8' }}>{line}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px, 8vw, 60px) 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(30px, 5vw, 50px)', alignItems: 'start' }}>
        {/* Form */}
        <div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: '800', marginBottom: '8px' }}>Send Us a <span className="text-gradient">Message</span></h2>
          <p style={{ color: '#8b949e', marginBottom: '32px', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Fill out the form and our team will get back to you within 2 hours.</p>
          {submitted ? (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(30px, 5vw, 50px)', textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '16px' }}>✅</div>
              <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: '700', marginBottom: '10px' }}>Message Sent!</h3>
              <p style={{ color: '#8b949e', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>We've received your message and will reply to <strong style={{ color: '#a78bfa' }}>{form.email}</strong> within 2 hours.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }} className="btn-primary" style={{ marginTop: '24px', padding: '12px 28px' }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-panel" style={{ borderRadius: '20px', padding: 'clamp(24px, 4vw, 36px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="Raj Patil" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input style={inputStyle} name="email" type="email" value={form.email} onChange={handleChange} placeholder="raj@example.com" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input style={inputStyle} name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Subject *</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a subject</option>
                    <option>Tour Inquiry</option>
                    <option>Custom Package Request</option>
                    <option>Booking Help</option>
                    <option>Cancellation / Refund</option>
                    <option>General Question</option>
                    <option>Feedback</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Your Message *</label>
                <textarea style={{ ...inputStyle, height: '140px', resize: 'vertical' }} name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help you..." required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '15px', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>📤 Send Message</button>
            </form>
          )}
        </div>

        {/* Map + FAQ */}
        <div>
          {/* Map placeholder */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '32px', border: '1px solid #30363d' }}>
            <iframe
              title="Shreeja Tours Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2593169699453!2d73.84287631489685!3d18.520430087400585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sFC%20Road%2C%20Shivaji%20Nagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%"
              height="280"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          {/* FAQ */}
          <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', fontWeight: '700', marginBottom: '20px' }}>Frequently Asked <span className="text-gradient">Questions</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-panel" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: 'clamp(12px, 2vw, 16px) clamp(16px, 3vw, 20px)', background: 'transparent', border: 'none', color: '#e6edf3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', fontWeight: '600', textAlign: 'left', gap: '10px' }}>
                  <span>{faq.q}</span>
                  <span style={{ color: '#7C3AED', fontSize: '1.2rem', flexShrink: 0, transition: 'transform 0.3s ease', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: 'clamp(12px, 2vw, 16px) clamp(16px, 3vw, 20px)', color: '#8b949e', lineHeight: '1.7', fontSize: 'clamp(0.8rem, 1.5vw, 0.92rem)', borderTop: '1px solid #30363d' }}>
                    <div style={{ paddingTop: '12px' }}>{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Hours Banner */}
      <section style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.1), transparent 65%)', borderTop: '1px solid var(--surface-border)', padding: 'clamp(30px, 6vw, 50px) 5%', textAlign: 'center' }}>
        <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: '700', marginBottom: '8px' }}>Office Hours</h3>
        <p style={{ color: '#8b949e', marginBottom: '20px', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Our team is available to assist you during the following hours</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(20px, 4vw, 40px)', flexWrap: 'wrap' }}>
          {[['Monday – Friday', '9:00 AM – 7:00 PM'], ['Saturday', '9:00 AM – 5:00 PM'], ['Sunday', 'Closed (WhatsApp only)']].map(([day, time], i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: '700', marginBottom: '4px', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{day}</div>
              <div style={{ color: '#a78bfa', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>{time}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Contact;
