import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User_Data } from '../types';

export const useAppSetupStore = defineStore('appSetup', () => {
    const locale = ref(localStorage.getItem('locale') || 'en');
    const theme = ref(localStorage.getItem('theme') || 'light');
    const user_data = ref<User_Data>(JSON.parse(localStorage.getItem('info') || '{}'));
    const permission = ref<string[]>([]);
    const isSideBarExpanded = ref(false);

    const setLocale = (newLocale: string) => {
        locale.value = newLocale;
        localStorage.setItem('locale', newLocale);
    };

    const setTheme = (newTheme: string) => {
        theme.value = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    const setUserData = (userData: User_Data) => {
        user_data.value = userData;
        localStorage.setItem('info',JSON.stringify(userData));
    };

    const setSidebarExpand = (value: boolean) => {
        isSideBarExpanded.value = value;
        localStorage.setItem('sidebar-expanded',JSON.stringify(value));
    }

    const setPermissionStore = (data: User_Data) => {
        data?.Permission?.forEach((p) => {
            permission?.value?.push(p.PermissionName);
        });
    };

    const initialize = () => {
        setPermissionStore(user_data.value);
    };

    return {
        locale,
        theme,
        user_data,
        permission,
        isSideBarExpanded,
        setLocale,
        setTheme,
        initialize,
        setUserData,
        setPermissionStore,
        setSidebarExpand,
    };
});