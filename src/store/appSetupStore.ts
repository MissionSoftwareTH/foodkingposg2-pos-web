import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User_Data } from '../types';

export const useAppSetupStore = defineStore('appSetup', () => {
    const locale = ref('en');
    const theme = ref('light');
    const user_data = ref<User_Data>();

    const setLocale = (newLocale: string) => {
        locale.value = newLocale;
        localStorage.setItem('locale', newLocale);
    };

    const setTheme = (newTheme: string) => {
        theme.value = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    const initialize = () => {
        const storedLocale = localStorage.getItem('locale');
        if (storedLocale) {
            locale.value = storedLocale;
        }

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            theme.value = storedTheme;
        }
    };

    return {
        locale,
        theme,
        user_data,
        setLocale,
        setTheme,
        initialize,
    };
});