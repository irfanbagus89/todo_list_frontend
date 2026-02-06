import axios from 'axios';

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
fetcher.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
fetcher.interceptors.response.use(
  (response) => {
    // Handle standardized response format from backend
    // Backend returns: { message: "...", data: ... }
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      // Return just the data part for easier consumption in services
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    // Handle error responses with standardized format
    if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      // Extract error message from standardized format
      error.message = error.response.data.message;
    }
    
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default fetcher;
