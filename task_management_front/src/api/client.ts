import axios from 'axios';
import process from 'process';

const api = axios.create({
  baseURL:
    (import.meta as any).env?.REACT_APP_API_URL ||
    (process?.env && process?.env.REACT_APP_API_URL) ||
    '/api/v1',
  withCredentials: true,
});

// Request interceptor for adding JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRedirecting = false;

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !isRedirecting &&
      !window.location.pathname.startsWith('/login') &&
      !window.location.pathname.startsWith('/register')
    ) {
      isRedirecting = true;
      localStorage.removeItem('token'); // Optional: clear token
      setTimeout(() => {
        window.location.href = '/login';
        isRedirecting = false;
      }, 0);
    }
    return Promise.reject(error);
  }
);

export default api;
