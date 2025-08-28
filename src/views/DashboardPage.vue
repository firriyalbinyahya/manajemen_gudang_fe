<template>
  <div class="dashboard-page">
    <h2>Dashboard</h2>
    <p>Selamat datang di halaman Dashboard. Di sini Anda dapat melihat ringkasan bisnis Anda secara sekilas.</p>
    
    <div class="summary-cards">
      <div class="card">
        <h3>Total Produk</h3>
        <p class="card-value">...</p>
      </div>
      <div class="card">
        <h3>Total Stok</h3>
        <p class="card-value">...</p>
      </div>
      <div class="card">
        <h3>Stok Rendah</h3>
        <p class="card-value">...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Logika pengambilan data akan ditambahkan di sini nanti
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