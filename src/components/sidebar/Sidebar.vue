<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { IconName } from '../../router/routePath';
import { useAppSetupStore } from '../../store/appSetupStore';
import type { AppRouteRecordRaw, User_Data } from '../../types';
import SidebarMenu from './components/SidebarMenu.vue';
import { IconLock, IconLockOpen } from '@tabler/icons-vue';
import { useQuery } from '@tanstack/vue-query';
import { fetchUserInfo } from '../../services/utils';
import { computed, ref, watch } from 'vue'; // เพิ่ม ref และ watch

const isLogin = localStorage.getItem('isLoggedIn');
const router = useRouter();
const appSetupStore = useAppSetupStore();

// ใช้ ref เพื่อเก็บ Map ที่จะถูกอัปเดตเมื่อ userData เปลี่ยนแปลง
const permissionMap = ref(new Map<string, Array<{ SubPermissionName: string }>>());

const { data: userData } = useQuery<User_Data>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: !!isLogin,
});

// Watch สำหรับสร้าง permissionMap เมื่อ userData.value.Permission พร้อมใช้งาน
watch(userData, (newUserData) => {
    if (newUserData?.Permission) {
        const newMap = new Map<string, Array<{ SubPermissionName: string }>>();
        newUserData.Permission.forEach((item) => {
            newMap.set(item.PermissionName, item.SubPermissions);
        });
        permissionMap.value = newMap;
    }
}, { immediate: true }); // immediate: true เพื่อให้ทำงานทันทีเมื่อ component ถูก mount ถ้า userData มีค่าอยู่แล้ว

const navLinks = computed(() => {
    if (!userData.value?.Permission || permissionMap.value.size === 0) {
        return [];
    }

    const allRoutes = router.getRoutes();
    const filteredAndTransformedRoutes: AppRouteRecordRaw[] = [];

    allRoutes.forEach((route) => {
        // ตรวจสอบเฉพาะ route ที่มีชื่อ (string) และมีอยู่ใน permissionMap
        if (typeof route.name === 'string' && permissionMap.value.has(route.name)) {
            const permissionChildren = permissionMap.value.get(route.name);
            const newRoute: AppRouteRecordRaw = { ...route } as AppRouteRecordRaw; // คัดลอก route เพื่อไม่แก้ไข original

            if (route.children && route.children.length > 0 && permissionChildren && permissionChildren.length > 0) {
                const sourceChildrenValues = new Set(permissionChildren.map(child => child.SubPermissionName));
                const filteredChildren: AppRouteRecordRaw[] = [];

                route.children.forEach((child) => {
                    if (typeof child.name === 'string' && sourceChildrenValues.has(child.name)) {
                        filteredChildren.push({ ...child } as AppRouteRecordRaw); // คัดลอก child ด้วย
                    }
                });

                if (filteredChildren.length > 0) {
                    newRoute.children = filteredChildren;
                } else {
                    // ถ้าไม่มี sub-permission ที่ตรงกัน ก็ไม่ควรมี children
                    delete newRoute.children;
                }
            } else if (route.children && route.children.length > 0 && (!permissionChildren || permissionChildren.length === 0)) {
                // ถ้า route ใน router มี children แต่ user ไม่มี permission สำหรับ sub-items
                // ให้ลบ children ออกจาก newRoute
                delete newRoute.children;
            }
            
            // เพิ่ม route ที่ผ่านการกรองและปรับปรุงแล้ว
            filteredAndTransformedRoutes.push(newRoute);
        }
    });

    return filteredAndTransformedRoutes.map(route => {
        // ให้แน่ใจว่า meta มี type ที่ถูกต้อง
        return {
            ...route,
            meta: route.meta as { layout: string, icon?: IconName, requiresAuth: boolean, title?: string, children?: AppRouteRecordRaw[] }
        };
    });
});

const handleSidebarToggle = (value: boolean) => {
    appSetupStore.setSidebarExpand(value);
};
</script>

<template>
    <aside class="group h-full bg-base-100 rounded-xl p-4 overflow-hidden text-nowrap shadow-lg relative">
        <ul class="flex flex-col gap-4">
            <SidebarMenu v-for="link in navLinks" :item="link" :key="link.name || link.path" />
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