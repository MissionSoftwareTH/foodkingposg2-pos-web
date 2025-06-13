import { defineStore } from 'pinia';
import { ref } from 'vue';

export type DialogStatus = 'error' | 'warning' | 'success'; 

interface DialogProps {
    status?: DialogStatus;
    message?: string;
    type?: string;
    link?: string;
}


export const useDialogStore = defineStore('dialog', () => {
    const isOpen = ref(false);
    const componentName = ref<string | null>(null);
    const props = ref<DialogProps | null>(null);

    const openDialog = (name: string, dialogData?: DialogProps) => {
        isOpen.value = true;
        componentName.value = name;
        props.value = dialogData || null;
    };

    const closeDialog = () => {
        componentName.value = null;
        props.value = null;
        isOpen.value = false;
    };

    return { isOpen, componentName, props, openDialog, closeDialog };
});