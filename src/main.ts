
import { createApp } from 'vue'
import './style.css'
import 'overlayscrollbars/overlayscrollbars.css';
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import caslPlugin from './services/plugin/casl'
import { resetAbility, updateAbility } from './services/plugin/permissions'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import VueApexCharts from 'vue3-apexcharts';
import setupI18n from './services/i18n/index'

const pinia = createPinia()
const app = createApp(App)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const rawUserinfo = localStorage.getItem('info');
if(rawUserinfo) {
    try {
        const userinfo = JSON.parse(rawUserinfo);
        updateAbility(userinfo.Roles);
    } catch (error) {
        console.error('failed to parse user roles from localstorage:', error);
        localStorage.removeItem('info');
        resetAbility();
    }
} else {
    resetAbility();
}

setupI18n(app);

app.component('apexchart', VueApexCharts);
app.use(VueQueryPlugin,{
  queryClient,
});
app.use(caslPlugin);
app.use(pinia);
app.use(router);
app.mount('#app');