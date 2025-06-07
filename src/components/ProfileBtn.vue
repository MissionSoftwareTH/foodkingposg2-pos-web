<template>
    <div v-if="isLogin" class="relative inline-block text-left">
        <button
            @click="isOpen = !isOpen"
            type="button"
            class="group hover:bg-base-300 focus:bg-base-300 transition-all duration-300 p-2 rounded-full flex flex-row items-center"
            id="menu-button"
            aria-expanded="false"
            aria-haspopup="true"
        >
            <div class="size-10 rounded-full overflow-hidden relative bg-primary text-primary-content flex justify-center items-center">
                <img v-if="myimage" :src="myimage" alt="myimage">
                <h1 v-else >T</h1>
            </div>
            <div class="text-start overflow-hidden font-semibold whitespace-nowrap opacity-0 max-w-0 group-focus:opacity-100 group-focus:px-4 group-focus:max-w-xs transition-all duration-500 ease-in-out">
                <h1 class="text-base font-semibold">{{info?.username || 'unknown'}}</h1>
                <h2 class="text-sm text-base-content/70">{{info?.email || 'unknown'}}</h2>
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
            <div class="py-1 text-sm" role="none">
                <RouterLink to="setting" class="block px-4 py-2 hover:bg-base-100" role="menuitem" tabindex="-1" id="menu-item-0"><span class="flex gap-2"><IconSettings/>Setting</span></RouterLink>
                <button @click="logout" type="button" class="block w-full text-left px-4 py-2 hover:bg-error hover:text-error-content" role="menuitem" tabindex="-1" id="menu-item-1">
                    <span class="flex gap-2"><IconLogout/>Logout</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const isOpen = ref<boolean>(false);
const isLogin = localStorage.getItem('isLoggedIn');
const info = ref();
const router = useRouter();
const myimage = 'assets/images/profile-mock.png'

import { onMounted, onUnmounted } from 'vue';
import { IconLogout, IconSettings } from '@tabler/icons-vue';



onMounted(() => {
    const rawinfo = localStorage.getItem('info');
    if(rawinfo) {
        info.value = JSON.parse(rawinfo) || ''
    }
    console.log(info.value)
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

const logout = () => {
    // Handle logout logic here
    info.value = ''
    localStorage.clear();
    router.replace('/');
    console.log('Logout clicked');
};
</script>