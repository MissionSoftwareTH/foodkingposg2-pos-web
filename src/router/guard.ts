
interface routeGuardType {
    beforeEach: (callback: (to: any, from: any, next: any) => void) => void;
}

export const routeGuard = (router: routeGuardType) => {
    router.beforeEach((to , _from , next) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (to.name === 'not-found') {
            return next();
        }

        if(isLoggedIn) {
            if(to.meta.requiresAuth) {
                return next();
            }
            next('/dashboard')
        } else if (!isLoggedIn) {
            if(!to.meta.requiresAuth) {
                return next();
            }
            next('/')
        }
    })
}