<template>
  <svg ref="barcodeSvg"></svg>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import JsBarcode from 'jsbarcode';

const props = defineProps({
  value: {
    type: String,
    required: true
  }
});

const barcodeSvg = ref(null);

watchEffect(() => {
  if (barcodeSvg.value && props.value) {
    try {
      JsBarcode(barcodeSvg.value, props.value, {
        format: "CODE128",
        height: 30,
        displayValue: false,
      });
    } catch (e) {
      console.error("Failed to generate barcode:", e);
    }
  }
});
</script>