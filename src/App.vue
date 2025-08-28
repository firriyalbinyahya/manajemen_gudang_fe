<script setup></script>

<template>
  <div>
    <Navbar v-if="authStore.username" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { useAuthStore } from '@/stores/auth.js';

const authStore = useAuthStore();
</script>

<style scoped></style>
