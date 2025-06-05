

interface routeGuardType {
    beforeEach: (callback: (to: any, from: any, next: any) => void) => void;
}

export const routeGuard = (router: routeGuardType) => {
    router.beforeEach((to , _from , next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/');
    } else {
        next();
    }
    })
}