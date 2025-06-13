import { useAppSetupStore } from "../../store/appSetupStore";
import type { User_Data } from "../../types";


class appController {
    setup() {
        const setupStore = useAppSetupStore();
        setupStore.initialize(); //add value locale , theme from localstorage
        setupStore.setLocale(setupStore.locale); //add locale value to localstorage
        setupStore.setTheme(setupStore.theme);//add theme value to localstorage
        setupStore.setUserData(setupStore.user_data || {}); //add user data value to localstorage
        setupStore.setPermissionStore(setupStore.user_data || {}); //add permission name to store
    }
    setLocale(lang:string) {
        const setupStore = useAppSetupStore();
        setupStore.locale = lang;
        setupStore.setLocale(setupStore.locale);
    }
    setTheme(mytheme:string) {
        const setupStore = useAppSetupStore();
        setupStore.theme = mytheme;
        setupStore.setTheme(setupStore.theme);
    }
    setUserData(data: User_Data) {
        const setupStore = useAppSetupStore();
        setupStore.user_data = data;
        setupStore.setTheme(setupStore.theme);
    }
}

export default new appController();
