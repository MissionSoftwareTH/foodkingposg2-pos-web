import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useToggleStore = defineStore('toggle', () => {
    const isSidebar: Ref<boolean> = ref(false);

    const toggleSidebar = (): void => {
        isSidebar.value = !isSidebar.value;
    };

    return { isSidebar, toggleSidebar };
});