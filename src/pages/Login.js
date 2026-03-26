import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../utils/auth';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');

    if (!form.email || !form.password) {
      setIsError(true);
      return setMessage('Please fill in all fields.');
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', form);
      // Save JWT token and user data to localStorage
      setToken(res.data.token);
      setUser(res.data.user);

      setMessage(`Welcome back, ${res.data.user.name}! Redirecting...`);
      setIsError(false);
      // Redirect to home after brief success flash
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '40px 20px',
        background:
          'radial-gradient(circle at 30% 40%, rgba(124,58,237,0.12) 0%, transparent 55%), radial-gradient(circle at 75% 80%, rgba(255,51,102,0.08) 0%, transparent 50%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '460px' }}>

        {/* Card */}
        <div
          className="glass-panel"
          style={{ borderRadius: 'var(--card-radius)', padding: '44px 40px' }}
        >
          {/* Logo mark */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'var(--brand-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#fff',
                boxShadow: '0 8px 24px rgba(124,58,237,0.35)',
              }}
            >
              ST
            </div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: '800',
                marginBottom: '8px',
                lineHeight: 1.2,
              }}
            >
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.97rem' }}>
              Sign in to continue your journey
            </p>
          </div>

          {/* Alert message */}
          {message && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--btn-radius)',
                marginBottom: '22px',
                background: isError
                  ? 'rgba(239,68,68,0.1)'
                  : 'rgba(16,185,129,0.1)',
                color: isError ? '#f87171' : '#34d399',
                border: `1px solid ${
                  isError ? 'rgba(239,68,68,0.25)' : 'rgba(16,185,129,0.25)'
                }`,
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              {isError ? '⚠️' : '✅'} {message}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            {/* Email */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                  letterSpacing: '0.5px',
                }}
              >
                EMAIL ADDRESS
              </label>
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <label
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.5px',
                  }}
                >
                  PASSWORD
                </label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: '0.83rem',
                    color: '#7C3AED',
                    fontWeight: '600',
                  }}
                >
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  className="input-field"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  style={{ paddingRight: '50px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    padding: '0',
                    lineHeight: 1,
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', marginTop: '6px', padding: '14px', fontSize: '1rem' }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }}></span>
                  Signing in...
                </span>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '24px 0',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              New to Shreeja Tours?
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--surface-border)' }} />
          </div>

          <Link
            to="/register"
            className="btn-outline"
            style={{ display: 'block', textAlign: 'center', padding: '13px', fontSize: '0.97rem' }}
          >
            Create an Account
          </Link>
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '24px',
            color: 'var(--text-secondary)',
            fontSize: '0.82rem',
          }}
        >
          <span>🔒 Secure Login</span>
          <span>🛡️ Data Protected</span>
          <span>✈️ 15,000+ Travellers</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
