import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.navimumbaipropertydeals.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    // Some APIs return 200 with success: false
    if (response.data && response.data.success === false) {
      return Promise.reject({
        response: response,
        message: response.data.message || "Operation failed"
      });
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject({ ...error, message });
  }
);

export default api;
