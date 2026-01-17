// the base configuration
// the bridge to render server

import axios from 'axios';

const BASE_URL = "https://pesapal-database-challange-1.onrender.com";
export const axiosClient = axios.create({
    baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

// adds a response interceptor to handle errors gracefully
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);