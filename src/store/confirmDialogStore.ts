// stores/confirmDialog.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useConfirmDialogStore = defineStore('confirmDialog', () => {
  const isOpen = ref(false);
  const title = ref('Confirm Action');
  const message = ref('');
  const confirmButtonText = ref('Confirm');
  const cancelButtonText = ref('Cancel');
  const resolvePromise = ref<((value: boolean) => void) | null>(null);
  const isLoading = ref(false); // สถานะ loading สำหรับปุ่ม confirm

  /**
   * แสดง Confirm Dialog
   * @param options - อ็อบเจกต์ที่มี message, title, button texts
   * @returns Promise ที่จะ resolve เป็น true ถ้ากด Confirm, false ถ้ากด Cancel
   */
  const showConfirm = (options: {
    message: string;
    title?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      message.value = options.message;
      title.value = options.title || 'Confirm Action';
      confirmButtonText.value = options.confirmButtonText || 'Confirm';
      cancelButtonText.value = options.cancelButtonText || 'Cancel';
      resolvePromise.value = resolve; // เก็บ resolve function ไว้
      isLoading.value = false; // Reset loading state
      isOpen.value = true;
    });
  };

  /**
   * ซ่อน Confirm Dialog และ Resolve Promise ด้วยค่าที่กำหนด
   */
  const hideConfirm = (result: boolean) => {
    if (resolvePromise.value) {
      resolvePromise.value(result);
      resolvePromise.value = null; // Clear resolve function
    }
    isOpen.value = false;
    isLoading.value = false; // Ensure loading state is reset
  };

  /**
   * Set loading state for the confirm button
   */
  const setLoading = (state: boolean) => {
    isLoading.value = state;
  };

  return {
    // State
    isOpen,
    title,
    message,
    confirmButtonText,
    cancelButtonText,
    isLoading,

    // Actions
    showConfirm,
    hideConfirm,
    setLoading,
  };
});