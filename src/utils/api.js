import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (email, password) => API.post('/auth/login', { email, password }),
  verifyEmail: (token) => API.post('/auth/verify-email', { token }),
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword, confirmPassword) =>
    API.post('/auth/reset-password', { token, newPassword, confirmPassword }),
  getProfile: () => API.get('/auth/profile'),
};

// Tours endpoints
export const toursAPI = {
  getAllTours: (filters) => API.get('/tours', { params: filters }),
  getTourById: (id) => API.get(`/tours/${id}`),
  createTour: (tourData) => API.post('/tours', tourData),
  updateTour: (id, tourData) => API.put(`/tours/${id}`, tourData),
  deleteTour: (id) => API.delete(`/tours/${id}`),
};

// Bookings endpoints
export const bookingsAPI = {
  createBooking: (bookingData) => API.post('/bookings', bookingData),
  getUserBookings: (userId) => API.get(`/bookings/${userId}`),
  updateBooking: (id, bookingData) => API.put(`/bookings/${id}`, bookingData),
  cancelBooking: (id) => API.delete(`/bookings/${id}`),
};

// Reviews endpoints
export const reviewsAPI = {
  addReview: (reviewData) => API.post('/reviews', reviewData),
  getTourReviews: (tourId) => API.get(`/reviews/${tourId}`),
  updateReview: (id, reviewData) => API.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => API.delete(`/reviews/${id}`),
};

export default API;
