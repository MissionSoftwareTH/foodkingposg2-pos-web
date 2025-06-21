
import { createApp } from 'vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import caslPlugin from './services/plugin/casl'
import { resetAbility, updateAbility } from './services/plugin/permissions'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const pinia = createPinia()
const app = createApp(App)

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

app.use(VueQueryPlugin,{
    queryClient,
});
app.use(caslPlugin);
app.use(pinia);
app.use(router);
app.mount('#app');