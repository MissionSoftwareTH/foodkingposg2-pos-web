import { defineStore } from 'pinia';
import { ref } from 'vue';

// 1. กำหนด Union Type ที่ชัดเจนสำหรับ 'status'
// เพื่อให้ TypeScript รู้ว่า 'status' มีค่าที่เป็นไปได้อะไรบ้าง
export type DialogStatus = 'error' | 'warning' | 'success'; // เพิ่ม 'info' ถ้ามีในอนาคต

// 2. กำหนด Interface ที่ชัดเจนสำหรับ props ทั้งหมด
// ทำให้ TypeScript รู้โครงสร้างของ object 'props'
interface DialogProps {
    status?: DialogStatus; // ใช้ Union Type ที่กำหนดไว้
    message?: string; // อาจจะมี property อื่นๆ เช่น message ที่จะแสดง
    // เพิ่ม properties อื่นๆ ที่ dialog ของคุณอาจต้องการที่นี่
}

export const useDialogStore = defineStore('dialog', () => {
    const isOpen = ref(false);
    // componentName สามารถเป็น string หรือ null
    const componentName = ref<string | null>(null);
    // 3. กำหนด Type ของ ref 'props' ให้เป็น DialogProps หรือ null
    // ทำให้ TypeScript ตรวจสอบ props ได้ถูกต้อง
    const props = ref<DialogProps | null>(null);

    // 4. กำหนด Type ของ parameter 'dialogProps' ใน openDialog
    const openDialog = (name: string, dialogData?: DialogProps) => {
        isOpen.value = true;
        componentName.value = name;
        props.value = dialogData || null; // ใช้ dialogData แทน dialogProps เพื่อความชัดเจน
    };

    const closeDialog = () => {
        isOpen.value = false;
        componentName.value = null;
        props.value = null;
    };

    return { isOpen, componentName, props, openDialog, closeDialog };
});