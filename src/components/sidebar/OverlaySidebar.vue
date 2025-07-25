<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { IconName } from '../../router/routePath';
import type { AppRouteRecordRaw, User_Data } from '../../types';
import SidebarMenu from './components/SidebarMenu.vue';
import { IconLayoutSidebarLeftCollapse, IconSettings } from '@tabler/icons-vue';
import { useQuery } from '@tanstack/vue-query';
import { fetchUserInfo } from '../../services/utils';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'; // เพิ่ม ref และ watch
import { useToggleStore } from '../../store/toggleStore';
import { debounce } from '../../services/utils/debounce';

const isLogin = localStorage.getItem('isLoggedIn');
const router = useRouter();
const toggle = useToggleStore();

// ใช้ ref เพื่อเก็บ Map ที่จะถูกอัปเดตเมื่อ userData เปลี่ยนแปลง
const permissionMap = ref(new Map<string, Array<{ SubPermissionName: string }>>());

const { data: userData } = useQuery<User_Data>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: !!isLogin,
});

const isSettingPage = ref(false);

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

const settingRoute = router.getRoutes().find((r) => r.name === 'Settings' );

watch(() => router.currentRoute.value.path, (newPath) => {
    console.log(newPath)
    if(newPath.includes('setting'))return isSettingPage.value = true;
    isSettingPage.value = false;
}, { immediate: true });


const autoCloseSidebar = () => {
    console.log('1')
    if(window.innerWidth < 1024) return;
    toggle.isSidebar = false;
}

const debouceAutoCloseSidebar = debounce(autoCloseSidebar , 500);

 // เมื่อ component ถูก mount ให้เพิ่ม Event Listener
  onMounted(() => {
    window.addEventListener('resize', debouceAutoCloseSidebar);
  });

  // เมื่อ component ถูก unmount ให้ลบ Event Listener เพื่อป้องกัน memory leaks
  onUnmounted(() => {
    window.removeEventListener('resize', debouceAutoCloseSidebar);
  });

</script>
<template>
    <div class="inset-0 fixed bg-black/50 z-40" :class="toggle.isSidebar ? 'block' : 'hidden'"></div>
    <aside 
    :class="toggle.isSidebar ? 'block' : 'hidden'"
    class="group h-full bg-base-100 p-4 text-nowrap shadow-lg absolute top-0 left-0 z-50"
    >
        <button @click="toggle.toggleSidebar()" class="btn btn-circle absolute m-2 -right-8"><IconLayoutSidebarLeftCollapse /></button>
        <div class="font-extrabold italic flex text-2xl text-shadow-md px-4 py-2 mb-5">
            <h1 class="text-primary">POSKING</h1><h1 class="text-secondary">-</h1><h1 class="text-accent">SERVER</h1>
        </div>
        <ul class="flex flex-col gap-4 h-8/10 overflow-y-auto">
            <SidebarMenu v-for="link in navLinks" :item="link" :key="link.name || link.path" />
            <!-- setting link -->
            <li v-if="settingRoute">
                <RouterLink
                    to="/setting/account/info"
                    :class="isSettingPage && 'bg-primary text-primary-content stroke-primary-content'"
                    class="flex items-center px-2 py-2 bg-base-100 rounded-xl hover:bg-primary/80 hover:text-primary-content hover:stroke-primary-content transition-all duration-500 ease-in-out"
                    @click="() => toggle.isSidebar = false"
                    >
                    <IconSettings class="size-8"/>
                        <h1 class="overflow-hidden font-semibold whitespace-nowrap px-4 transition-all duration-500 ease-in-out">{{ settingRoute.name }}</h1>
                </RouterLink>
            </li>
        </ul>
    </aside>
</template>