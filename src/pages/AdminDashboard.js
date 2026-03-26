import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({ tours: 0, bookings: 0, users: 0 });
  const [activeTab, setActiveTab] = useState('overview');
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Tour CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    category: 'Hill Station',
    price: '',
    duration: '',
    description: '',
    maxGroupSize: 10,
    images: []
  });

  const TOUR_CATEGORIES = ['Hill Station', 'Beach', 'Heritage', 'Wildlife', 'Pilgrimage'];

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (activeTab === 'overview') {
        const [toursRes, bookingsRes] = await Promise.all([
          axios.get(`${API_URL}/tours`),
          axios.get(`${API_URL}/bookings`, config)
        ]);
        setStats({
          tours: toursRes.data.count || (toursRes.data.data ? toursRes.data.data.length : toursRes.data.length),
          bookings: bookingsRes.data.count || (bookingsRes.data.data ? bookingsRes.data.data.length : bookingsRes.data.length),
          users: 0 // Fetch users count if needed
        });
      } else if (activeTab === 'tours') {
        const res = await axios.get(`${API_URL}/tours`);
        setTours(res.data.data || res.data);
      } else if (activeTab === 'bookings') {
        const res = await axios.get(`${API_URL}/bookings`, config);
        setBookings(res.data.data || res.data);
      }
    } catch (err) {
      setError('Failed to fetch data. Are you sure you are an admin?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleEditTour = (tour) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name,
      destination: tour.destination,
      category: tour.category || 'Hill Station',
      price: tour.price,
      duration: tour.duration,
      description: tour.description,
      maxGroupSize: tour.maxGroupSize || 10,
      images: tour.images || []
    });
    setIsModalOpen(true);
  };

  const handleDeleteTour = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      await axios.delete(`${API_URL}/tours/${id}`, config);
      fetchData();
    } catch (err) {
      alert('Failed to delete tour');
    }
  };

  const handleSaveTour = async (e) => {
    e.preventDefault();
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editingTour) {
        await axios.put(`${API_URL}/tours/${editingTour._id}`, formData, config);
      } else {
        await axios.post(`${API_URL}/tours`, formData, config);
      }
      setIsModalOpen(false);
      setEditingTour(null);
      setFormData({ name: '', destination: '', category: 'Hill Station', price: '', duration: '', description: '', maxGroupSize: 10, images: [] });
      fetchData();
    } catch (err) {
      alert('Failed to save tour: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar glass-panel">
        <h2 className="text-gradient">Admin Panel</h2>
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>📊 Overview</button>
        <button className={activeTab === 'tours' ? 'active' : ''} onClick={() => setActiveTab('tours')}>🗺️ Manage Tours</button>
        <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>🎟️ All Bookings</button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="overview-grid">
                <div className="stat-card glass-panel">
                  <span className="stat-icon">🗺️</span>
                  <div className="stat-info">
                    <h3>Total Tours</h3>
                    <p className="stat-value">{stats.tours}</p>
                  </div>
                </div>
                <div className="stat-card glass-panel">
                  <span className="stat-icon">🎟️</span>
                  <div className="stat-info">
                    <h3>Total Bookings</h3>
                    <p className="stat-value">{stats.bookings}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tours' && (
              <div className="tours-management">
                <div className="section-header">
                  <h2>Tour Management</h2>
                  <button className="btn-primary" onClick={() => { setEditingTour(null); setIsModalOpen(true); }}>Add New Tour</button>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Destination</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.map(tour => (
                      <tr key={tour._id}>
                        <td style={{ textAlign: 'center' }}>
                          {tour.images && tour.images[0] ? (
                            <img src={tour.images[0]} alt={tour.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} onError={(e) => e.target.style.display = 'none'} />
                          ) : (
                            <span style={{ color: '#8b949e' }}>No image</span>
                          )}
                        </td>
                        <td>{tour.name}</td>
                        <td><span style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>{tour.category || 'N/A'}</span></td>
                        <td>{tour.destination}</td>
                        <td>₹{tour.price}</td>
                        <td>
                          <button className="btn-icon" onClick={() => handleEditTour(tour)}>✏️</button>
                          <button className="btn-icon delete" onClick={() => handleDeleteTour(tour._id)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bookings-management">
                <div className="section-header">
                  <h2>All Bookings</h2>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tour</th>
                      <th>User</th>
                      <th>Guests</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking._id}>
                        <td>{booking.tourId?.name || 'N/A'}</td>
                        <td>{booking.userId?.name || 'N/A'}</td>
                        <td>{booking.numberOfPeople}</td>
                        <td><span className={`status-badge ${booking.status}`}>{booking.status}</span></td>
                        <td>
                          <button className="btn-icon">👁️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal glass-panel">
            <h3>{editingTour ? 'Edit Tour' : 'Add New Tour'}</h3>
            <form onSubmit={handleSaveTour}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tour Name</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Destination</label>
                  <input name="destination" value={formData.destination} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '10px',
                      padding: '12px 15px',
                      color: '#fff',
                      fontSize: '1rem',
                      transition: 'border-color 0.3s',
                      fontFamily: 'Outfit,sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    {TOUR_CATEGORIES.map(cat => (
                      <option key={cat} value={cat} style={{ background: '#1c2331', color: '#fff' }}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input name="duration" value={formData.duration} onChange={handleInputChange} required placeholder="e.g. 5 Days / 4 Nights" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="4"></textarea>
              </div>

              {/* Image Fields */}
              <div className="form-group">
                <label>Tour Images (URLs)</label>
                <div style={{ marginBottom: '12px' }}>
                  {formData.images.map((image, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <input
                          type="text"
                          placeholder={`Paste image URL here (e.g., https://example.com/image.jpg)`}
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          autoComplete="off"
                          style={{ 
                            width: '100%', 
                            padding: '12px 15px', 
                            borderRadius: '10px', 
                            border: '1px solid var(--surface-border)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#fff', 
                            fontFamily: 'Outfit,sans-serif',
                            fontSize: '1rem',
                            transition: 'all 0.3s',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--brand-primary)'}
                          onBlur={(e) => e.target.style.borderColor = 'var(--surface-border)'}
                        />
                      </div>
                      {image && (
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '6px',
                          border: '1px solid rgba(248,113,113,0.3)',
                          background: 'rgba(248,113,113,0.1)',
                          color: '#f87171',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                          flexShrink: 0,
                          transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = 'rgba(248,113,113,0.2)';
                          e.target.style.borderColor = 'rgba(248,113,113,0.5)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = 'rgba(248,113,113,0.1)';
                          e.target.style.borderColor = 'rgba(248,113,113,0.3)';
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addImageField}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(124,58,237,0.4)',
                    background: 'rgba(124,58,237,0.1)',
                    color: '#a78bfa',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(124,58,237,0.15)';
                    e.target.style.borderColor = 'rgba(124,58,237,0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(124,58,237,0.1)';
                    e.target.style.borderColor = 'rgba(124,58,237,0.4)';
                  }}
                >
                  + Add Image URL
                </button>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Tour</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
