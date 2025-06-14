<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { IconName } from '../../router/routePath';
import { useAppSetupStore } from '../../store/appSetupStore';
import type { AppRouteRecordRaw } from '../../types';
import SidebarMenu from './components/SidebarMenu.vue';

// Explicitly type iconComponents with Record<IconName, any>

const router = useRouter();
const appSetupStore = useAppSetupStore();
const navLinks = router.getRoutes().filter(route => {
    return route.name && typeof route.name === 'string' && appSetupStore.permission?.includes(route.name);
})
.map(route => {
    // Map to a more specific type if necessary, or directly use
    return {
        ...route,
        meta: route.meta as { layout: string, icon?: IconName, requiresAuth: boolean, title?: string , children: AppRouteRecordRaw[] } // Cast meta to a more specific shape here
    };
});

console.log(navLinks)

</script>
<template>
    <aside class="group h-full bg-base-300 rounded-xl p-4 overflow-hidden text-nowrap shadow-lg">
        <ul class="flex flex-col gap-4">
            <SidebarMenu v-for="link in navLinks" :item="link" :key="link.name"/>
        </ul>
</aside>
</template>