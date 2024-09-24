import axios from 'axios';

const api = axios.create({
    // baseURL: `https://internnexus.onrender.com`,
    baseURL: `http://localhost:5001/`,
    headers: {
      "Content-Type": "application/json",
    },
  });

api.interceptors.request.use(function(config) {
    
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config; 
});

export default api;