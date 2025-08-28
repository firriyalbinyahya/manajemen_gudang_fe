<template>
  <div class="form-container">
    <h3>{{ editingProduct ? 'Edit Produk' : 'Tambah Produk Baru' }}</h3>
    <form @submit.prevent="submitProduct">
      <div>
        <label for="name">Nama Produk:</label>
        <input type="text" id="name" v-model="product.product_name" required />
      </div>
      <div>
        <label for="sku">SKU:</label>
        <input type="text" id="sku" v-model="product.sku" :disabled="editingProduct" required />
      </div>
      <div>
        <label for="quantity">Kuantitas:</label>
        <input type="number" id="quantity" v-model.number="product.quantity" required />
      </div>
      <div>
        <label for="location">Lokasi:</label>
        <input type="text" id="location" v-model="product.location" required />
      </div>
      <div>
        <label for="status">Status:</label>
        <select id="status" v-model="product.status" required>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      <button class="btn-simpan" type="submit">{{ editingProduct ? 'Simpan Perubahan' : 'Tambah Produk' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import api from '@/api/axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const product = ref({
  product_name: '',
  sku: '',
  quantity: 0,
  location: '',
  status: 'In Stock'
});

const props = defineProps(['editingProduct']);
const emit = defineEmits(['product-success']); 

watch(() => props.editingProduct, (newProduct) => {
  if (newProduct) {
    product.value = { ...newProduct };
  } else {
    product.value = {
      product_name: '',
      sku: '',
      quantity: 0,
      location: '',
      status: 'In Stock'
    };
  }
}, { immediate: true });

const submitProduct = async () => {
  try {
    if (props.editingProduct) {
      await api.put(`/products/${props.editingProduct.id}`, product.value);
      toast.success('Produk berhasil diperbarui!');
    } else {
      await api.post('/products', product.value);
      toast.success('Produk berhasil ditambahkan!');
    }
    
    product.value = {
      product_name: '',
      sku: '',
      quantity: 0,
      location: '',
      status: 'In Stock'
    };

    emit('product-success');

  } catch (error) {
    console.error('Error submitting product:', error);
    toast.error('Gagal menyimpan produk. Coba lagi.');
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  font-family: 'Poppins';
  border-radius: 8px;
}
div {
  margin-bottom: 10px;
}
label {
  display: block;
  font-weight: bold;
}
input, select {
  width: 100%;
  padding: 8px;
  font-family: 'Poppins';
  box-sizing: border-box;
}
button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-simpan {
    font-family: 'Poppins'
}
</style>