
import { createApp } from 'vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import caslPlugin from './services/plugin/casl'

const pinia = createPinia()
const app = createApp(App)

app.use(caslPlugin);
app.use(pinia)
app.use(router)
app.mount('#app')