import type AuthLayout from '../layouts/AuthLayout.vue';
import type BlankLayout from '../layouts/BlankLayout.vue';
export * from './users';


export interface Layouts {
  [key: string]: typeof BlankLayout | typeof AuthLayout;
  BlankLayout: typeof BlankLayout;
  AuthLayout: typeof AuthLayout;
}