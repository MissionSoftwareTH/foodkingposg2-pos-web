<template>
    <div v-if="isLogin" class="relative inline-block text-left">
        <div class=" loading loading-spinner size-12 p-2" v-if="isPending"></div>
        <button
            v-else
            @click="isOpen = !isOpen"
            type="button"
            class="group hover:bg-base-300 focus:bg-base-300 transition-all duration-300 p-2 rounded-full flex flex-row items-center w-fit h-fit"
            id="menu-button"
            aria-expanded="false"
            aria-haspopup="true"
        >
            <div class="size-12 rounded-full overflow-hidden relative bg-primary text-primary-content flex justify-center items-center ">
                <img class="w-full h-full object-fill" src="/assets/images/profile-mock.png" alt="myimage">
            </div>
            <div class="text-start overflow-hidden font-semibold whitespace-nowrap opacity-0 max-w-0 group-focus:opacity-100 group-focus:px-4 group-focus:max-w-xs transition-all duration-500 ease-in-out">
                <h1 class="text-base font-semibold space-x-1">{{ isError ? 'unknown' : userData?.FirstName }} {{ isError ? 'unknown' : userData?.LastName}}</h1>
                <h2 class="text-sm text-base-content/70">{{ isError ? 'unknown' : userData?.Email }}</h2>
            </div>
        </button>
        <div
            v-if="isOpen"
            class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-base-300 ring-opacity-5 focus:outline-none z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
        >
            <div class="py-1 text-base" role="none">
                <RouterLink to="/setting/account/info" class="block px-4 py-2 hover:bg-base-100" role="menuitem" tabindex="-1" id="menu-item-0"><span class="flex gap-2"><IconSettings/>Setting</span></RouterLink>
                <button @click="logout" type="button" class="block w-full text-left px-4 py-2 hover:bg-error hover:text-error-content" role="menuitem" tabindex="-1" id="menu-item-1">
                    <span class="flex gap-2"><IconLogout/>Logout</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';
import { IconLogout, IconSettings } from '@tabler/icons-vue';
import { fetchUserInfo, logout } from '../services/utils';
import { useQuery } from '@tanstack/vue-query';
import type { User_Data } from '../types';

const isOpen = ref<boolean>(false);
const isLogin = localStorage.getItem('isLoggedIn');

const {data: userData , isPending , isError} = useQuery<User_Data>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    enabled: !!isLogin,
})

onMounted(() => {
    document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
});

const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const button = document.getElementById('menu-button');
    if (isOpen.value && button && !button.contains(target) ) {
        isOpen.value = false;
    }
};
</script>