import type AuthLayout from '../layouts/AuthLayout.vue';
import type BlankLayout from '../layouts/BlankLayout.vue';
export * from './users';
export * from './api'


export interface Layouts {
  [key: string]: typeof BlankLayout | typeof AuthLayout;
  BlankLayout: typeof BlankLayout;
  AuthLayout: typeof AuthLayout;
}

export interface loginPayload {
    Email?: string;
    Password?: string;
    TokenRecaptcha?: string;
    otp?: string;
    TempToken?: string;
    RefCode?: string;
}