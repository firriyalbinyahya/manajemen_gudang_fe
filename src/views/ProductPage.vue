<template>
  <div class="product-page">
    <div class="header-container">
        <h2>Daftar Produk</h2>
        <div class="header-actions">
            <button @click="exportToCsv" class="btn-export">
                <ArrowDownTrayIcon class="icon" />
                <span>Ekspor CSV</span>
            </button>
            <button @click="openModalForAdd" class="btn-add">
                <PlusIcon class="icon" />
                <span>Tambah Produk</span>
            </button>
        </div>
    </div>

    <div class="filter-container">
       <div class="search-input-wrapper">
        <MagnifyingGlassIcon class="search-icon" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari nama, SKU, atau lokasi..."
          class="search-input"
        />
      </div>
      
     <div class="filter-control-wrapper">
        <FunnelIcon class="filter-icon" />
        <select v-model="selectedStatus" class="filter-select">
          <option value="">Semua Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

    </div>
    
    <table class="product-table">
      <thead>
        <tr>
          <th>Nama Produk</th>
          <th>SKU</th>
          <th>Kuantitas</th>
          <th>Lokasi</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.product_name }}</td>
          <td>{{ product.sku }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.location }}</td>
          <td>{{ product.status }}</td>
          <td>
            <button @click="showBarcode(product.sku)" class="btn-action btn-view">
              <EyeIcon class="icon" />
            </button>
            <button @click="openModalForEdit(product)" class="btn-edit">
                <PencilIcon class="icon" />
            </button>
            <button @click="deleteProduct(product.id)" class="btn-delete">
                <TrashIcon class="icon" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-container" v-if="totalItems > 0">
        <div class="pagination-info">
            Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalItems) }} dari {{ totalItems }} produk
        </div>
        <div class="pagination-controls">
            <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="btn-page"
            >
                Sebelumnya
            </button>
            <button 
                v-for="page in totalPages" 
                :key="page" 
                @click="currentPage = page"
                :class="['btn-page', { 'active': currentPage === page }]"
            >
                {{ page }}
            </button>
            <button 
                @click="currentPage++" 
                :disabled="currentPage === totalPages"
                class="btn-page"
            >
                Berikutnya
            </button>
        </div>
    </div>
  </div>
  <ProductFormModal @product-added="handleProductAdded" />
  <ConfirmModal />
  <BarcodeModal 
    :show="showBarcodeModal" 
    :sku="currentBarcodeSku"
    @close="showBarcodeModal = false"
  />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import api from '@/api/axios';
import { useModalStore } from '@/stores/modal.js';
import ProductFormModal from '@/components/ProductFormModal.vue';
import BarcodeGenerator from '@/components/BarcodeGenerator.vue';
import { useToast } from 'vue-toastification';
import { useConfirmationStore } from '@/stores/confirmation.js';
import ConfirmModal from '@/components/ConfirmModal.vue'; 
import BarcodeModal from '@/components/BarcodeModal.vue';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon, FunnelIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline';

const confirmationStore = useConfirmationStore(); 
const toast = useToast();

const products = ref([]);
const modalStore = useModalStore();

// State baru untuk pencarian dan filter
const searchQuery = ref('');
const selectedStatus = ref('');


// State baru untuk pagination
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(0);

const showBarcodeModal = ref(false);
const currentBarcodeSku = ref('');

let fetchTimeout = null;

const fetchProducts = async () => {
  try {
    const params = new URLSearchParams({
      page: currentPage.value, // Kita mulai dari halaman 1
      limit: itemsPerPage.value, // Batas 10 item per halaman
      search: searchQuery.value,
      status: selectedStatus.value
    });
    const response = await api.get(`/products?${params.toString()}`);
    console.log(response);
    products.value = response.data.data.items;
    totalItems.value = response.data.data.total_items;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const exportToCsv = () => {
  const headers = ['Nama Produk', 'SKU', 'Kuantitas', 'Lokasi', 'Status'];
  const csvRows = [];
  
  // Tambahkan baris header
  csvRows.push(headers.join(','));
  
  // Tambahkan baris data
  for (const product of products.value) {
    const row = [
      `"${product.product_name}"`, // Gunakan kutip ganda untuk menangani koma dalam teks
      `"${product.sku}"`,
      product.quantity,
      `"${product.location}"`,
      `"${product.status}"`
    ];
    csvRows.push(row.join(','));
  }
  
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'products.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("Daftar produk berhasil diekspor!");
};

const showBarcode = (sku) => {
    currentBarcodeSku.value = sku;
    showBarcodeModal.value = true;
};

const openModalForAdd = () => {
  modalStore.openProductForm();
};

const openModalForEdit = (product) => {
  modalStore.openProductForm(product);
};

const handleProductAdded = () => {
  currentPage.value = 1; 
  fetchProducts();
};

const deleteProduct = async (productId) => {
  confirmationStore.show(
    'Apakah Anda yakin ingin menghapus produk ini?',
    async () => {
      try {
        await api.delete(`/products/${productId}`);
        toast.success('Produk berhasil dihapus.');
        if (products.value.length === 1 && currentPage.value > 1) {
            currentPage.value--;
        }
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Gagal menghapus produk. Coba lagi.');
      }
    }
  );
};

const totalPages = ref(0);

watch([searchQuery, selectedStatus], () => {
  if (fetchTimeout) {
    clearTimeout(fetchTimeout);
  }
  fetchTimeout = setTimeout(() => {
    currentPage.value = 1; 
    fetchProducts();
  }, 500);
});

watch([totalItems, itemsPerPage], () => {
  totalPages.value = Math.ceil(totalItems.value / itemsPerPage.value);
});

watch(currentPage, () => {
  fetchProducts();
});

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>



/* Gaya untuk kontainer pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
}

.pagination-info {
  font-size: 0.9rem;
  color: #6c757d;
  font-family: 'Poppins';
}

.pagination-controls {
  display: flex;
  gap: 5px;
}

.btn-page {
  background-color: white;
  color:#2c3e50;
  border: 1px solid #2c3e50;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  font-family: 'Poppins';
  transition: all 0.2s;
}

.btn-page:hover {
  background-color: #2c3e50;
  color: white;
}

.btn-page:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  border-color: #dee2e6;
  cursor: not-allowed;
}

.btn-page.active {
  background-color: #2c3e50;
  color: white;
}

.product-page {
  padding: 30px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 80px);
}

.header-actions {
  display: flex;
  gap: 10px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.btn-add {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins';
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-add:hover {
  background-color: #218838;
}

.icon {
  width: 20px;
  height: 20px;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins';
}

.search-icon {
  position: absolute;
  left: 10px;
  width: 20px;
  height: 20px;
  color: #888;
}

/* Wrapper untuk select filter dan ikon */
.filter-control-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
}

.filter-select {
  padding: 10px;
  padding-left: 30px; /* Tambah padding kiri untuk ikon */
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Poppins';
  background-color: white;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.filter-icon {
  position: absolute;
  left: 8px;
  width: 20px;
  height: 20px;
  color: #888;
}

/*
  Gaya untuk tabel
*/
.product-table {
  width: 100%;
  border-collapse: separate; /* Gunakan separate untuk border-radius */
  border-spacing: 0;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Bayangan yang lebih lembut */
  overflow: hidden; /* Penting untuk border-radius */
}

.product-table th,
.product-table td {
  padding: 15px 20px;
  text-align: left;
  border-bottom: 1px solid #dee2e6; /* Garis pemisah yang lebih halus */
}

.product-table th {
  background-color: #e9ecef;
  font-weight: 600;
  color: #495057;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.product-table tbody tr:hover {
  background-color: #f1f3f5; /* Efek hover untuk baris */
  cursor: pointer;
}

.product-table tbody tr:last-child td {
  border-bottom: none;
}

/*
  Gaya untuk tombol aksi
*/
.btn-edit {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 8px 12px;
  font-family: 'Poppins';
  cursor: pointer;
  border-radius: 6px;
  margin-right: 5px; /* Memberi jarak ke tombol sebelah */
  transition: background-color 0.3s;
}

.btn-edit:hover {
  background-color: #000000;
}

.btn-action {
  background-color: gray;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-family: 'Poppins';
  transition: background-color 0.3s;
  margin-right: 5px; /* Memberi jarak ke tombol sebelah */
}

.btn-export {
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins';
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex; /* Penting untuk menyatukan ikon dan teks */
  align-items: center; /* Menyelaraskan secara vertikal */
  gap: 8px; /* Memberikan jarak antar ikon dan teks */
}

.btn-action:hover {
  background-color: #000000;
}

.btn-edit {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 8px 12px;
  font-family: 'Poppins';
  cursor: pointer;
  border-radius: 6px;
  margin-right: 5px; /* Memberi jarak ke tombol sebelah */
  transition: background-color 0.3s;
}

/* Gaya untuk tombol Hapus */
.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-family: 'Poppins';
  border-radius: 6px;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #c82333;
}


.btn-filter {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-filter:hover {
  background-color: #0056b3;
}
</style>