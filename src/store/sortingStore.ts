import { defineStore } from 'pinia';
import { ref } from 'vue';
import { posPageOption, productPageOption, storePageOption } from '../constants/page_option';

export const usePageOptionStore = defineStore('page-option', () => {
    //page option
    const pos = ref(posPageOption);
    const product = ref(productPageOption);
    const store = ref(storePageOption);

    return {
    // State
        pos,
        product,
        store,

    // Actions

    };
});