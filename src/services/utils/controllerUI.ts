import { useAppSetupStore } from "../../store/appSetupStore";


class controllerUI {
    setupUI() {
        const setupStore = useAppSetupStore();
        setupStore.initialize(); //add value locale , theme from localstorage
        setupStore.setLocale(setupStore.locale); //add locale value to localstorage
        setupStore.setTheme(setupStore.theme);//add theme value to localstorage
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
}

export default new controllerUI();
