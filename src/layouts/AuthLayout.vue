<template>
  <div class="flex h-screen p-5 space-x-5 relative">
    <Sidebar class="max-lg:hidden"/>
    <OverlaySidebar/>
    <div class="flex flex-col flex-1 overflow-hidden space-y-5">
      <Navbar />
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from '../components/sidebar/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import OverlaySidebar from '../components/sidebar/OverlaySidebar.vue';
</script>