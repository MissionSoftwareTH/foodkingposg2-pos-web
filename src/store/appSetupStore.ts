import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User_Data } from '../types';

export const useAppSetupStore = defineStore('appSetup', () => {
    const locale = ref('en');
    const theme = ref('light');
    const user_data = ref<User_Data>();
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
        const storedLocale = localStorage.getItem('locale');
        if (storedLocale) {
            locale.value = storedLocale;
        }

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            theme.value = storedTheme;
        }

        const get_user_data = localStorage.getItem('info');
        if(get_user_data) {
            user_data.value = JSON.parse(get_user_data);
            setPermissionStore(user_data.value || {});
        }

        const get_sidebar_status = localStorage.getItem('sidebar-expanded');
        if(get_sidebar_status) {
            setSidebarExpand(JSON.parse(get_sidebar_status) || false);
        }
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