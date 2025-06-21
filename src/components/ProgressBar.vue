<template>
    <Transition name="fade">
        <div v-if="progressStore.isOpen" class="fixed top-0 left-0 w-full h-1 bg-base-100 overflow-hidden">
            <div class=" loading-bar w-1/5 -left-1/5 absolute bg-primary h-full"></div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useProgressBarStore } from '../store/progressBarStore';
const progressStore = useProgressBarStore();
</script>

<style scoped>
.loading-bar {
  animation: moveIndeterminateBar 1.5s ease-in infinite;
}

@keyframes moveIndeterminateBar {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}
</style>