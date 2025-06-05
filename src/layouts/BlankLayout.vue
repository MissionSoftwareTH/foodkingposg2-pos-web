<template>
  <div>
    <Navbar class="fixed"/>
    <RouterView />
  </div>
</template>

<script setup lang="ts"> 
import { RouterView } from 'vue-router';
import Navbar from '../components/Navbar.vue';
</script>
