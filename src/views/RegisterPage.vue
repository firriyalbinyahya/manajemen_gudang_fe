<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Mendaftar Akun Baru</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="input-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button type="submit" class="register-button">Daftar</button>
        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">{{ success }}</p>
        <div class="login-link">
            <p>Sudah punya akun? <router-link to="/login">Masuk di sini.</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '@/api/axios.js';
import { useToast } from 'vue-toastification';
import router from '@/router';

const toast = useToast();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    toast.error('Password dan Konfirmasi Password tidak cocok.');
    return;
  }

  try {
    await api.post('/auth/register', {
      username: username.value,
      password: password.value,
    });
    router.push('/');
    toast.success('Registrasi berhasil! Silakan login.');
  } catch (err) {
    toast.error('Registrasi gagal. Coba lagi atau gunakan username lain.');
    console.error('Register error:', err);
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Poppins', sans-serif;
}

.register-box {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #28a745;
}

.register-button {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-family: 'Poppins';
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.register-button:hover {
  background-color: #218838;
}

.error-message {
  color: #dc3545;
  margin-top: 15px;
  font-weight: 500;
}

.success-message {
  color: #28a745;
  margin-top: 15px;
  font-weight: 500;
}

.login-link {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
}

.login-link a {
  color: #28a745;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>