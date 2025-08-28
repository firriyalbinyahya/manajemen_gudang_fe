<template>
  <div class="dashboard-page">
    <h2>Dashboard</h2>
    <p>Selamat datang di halaman Dashboard. Di sini Anda dapat melihat ringkasan bisnis Anda secara sekilas.</p>
    
     <div class="summary-cards">
      <div class="card">
        <h3>Total Produk</h3>
        <p class="card-value">{{ Math.round(animatedTotalProducts) }}</p>
      </div>
      <div class="card">
        <h3>Total Stok</h3>
        <p class="card-value">{{ Math.round(animatedTotalStock) }}</p>
      </div>
      <div class="card">
        <h3>Stok Rendah</h3>
        <p class="card-value">{{ Math.round(animatedLowStockItems) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useTransition } from '@vueuse/core';
import api from '@/api/axios.js';
import { useToast } from 'vue-toastification';

const toast = useToast();
const totalProducts = ref(0);
const totalStock = ref(0);
const lowStockItems = ref(0);

const animatedTotalProducts = useTransition(totalProducts, {
  duration: 1000, 
});
const animatedTotalStock = useTransition(totalStock, {
  duration: 1200, 
});
const animatedLowStockItems = useTransition(lowStockItems, {
  duration: 800,
});


const fetchDashboardSummary = async () => {
  try {
    const response = await api.get('/report');
    const data = response.data.data;
    totalProducts.value = data.total_products;
    totalStock.value = data.total_stock;
    lowStockItems.value = data.low_stock_items;
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    toast.error('Gagal memuat data dashboard.');
  }
};

onMounted(() => {
  fetchDashboardSummary();
});
</script>

<style scoped>
.dashboard-page {
  padding: 30px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 80px);
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #333;
}

.summary-cards {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  justify-content: center;
}

.card {
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  flex: 1;
  max-width: 300px;
}

.card h3 {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 10px;
}

.card-value {
  font-size: 3rem;
  font-weight: bold;
  color: #007bff;
}
</style>