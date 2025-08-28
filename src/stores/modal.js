import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isProductFormVisible: false,
    editingProductData: null,
  }),
  actions: {
    openProductForm(product = null) {
      this.isProductFormVisible = true;
      this.editingProductData = product;
    },
    closeProductForm() {
      this.isProductFormVisible = false;
      this.editingProductData = null;
    },
  },
});