import { defineStore } from 'pinia';
import { ref } from 'vue';
import { brandPageOption, categoriesPageOption, posPageOption, productPageOption, storePageOption } from '../constants/page_option';

export const usePageOptionStore = defineStore('page-option', () => {
    //page option
    const pos = ref(posPageOption);
    const product = ref(productPageOption);
    const store = ref(storePageOption);
    const brand = ref(brandPageOption);
    const categories = ref(categoriesPageOption);

    return {
    // State
        pos,
        product,
        store,
        brand,
        categories,

    // Actions

    };
});