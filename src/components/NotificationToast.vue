<template>
  <div class="toast toast-end z-[9999]">
    <transition-group name="toast-list" tag="div">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="['alert', toast.typeClass]"
      >
        <svg
          v-if="toast.icon"
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="toast.icon"
          />
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '../store/toastStore';


// เข้าถึง Pinia store
const toastStore = useToastStore();
</script>

<style scoped>
/* Styles for the transition effect */
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.5s ease;
}
.toast-list-enter-from,
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(100%); /* เริ่มต้น/สิ้นสุดนอกจอทางขวา */
}
/* Ensure toasts are positioned correctly during transition */
.toast-list-move {
  transition: transform 0.5s ease;
}
</style>