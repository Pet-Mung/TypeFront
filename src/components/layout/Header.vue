<template>
  <div class="header_wrap">
    <div class="logo_area">
      <h1 @click="router.push('/')">CATTUS
        <img src="@/assets/img/logo.png" alt="logo" />
        </h1>
      
    </div>
    <Navbar />
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
import Navbar from './Navbar.vue';

const router = useRouter();
</script>