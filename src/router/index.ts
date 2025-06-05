import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { routes } from './routePath';
import { routeGuard } from './guard';

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

routeGuard(router);

export default router;