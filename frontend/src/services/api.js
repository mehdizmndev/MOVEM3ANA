import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ─── Token management ────────────────────────────────────────────
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('auth_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
  }
}

// Restore token on app load
const savedToken = localStorage.getItem('auth_token');
if (savedToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
}

// ─── Response interceptor ────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      setAuthToken(null);
      localStorage.removeItem('user');
      // Only redirect if not already on auth page
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ────────────────────────────────────────────────────
export const auth = {
  login: (email, password) => api.post('/login', { email, password }),
  register: (data) => api.post('register', data),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
};

// ─── Clubs API ───────────────────────────────────────────────────
export const clubs = {
  index: (params) => api.get('/clubs', { params }),
  show: (id) => api.get(`/clubs/${id}`),
  bySport: (sport) => api.get(`/clubs/sport/${sport}`),
  byLocation: (city) => api.get(`/clubs/location/${city}`),
  store: (data) => api.post('/clubs', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/clubs/${id}`, data),
};

// ─── Activities API ──────────────────────────────────────────────
export const activities = {
  index: (params) => api.get('/activities', { params }),
  show: (id) => api.get(`/activities/${id}`),
  bySport: (sport) => api.get(`/activities/sport/${sport}`),
  byClub: (clubId) => api.get(`/activities/club/${clubId}`),
  byCity: (city) => api.get(`/activities/city/${city}`),
  store: (data) => api.post('/activities', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

// ─── Events API ──────────────────────────────────────────────────
export const events = {
  index: () => api.get('/events'),
  show: (id) => api.get(`/events/${id}`),
  byClub: (clubId) => api.get(`/events/club/${clubId}`),
  myEvents: (status) => api.get('/my-events', { params: { status } }),
  store: (data) => api.post('/events', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/events/${id}`),
  enroll: (id) => api.post(`/events/${id}/enroll`),
  cancel: (id) => api.post(`/events/${id}/cancel`),
};

// ─── Promotions API ──────────────────────────────────────────────
export const promotions = {
  index: () => api.get('/promotions'),
  show: (id) => api.get(`/promotions/${id}`),
};

// ─── Users API ───────────────────────────────────────────────────
export const users = {
  index: () => api.get('/users'),
  show: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
};

// ─── Subscriptions API ──────────────────────────────────────────
export const subscriptions = {
  store: (data) => api.post('/subscriptions', data),
  byUser: (userId) => api.get(`/subscriptions/user/${userId}`),
};

// ─── Reviews API ─────────────────────────────────────────────────
export const reviews = {
  byClub: (clubId) => api.get(`/reviews/club/${clubId}`),
  store: (data) => api.post('/reviews', data),
};

// ─── Search API ──────────────────────────────────────────────────
export const search = {
  clubs: (query) => api.get(`/search/clubs?q=${query}`),
  events: (query) => api.get(`/search/events?q=${query}`),
};

// ─── Stats API ───────────────────────────────────────────────────
export const stats = {
  dashboard: () => api.get('/stats/dashboard'),
  clubs: () => api.get('/stats/clubs'),
  events: () => api.get('/stats/events'),
  users: () => api.get('/stats/users'),
};

// ─── Admin API ───────────────────────────────────────────────────
export const admin = {
  allClubs: (status) => api.get('/admin/clubs', { params: { status } }),
  updateClubStatus: (id, data) => api.put(`/admin/clubs/${id}/status`, data),
  allEvents: (status) => api.get('/admin/events', { params: { status } }),
  allPromotions: () => api.get('/admin/promotions'),
  approveClub: (id, approved = true) => api.put(`/admin/approve-club/${id}`, { approved }),
  suspendUser: (id, suspend = true) => api.put(`/admin/suspend-user/${id}`, { suspend }),
};

// ─── User Profile API ─────────────────────────────────────────────
export const profile = {
  update: (data) => api.put('/users/profile', data),
  updatePassword: (data) => api.put('/users/profile/password', data),
};

// ─── General API ─────────────────────────────────────────────────
export const general = {
  contact: (data) => api.post('/contact', data),
};

export default api;