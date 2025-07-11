import { defineStore } from 'pinia';
import { ref } from 'vue';
import { adminListPageOption, brandPageOption, categoriesPageOption, posPageOption, productPageOption, rolePageOption, stockCardPageOption, stockPageOption, storePageOption } from '../constants/page_option';

export const usePageOptionStore = defineStore('page-option', () => {
    //page option
    const pos = ref(posPageOption);
    const product = ref(productPageOption);
    const store = ref(storePageOption);
    const stock = ref(stockPageOption);
    const stockCard = ref(stockCardPageOption);
    const brand = ref(brandPageOption);
    const categories = ref(categoriesPageOption);
    const role = ref(rolePageOption);
    const adminlist = ref(adminListPageOption);

    return {
    // State
        pos,
        product,
        store,
        stock,
        stockCard,
        brand,
        categories,
        role,
        adminlist,

    // Actions

    };
});