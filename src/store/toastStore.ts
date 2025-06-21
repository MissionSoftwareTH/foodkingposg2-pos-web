import { defineStore } from 'pinia';
import { ref } from 'vue';

// --- Interfaces & Types ---
export interface Toast { // Export interface เพื่อให้ Components อื่นๆ ใช้ได้
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  typeClass: string;
  icon?: string; // SVG path for the icon
}

let nextToastId = 0; // เพื่อให้แต่ละ Toast มี ID ไม่ซ้ำกัน

// --- Icon SVG Paths (จาก Tabler Icons) ---
const icons = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', // Checkmark circle
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z', // Xmark circle
  warning:
    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', // Alert triangle
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // Info circle
};

export const useToastStore = defineStore('toast', () => {
  // State: Array สำหรับเก็บ Toast ที่กำลังแสดง
  const toasts = ref<Toast[]>([]);

  // Actions: ฟังก์ชันสำหรับเพิ่ม Toast
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration: number = 3000 // default 3 วินาที
  ) => {
    let typeClass = '';
    let iconPath = '';

    switch (type) {
      case 'success':
        typeClass = 'alert-success';
        iconPath = icons.success;
        break;
      case 'error':
        typeClass = 'alert-error';
        iconPath = icons.error;
        break;
      case 'warning':
        typeClass = 'alert-warning';
        iconPath = icons.warning;
        break;
      case 'info':
      default:
        typeClass = 'alert-info';
        iconPath = icons.info;
        break;
    }

    const newToast: Toast = {
      id: nextToastId++,
      message,
      type,
      typeClass,
      icon: iconPath,
    };

    toasts.value.push(newToast);

    // ตั้งเวลาลบ Toast ออกจาก Array
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== newToast.id);
    }, duration);
  };

  // Return state และ actions ที่ต้องการให้เข้าถึงได้
  return {
    toasts,
    showToast,
  };
});