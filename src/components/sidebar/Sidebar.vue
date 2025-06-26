<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { IconName } from '../../router/routePath';
import { useAppSetupStore } from '../../store/appSetupStore';
import type { AppRouteRecordRaw, User_Data } from '../../types';
import SidebarMenu from './components/SidebarMenu.vue';
import { IconLock, IconLockOpen } from '@tabler/icons-vue';
import { useQuery } from '@tanstack/vue-query';
import { fetchUserInfo } from '../../services/utils';
import { computed } from 'vue';

// Explicitly type iconComponents with Record<IconName, any>
const isLogin = localStorage.getItem('isLoggedIn');
const router = useRouter();
const appSetupStore = useAppSetupStore();

const {data: userData } = useQuery<User_Data>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: !!isLogin,
})

const navLinks = computed(() => { 
    if (!userData.value?.Permission) {
        return [];
    }
    return router.getRoutes().filter(route => {
        return route.name &&
               typeof route.name === 'string' &&
               userData?.value?.Permission?.some(permission => permission.PermissionName === route.name);
    })
    .map(route => {
        return {
            ...route,
            meta: route.meta as { layout: string, icon?: IconName, requiresAuth: boolean, title?: string , children: AppRouteRecordRaw[] }
        };
    });
});

const handleSidebarToggle = (value: boolean) => {
    appSetupStore.setSidebarExpand(value);
}

</script>
<template>
    <aside class="group h-full bg-base-100 rounded-xl p-4 overflow-hidden text-nowrap shadow-lg relative">
        <ul class="flex flex-col gap-4">
            <SidebarMenu v-for="link in navLinks" :item="link" :key="link.name"/>
        </ul>
        <button 
        @click="handleSidebarToggle(!appSetupStore.isSideBarExpanded)"
        :class="appSetupStore.isSideBarExpanded ? `` : `invisible opacity-0 group-hover:opacity-100 group-hover:visible`"
        class="btn btn-ghost btn-sm btn-circle absolute bottom-2 right-2 transition-all duration-500 ">
            <IconLock v-if="appSetupStore.isSideBarExpanded"/>
            <IconLockOpen v-else />
        </button>
    </aside>
</template>