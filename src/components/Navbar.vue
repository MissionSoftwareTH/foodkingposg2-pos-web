<template>
    <nav class="navbar justify-between">
        <div class="font-extrabold italic flex text-4xl text-shadow-md px-4 max-lg:hidden">
             <h1 class="text-primary">POSKING</h1><h1 class="text-secondary">-</h1><h1 class="text-accent">SERVER</h1>
        </div>
        <button class="btn btn-circle rounded-box lg:hidden" @click="toggle.toggleSidebar()">
            <IconMenu2/>
        </button>
        <div class="flex items-center gap-2">
            <ThemeBtn/>
            <LanguageBtn/>
            <ProfileBtn/>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { IconMenu2 } from '@tabler/icons-vue';
import LanguageBtn from './LanguageBtn.vue';
import ProfileBtn from './ProfileBtn.vue';
import ThemeBtn from './ThemeBtn.vue';
import { useToggleStore } from '../store/toggleStore';

const toggle = useToggleStore();
</script>
