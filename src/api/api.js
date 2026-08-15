import axios from "axios";

// Create Axios instance with backend base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor to attach JWT authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
