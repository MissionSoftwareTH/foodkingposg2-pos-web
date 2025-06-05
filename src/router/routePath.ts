import LoginView from '../pages/LoginView.vue'
import Error404 from '../pages/Error404.vue'
import DashboardView from '../pages/DashboardView.vue'
import { type RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
    { name: 'login', path: '/', component: LoginView, meta: { requiresAuth: false, layout: 'BlankLayout' } },
    { name: 'not found', path: '/not-found', component: Error404, meta: { requiresAuth: false, layout: 'BlankLayout' } },
    { name: 'dashboard', path: '/dashboard', component: DashboardView, meta: { requiresAuth: true, layout: 'AuthLayout' } },
]
