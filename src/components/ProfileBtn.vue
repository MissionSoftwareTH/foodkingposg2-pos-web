<script setup lang="ts">
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import { IconLogout } from '@tabler/icons-vue';
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
<template>
    <div v-if="isLogin" class="relative inline-block text-left h-12">
        <div class=" loading loading-spinner size-12 p-2 h-full" v-if="isPending"></div>
        <button
            v-else
            @click="isOpen = !isOpen"
            type="button"
            class="group hover:bg-base-100 focus:bg-base-100 transition-all duration-300 rounded-full flex flex-row items-center w-fit h-fit overflow-hidden"
            
            id="menu-button"
            aria-expanded="false"
            aria-haspopup="true"
        >
            <div class="size-12 rounded-full overflow-hidden relative bg-primary text-primary-content flex gap-2 justify-center items-center ">
                <img class="w-full h-full object-fill" src="/assets/images/profile-mock.png" alt="myimage">
            </div>
            <div 
                class="text-start relative overflow-hidden font-semibold flex whitespace-nowrap opacity-0 max-w-0 transition-all duration-500 ease-in-out"
                :class="isOpen && 'opacity-100 pl-4 pr-8 max-w-xs'"
            >
                <div class="">
                    <h1 class="text-base font-semibold space-x-1">{{ isError ? 'unknown' : userData?.FirstName }} {{ isError ? 'unknown' : userData?.LastName}}</h1>
                    <h2 class="text-sm text-base-content/70">{{ isError ? 'unknown' : userData?.Email }}</h2>
                </div>
            </div>
            <button
            v-if="isOpen"
            class="group/logout flex items-center justify-center absolute right-0 top-0 h-full bg-error/30 rounded-r-full px-2"
            :class="isOpen && 'opacity-100 hover:max-w-xs hover:bg-error transition-all duration-500 ease-in-out'"
            type="button"
            @click="logout"
            >
            <span
            class="max-w-0 opacity-0 transition-all duration-500 ease-in-out flex items-center justify-center gap-1"
            :class="isOpen && 'group-hover/logout:max-w-xs group-hover/logout:opacity-100'"
            >
                <IconLogout class="transition-all duration-200 ease-in-out"/>
                Logout
            </span>
            </button>
        </button>
    </div>
</template>