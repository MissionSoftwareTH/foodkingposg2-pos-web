<template>
    <div class="breadcrumbs w-full h-full flex flex-col p-2">
        <ul class="mb-4">
            <li v-for="item in mypath" :key="item" class="first:text-3xl first:font-semibold" >{{ item }}</li>
        </ul>
        <div class="card flex-row overflow-hidden h-full">
            <div class="flex-1 bg-base-200 flex flex-col font-semibold">
                    <SettingMenu
                        v-for="item in menuItems"
                        :key="item.id"
                        :item="item"
                    />
            </div>
            <div class="flex-5">
              <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import SettingMenu from '../components/setting_menu/SettingMenu.vue';
import type { MenuItem } from '../types';
import { computed } from 'vue';

const menuItems: MenuItem[] = [
  {
    id: '1',
    label: 'Account',
    children: [
      {
        id: '1.1',
        label: 'personal info',
        path: '/setting/account/info',
      },
      {
        id: '1.2',
        label: 'change password',
        path: '/setting/account/change-password',
      },
    ],
  },
  {
    id: '2',
    label: 'Appearance',
    children: [
      {
        id: '2.1',
        label: 'UI color',
        path: '#',
      },
      {
        id: '2.2',
        label: 'language',
        path: '#',
      },
    ],
  },
];

const route = useRoute();
const mypath = computed(() => {
  let path:typeof route.name[] = []
  route.matched.forEach(r => {
    path.push(r.name)
  });
  return path;
});
</script>