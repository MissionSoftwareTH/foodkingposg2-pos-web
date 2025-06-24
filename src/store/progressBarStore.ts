import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProgressBarStore = defineStore('progressBar', () => {
  const isOpen = ref(false);

  const loadingStart = () => {
    isOpen.value = true;
  }
  const loadingStop = () => {
    isOpen.value = false;
  }
  return {
    // State
    isOpen,

    // Actions
    loadingStart,
    loadingStop
  };
});