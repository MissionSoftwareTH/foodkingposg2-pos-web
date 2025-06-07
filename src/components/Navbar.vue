<template>
    <nav class="navbar justify-between">
        <div class="">
            <img src="/assets/images/logo.svg" alt="logo">
        </div>
        <div class="flex items-center gap-2">
            <ThemeBtn/>
            <LanguageBtn/>
            <ProfileBtn/>
        </div>
    </nav>
</template>

<script setup lang="ts">
import LanguageBtn from './LanguageBtn.vue';
import ProfileBtn from './ProfileBtn.vue';
import ThemeBtn from './ThemeBtn.vue';
</script>
