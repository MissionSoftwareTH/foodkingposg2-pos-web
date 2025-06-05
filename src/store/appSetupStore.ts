import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppSetupStore = defineStore('appSetup', () => {
    const locale = ref('en');
    const theme = ref('light');

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
        setLocale,
        setTheme,
        initialize,
    };
});