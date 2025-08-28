import { defineStore } from 'pinia';

export const useConfirmationStore = defineStore('confirmation', {
  state: () => ({
    isVisible: false,
    message: '',
    onConfirm: null,
    onCancel: null,
  }),
  actions: {
    show(message, onConfirm, onCancel) {
      this.message = message;
      this.onConfirm = onConfirm;
      this.onCancel = onCancel;
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    confirm() {
      if (this.onConfirm) {
        this.onConfirm();
      }
      this.hide();
    },
    cancel() {
      if (this.onCancel) {
        this.onCancel();
      }
      this.hide();
    },
  },
});