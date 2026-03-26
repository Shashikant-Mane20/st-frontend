import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');
    
    if(form.password !== form.confirmPassword) {
      setIsError(true);
      return setMessage("Passwords do not match");
    }
    
    setLoading(true);
    try {
      // Connect to the backend route!
      const res = await axios.post('/api/auth/register', form);
      setMessage('Registration successful!');
      setIsError(false);
      setTimeout(() => navigate('/'), 1500); // Redirect to home
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMessage(err.response?.data?.message || 'Error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', padding: '40px 20px', background: 'radial-gradient(circle at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: 'var(--card-radius)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '10px' }}>Create an Account</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Join us and start exploring the world</p>
        </div>

        {message && (
          <div style={{ 
            padding: '12px 15px', 
            borderRadius: 'var(--btn-radius)', 
            marginBottom: '20px', 
            background: isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: isError ? '#f87171' : '#34d399',
            border: `1px solid ${isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <input className="input-field" type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <input className="input-field" type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <input className="input-field" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          </div>
          <div>
            <input className="input-field" type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
          </div>
          <div>
            <input className="input-field" type="tel" name="phone" placeholder="Phone Number (Optional)" value={form.phone} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#7C3AED', fontWeight: '600' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
