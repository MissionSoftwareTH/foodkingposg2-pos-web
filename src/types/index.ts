import type { RouteRecordRaw } from 'vue-router';
import type AuthLayout from '../layouts/AuthLayout.vue';
import type BlankLayout from '../layouts/BlankLayout.vue';
import type { IconName } from '../router/routePath';
export * from './users';
export * from './api';
export * from './merchant';
export * from './POS';
export * from './branch';
export * from './product';
export * from './dropdown';

export interface Layouts {
  [key: string]: typeof BlankLayout | typeof AuthLayout;
  BlankLayout: typeof BlankLayout;
  AuthLayout: typeof AuthLayout;
}

export interface formData {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    new_password?: string;
    confirm_password?: string;
    data?: any;
    otp?: string;
    
}

export interface Payload {
    Email?: string;
    Password?: string;
    TokenRecaptcha?: string;
    otp?: string;
    TempToken?: string;
    RefCode?: string;
    OldPassword?: string;
    NewPassword?: string;
    FirstName?: string;
    LastName?: string;
    MerchantName?: string;
    ContactPhone?: string;
    ContactEmail?: string;
    
}

export interface MenuItem {
  id: string;
  label: string;
  path?: string; // Optional path for navigation
  children?: MenuItem[]; // Optional array of sub-menus
}

export interface HeadersTable {
    key: string;
    title: string;
    type?: 'actions' | 'default';
}

export interface RouteMeta {
    requiresAuth?: boolean;
    layout?: string;
    icon?: IconName; // Use the specific IconName type here
    title?: string; // Add any other meta properties you might use
}

export type AppRouteRecordRaw = RouteRecordRaw & {
    meta?: RouteMeta;
};