import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '@/router';
import api from '@/api/axios.js';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('access_token') || null);
  const username = ref(localStorage.getItem('username') || null);

  const isAuthenticated = ref(!!token.value);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const accessToken = response.data.data.access_token;
      const user = response.data.data.username;

      if (accessToken) {
        token.value = accessToken;
        username.value = user;
        isAuthenticated.value = true;
        
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('username', user);

        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const logout = () => {
    token.value = null;
    username.value = null;
    isAuthenticated.value = false;

    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    
    router.push('/login');
  };

  return { token, username, isAuthenticated, login, logout };
});