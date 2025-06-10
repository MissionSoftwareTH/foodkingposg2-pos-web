import LoginView from '../pages/LoginView.vue'
import Error404 from '../pages/Error404.vue'
import DashboardView from '../pages/DashboardView.vue'
import { type RouteRecordRaw } from 'vue-router'
import SettingView from '../pages/SettingView.vue';
import Personal_Info from '../components/setting_menu/components/Personal_Info.vue';
import ChangePassword from '../components/setting_menu/components/ChangePassword.vue';

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
    { name: 'Login', path: '/', component: LoginView, meta: { requiresAuth: false, layout: 'BlankLayout' ,icon: 'home'} },
    { name: 'Not found', path: '/not-found', component: Error404, meta: { requiresAuth: false, layout: 'BlankLayout' ,icon: 'home' } },
    { name: 'Dashboard', path: '/dashboard', component: DashboardView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'home' } },
    { name: 'Settings', path: '/setting', component: SettingView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'home' } , children: [
        {name: 'Account' ,path: 'account' , redirect: '/setting/account/info', children: [
            {name: 'Personal info', path: 'info' , component: Personal_Info},
            {name: 'Change password', path: 'Change-password' , component: ChangePassword},
        ]},
    ] },
]
