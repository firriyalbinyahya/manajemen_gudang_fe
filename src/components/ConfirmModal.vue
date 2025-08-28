<template>
  <div v-if="confirmationStore.isVisible" class="confirmation-modal-overlay">
    <div class="confirmation-modal-content">
      <p>{{ confirmationStore.message }}</p>
      <div class="actions">
        <button @click="confirmationStore.confirm()" class="btn-confirm">Hapus</button>
        <button @click="confirmationStore.cancel()" class="btn-cancel">Batal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConfirmationStore } from '@/stores/confirmation.js';

const confirmationStore = useConfirmationStore();
</script>

<style scoped>
.confirmation-modal-overlay {
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

.confirmation-modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.btn-confirm, .btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-confirm {
  background-color: #dc3545;
  color: white;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}
</style>