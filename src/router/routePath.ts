import LoginView from '../pages/LoginView.vue'
import Error404 from '../pages/Error404.vue'
import DashboardView from '../pages/DashboardView.vue'
import SettingView from '../pages/SettingView.vue';
import Personal_Info from '../components/setting_menu/components/Personal_Info.vue';
import ChangePassword from '../components/setting_menu/components/ChangePassword.vue';
import ActivityLogView from '../pages/ActivityLogView.vue';
import AdminManageView from '../pages/AdminManageView.vue';
import ProductView from '../pages/ProductView.vue';
import type { AppRouteRecordRaw } from '../types';
import StockItemView from '../pages/StockItemView.vue';
import POSView from '../pages/POSView.vue';
import StoreView from '../pages/StoreView.vue';
import BrandView from '../pages/BrandView.vue';
import CategoriesView from '../pages/CategoriesView.vue';

// Define a Union Type for the specific icon names you use
export type IconName = 'Dashboard' | 'Management' | 'Store Management' | 'Admin Management' | 'Activity logs' | 'Product Management' | 'POS Management' | 'Stock Management' | 'Categories Management' | 'Brand Management' | 'non_icon'; // Add all valid icon keys here!
// Make sure this matches the keys in your iconComponents object in the sidebar component.

export const routes: AppRouteRecordRaw[] = [
    { name: 'Login', path: '/', component: LoginView, meta: { requiresAuth: false, layout: 'BlankLayout' ,icon: 'non_icon'} },
    { name: 'Not found', path: '/not-found', component: Error404, meta: { requiresAuth: false, layout: 'BlankLayout' ,icon: 'non_icon' } },
    { name: 'Settings', path: '/setting', component: SettingView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'non_icon' } , children: [
        {name: 'Account' ,path: 'account' , redirect: '/setting/account/info', children: [
            {name: 'Personal info', path: 'info' , component: Personal_Info},
            {name: 'Change password', path: 'Change-password' , component: ChangePassword},
        ]},
    ]},
    { name: 'Dashboard', path: '/dashboard', component: DashboardView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'Dashboard' } },
    { name: 'Management', path: '/management', redirect: '/management/store', meta: {icon: 'Management'}, children: [
        {name: 'Store Management' ,path: '/management/store' , component: StoreView , meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'Store Management' } },
        {name: 'Product Management' ,path: '/management/product' , component: ProductView , meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'Product Management' } },
        {name: 'Stock Management' ,path: '/management/stock' , component: StockItemView , meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'Stock Management' } },
        {name: 'POS Management' ,path: '/management/pos' , component: POSView , meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'POS Management' } },
        {name: 'Categories Management' ,path: '/management/categories' , component: CategoriesView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'Categories Management' } },
        {name: 'Brand Management' ,path: '/management/brand' , component: BrandView , meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'Brand Management' } },
    ] },
    { name: 'Admin Management', path: '/admins', component: AdminManageView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'Admin Management' } },
    { name: 'Activity Logs', path: '/activitylogs', component: ActivityLogView, meta: { requiresAuth: true, layout: 'AuthLayout' ,icon: 'Activity logs' } },

]
