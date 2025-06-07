<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { shallowRef } from 'vue';
import { IconHome, IconSettings, IconUsers } from '@tabler/icons-vue'; // Import all icons you use
import type { IconName } from '../router/routePath';

// Explicitly type iconComponents with Record<IconName, any>
const iconComponents = shallowRef<Record<IconName, any>>({
    'home': IconHome,
    'settings': IconSettings, // Example: Add more icons as defined in IconName
    'users': IconUsers,     // Example
});

const router = useRouter();

// Type the filtered routes to ensure TypeScript knows about `meta` properties
const navLinks = router.getRoutes().filter(route => {
    // Type guard to ensure meta exists and is of our custom type
    return route.meta && (route.meta as any).layout === 'AuthLayout'; // Temporarily cast to any if needed, then refine
})
.map(route => {
    // Map to a more specific type if necessary, or directly use
    return {
        ...route,
        meta: route.meta as { layout: string, icon?: IconName, requiresAuth: boolean, title?: string } // Cast meta to a more specific shape here
    };
});

</script>
<template>
    <aside class="group h-full bg-base-300 rounded-xl p-3 overflow-hidden text-nowrap shadow-lg">
        <ul class="flex flex-col gap-2">
            <li v-for="(link) in navLinks" class="" :key="link.name as string"> 
                <RouterLink 
                    :to="link.path" 
                    class="flex items-center px-2 py-2 bg-base-100 rounded-xl hover:bg-primary hover:text-primary-content hover:stroke-primary-content transition-all duration-500 ease-in-out"
                >
                    <component 
                        v-if="link.meta.icon && iconComponents[link.meta.icon]" 
                        :is="iconComponents[link.meta.icon]" 
                    />
                    <h1 class="overflow-hidden group-hover:px-4 font-semibold whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs transition-all duration-500 ease-in-out">{{ link.name }}</h1>
                </RouterLink>
            </li>
        </ul>
    </aside>
</template>