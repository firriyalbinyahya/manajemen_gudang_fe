import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore();

    if (error.response && error.response.status === 401) {
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default api;