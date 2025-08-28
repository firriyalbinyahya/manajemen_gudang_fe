<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Simple Warehouse App</h2>
      <p class="subtitle">Silakan masuk ke akun Anda</p>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button class="button-submit" type="submit" :disabled="isLoading">
          <span v-if="isLoading">Memuat...</span>
          <span v-else>Masuk</span>
        </button>
        <div class="register-link">
            <p>Belum punya akun? <router-link to="/register">Daftar di sini.</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/axios';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth.js';

const username = ref('');
const password = ref('');
const isLoading = ref(false);

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const login = async () => {
  isLoading.value = true;
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    });
    toast.success('Berhasil masuk!');
  } catch (error) {
    console.error('Login failed:', error);
    toast.error('Username atau password salah.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Poppins', sans-serif;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.button-submit {
    background-color: #2c3e50;
    font-family: 'Poppins';
}

h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 2rem;
}

.input-group {
  text-align: left;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #007bff;
}

button[type="submit"] {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="submit"]:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.register-link {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>