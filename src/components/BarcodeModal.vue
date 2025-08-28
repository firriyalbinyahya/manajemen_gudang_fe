<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Barcode untuk SKU: {{ sku }}</h3>
        <button @click="$emit('close')" class="close-button">&times;</button>
      </div>
      <div class="modal-body">
        <BarcodeGenerator :value="sku" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BarcodeGenerator from './BarcodeGenerator.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  sku: {
    type: String,
    required: true
  }
});

defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #aaa;
}

.close-button:hover {
  color: #333;
}

.modal-body {
  text-align: center;
}
</style>