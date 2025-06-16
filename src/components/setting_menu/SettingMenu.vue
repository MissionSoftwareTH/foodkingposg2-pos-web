<template>
    <ul class="list overflow-y-auto">
        <li class="py-4 px-6" v-if="item.path">
            <router-link :to="item.path">{{ item.label }}</router-link>
        </li>
        <li class="text-base text-base-content/50 p-4 pb-2 " v-else>
            <span>{{ item.label }}</span>
        </li>
            <SettingMenu
            v-if="item.children && item.children.length"
            v-for="child in item.children"
            :key="child.id"
            :item="child"
            />
    </ul>
</template>

<script setup lang="ts">
// ต้อง import Type จากไฟล์ที่คุณสร้างไว้
import { RouterLink } from 'vue-router'; // ถ้าใช้ vue-router

import SettingMenu from './SettingMenu.vue';
import type { MenuItem } from '../../types';

interface Props {
  item: MenuItem;
}

defineProps<Props>();

</script>

