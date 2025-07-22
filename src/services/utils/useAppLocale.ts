// src/composables/useAppLocale.ts (ไฟล์ใหม่)
import { useI18n } from 'vue-i18n';
import { useAppSetupStore } from '../../store/appSetupStore';


export function useAppLocale() {
  const { locale: i18nLocale } = useI18n(); // ตั้งชื่อ alias เพื่อหลีกเลี่ยงชื่อซ้ำ
  const setupStore = useAppSetupStore();

  const changeLocale = (lang: string) => {
    i18nLocale.value = lang; // อัปเดต locale ของ vue-i18n
    setupStore.setLocale(lang); // อัปเดต Pinia store และ localStorage
  };

  // คุณสามารถตั้งค่า locale เริ่มต้นจาก store เมื่อ Composable นี้ถูกใช้งาน
  // หรือจัดการใน main.ts
  if (i18nLocale.value !== setupStore.locale) {
    i18nLocale.value = setupStore.locale;
  }

  return {
    changeLocale,
    currentLocale: i18nLocale, // แสดง locale ปัจจุบันเพื่อความสะดวก
  };
}