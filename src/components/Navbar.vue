<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
      <router-link to="/products" class="nav-link">Produk</router-link>
    </div>
    <div class="navbar-right">
      <span class="greeting">Hi, {{ authStore.username }}</span>
      <button @click="logout" class="btn-logout">
        <ArrowRightOnRectangleIcon class="icon" />
        <span>Keluar</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', sans-serif;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #000000;
}

.greeting {
  font-size: 1.1rem;
  font-weight: 500;
  margin-right: 20px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.btn-logout {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 0.8rem;
  font-family: 'Poppins';
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-logout:hover {
  background-color: #c0392b;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>