<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { ref, shallowRef, watch } from 'vue';
import { IconBuildings, IconBuildingStore, IconCategory, IconChevronsDown, IconDeviceDesktop, IconExclamationCircle, IconFileSettings, IconHome, IconLayoutDashboard, IconLogs, IconPackage, IconShoppingCart, IconUsers } from '@tabler/icons-vue'; // Import all icons you use
import type { IconName } from '../../../router/routePath';
import type { AppRouteRecordRaw } from '../../../types';
import { useAppSetupStore } from '../../../store/appSetupStore';

const iconComponents = shallowRef<Record<IconName, any>>({
    'Dashboard': IconHome,
    'Management': IconFileSettings,
    'Store Management': IconBuildingStore,
    'Product Management': IconShoppingCart,
    'Stock Management': IconPackage,
    'POS Management': IconDeviceDesktop,
    'Admin Management': IconUsers,
    'Categories Management': IconCategory,
    'Brand Management': IconBuildings,
    'Activity logs': IconLogs,
    'non_icon': IconExclamationCircle,
});

interface Props {
  item: AppRouteRecordRaw;
}

const props = defineProps<Props>();
const router = useRouter();
const isExpanded = ref(false);
const handleToggle = () => {
  isExpanded.value = !isExpanded.value
}
const appSetupStore = useAppSetupStore();

watch(() => router.currentRoute.value.path, (newPath) => {
  if (props.item.children && props.item.children.length > 0) {
    const isChildRoute = props.item.children.some(child => {
      return newPath === child.path || newPath.startsWith(child.path + '/');
    });
    if (!isChildRoute && isExpanded.value) {
      isExpanded.value = false;
    }
  }
}, { immediate: true });
</script>
<template>
    <li>
      <div 
        tabindex="0" 
        class="collapse rounded-xl" 
        v-if="item.children && item.children.length"
        :class="isExpanded ? `collapse-open` : ``"
        >
        <button
        @click="handleToggle"
        :class="isExpanded ? `text-primary-content stroke-primary-content bg-primary` : ``"
        class="collapse-title flex items-center px-2 py-2 bg-base-100 rounded-xl hover:bg-primary/80 hover:text-primary-content hover:stroke-primary-content transition-all duration-500 ease-in-out">
        <component 
        v-if="item?.meta?.icon && iconComponents[item.meta.icon]" 
        :is="iconComponents[item.meta.icon]"
        class="size-8"
        />
                <h1 
                :class="appSetupStore.isSideBarExpanded ? `px-4` : `opacity-0 max-w-0 group-hover:px-4 group-hover:opacity-100 group-hover:max-w-xs`"
                class="overflow-hidden font-semibold whitespace-nowrap transition-all duration-500 ease-in-out">{{ item.name }}</h1>

            </button>
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
                <h1 
                :class="appSetupStore.isSideBarExpanded ? `px-4` : `opacity-0 max-w-0 group-hover:px-4 group-hover:opacity-100 group-hover:max-w-xs`"
                class="overflow-hidden font-semibold whitespace-nowrap transition-all duration-500 ease-in-out">{{ item.name }}</h1>
        </RouterLink>
    </li>
</template>