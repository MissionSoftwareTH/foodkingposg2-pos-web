<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { ref, shallowRef, watch } from 'vue';
import { IconBuildingStore, IconChevronsDown, IconDeviceDesktop, IconExclamationCircle, IconFileSettings, IconLayoutDashboard, IconLogs, IconPackage, IconShoppingCart, IconUsers } from '@tabler/icons-vue'; // Import all icons you use
import type { IconName } from '../../../router/routePath';
import type { AppRouteRecordRaw } from '../../../types';

// Explicitly type iconComponents with Record<IconName, any>
const iconComponents = shallowRef<Record<IconName, any>>({
    'Dashboard': IconLayoutDashboard,
    'Management': IconFileSettings,
    'Store Management': IconBuildingStore,
    'Product Management': IconShoppingCart,
    'Stock Management': IconPackage,
    'POS Management': IconDeviceDesktop,
    'Admin Management': IconUsers,
    'Activity logs': IconLogs,
    'non_icon': IconExclamationCircle,
});

interface Props {
  item: AppRouteRecordRaw;
}

const props = defineProps<Props>();

const collapseCheckbox = ref<HTMLInputElement | null>(null); // Create a ref for the checkbox
const router = useRouter(); // Get the router instance

watch(() => router.currentRoute.value.path, (newPath) => {
  // ตรวจสอบเฉพาะในกรณีที่ item ปัจจุบันเป็นเมนูแบบ Collapse (มี children)
  if (props.item.children && props.item.children.length > 0) {
    // ตรวจสอบว่าเส้นทางใหม่ (newPath) เป็นหนึ่งใน children ของ item นี้หรือไม่
    const isChildRoute = props.item.children.some(child => {
      // ตรวจสอบแบบตรงตัว หรือเป็นส่วนหนึ่งของ path (สำหรับ nested routes)
      return newPath === child.path || newPath.startsWith(child.path + '/');
    });

    // ถ้าเส้นทางใหม่ไม่ใช่ child route ของ Collapse นี้ ให้ปิด Collapse
    if (!isChildRoute && collapseCheckbox.value) {
      collapseCheckbox.value.checked = false;
    }
  }
}, { immediate: true }); // `immediate: true` จะทำให้ watcher ทำงานทันทีเมื่อ component ถูกสร้างขึ้น
</script>
<template>
    <li>
        <div tabindex="0" class="collapse rounded-xl" v-if="item.children && item.children.length">
            <input type="checkbox" className="peer absolute" ref="collapseCheckbox"/>
            <div 
                class=" peer-checked:bg-primary peer-checked:text-primary-content peer-checked:stroke-primary-content collapse-title flex items-center px-2 py-2 bg-base-100 rounded-xl hover:bg-primary/80 hover:text-primary-content hover:stroke-primary-content transition-all duration-500 ease-in-out">
                <component 
                v-if="item?.meta?.icon && iconComponents[item.meta.icon]" 
                :is="iconComponents[item.meta.icon]"
                class="size-8"
                />
                <h1 class="overflow-hidden group-hover:px-4 font-semibold whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs transition-all duration-500 ease-in-out">{{ item.name }}</h1>

            </div>
            <div class="collapse-content flex flex-col p-0 gap-2 peer-checked:pt-2">
                <div><IconChevronsDown class="mx-auto text-primary"/></div>
                <SidebarMenu v-for="child in item.children" :item="child" :key="child.name"/>
                <div class="divider m-0"></div>
            </div>
        </div>
        <RouterLink 
            v-else
            :to="item.path" 
            exactActiveClass="bg-primary text-primary-content stroke-primary-content"
            class="flex items-center px-2 py-2 bg-base-100 rounded-xl hover:bg-primary/80 hover:text-primary-content hover:stroke-primary-content transition-all duration-500 ease-in-out">
            <component 
                v-if="item?.meta?.icon && iconComponents[item.meta.icon]" 
                :is="iconComponents[item.meta.icon]"
                class="size-8"
            />
            <h1 class="overflow-hidden group-hover:px-4 font-semibold whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs transition-all duration-500 ease-in-out">{{ item.name }}</h1>
        </RouterLink>
    </li>
</template>