import LoginView from '../pages/LoginView.vue'
import Error404 from '../pages/Error404.vue'
import DashboardView from '../pages/DashboardView.vue'
import { type RouteRecordRaw } from 'vue-router'
import SettingView from '../pages/SettingView.vue';

// Define a Union Type for the specific icon names you use
export type IconName = 'home' | 'settings' | 'users'; // Add all valid icon keys here!
// Make sure this matches the keys in your iconComponents object in the sidebar component.

interface RouteMeta {
    requiresAuth: boolean;
    layout: string;
    icon?: IconName; // Use the specific IconName type here
    title?: string; // Add any other meta properties you might use
}

type AppRouteRecordRaw = RouteRecordRaw & {
    meta?: RouteMeta;
};

export const routes: AppRouteRecordRaw[] = [
    { name: 'login', path: '/', component: LoginView, meta: { requiresAuth: false, layout: 'BlankLayout' ,icon: 'home'} },
    { name: 'not found', path: '/not-found', component: Error404, meta: { requiresAuth: false, layout: 'BlankLayout' ,icon: 'home' } },
    { name: 'dashboard', path: '/dashboard', component: DashboardView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'home' } },
    { name: 'setting', path: '/setting', component: SettingView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'home' } },
]
