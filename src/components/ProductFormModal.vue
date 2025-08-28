<template>
  <div v-if="modalStore.isProductFormVisible" class="modal-overlay" @click.self="modalStore.closeProductForm">
    <div class="modal-content">
      <span class="close-btn" @click="modalStore.closeProductForm">&times;</span>
      
      <ProductForm 
        :editing-product="modalStore.editingProductData" 
        @product-success="handleProductSuccess" 
      />
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal.js';
import ProductForm from './ProductForm.vue';

const modalStore = useModalStore();
// Definisikan event yang akan dipancarkan ke komponen induk (ProductPage)
const emit = defineEmits(['product-added']); 

const handleProductSuccess = () => {
  // Tutup modal
  modalStore.closeProductForm();
  // Pancarkan event 'product-added' ke ProductPage
  emit('product-added'); 
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 500px;
  width: 90%;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #888;
}
</style>