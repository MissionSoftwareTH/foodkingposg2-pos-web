<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { routes } from '../router/routePath';



</script>
<template>
    <aside class="group h-full bg-base-300 rounded-xl p-3 overflow-hidden text-nowrap shadow-lg">
        <ul class="flex flex-col gap-2">
            <li v-for="(link , index) in routes" class="" :key="link.path">
                <RouterLink :to="link.path" class="flex items-center px-2 py-2 bg-base-100 rounded-xl">
                    <div class="first:flex px-4 py-2">{{ index+1 }}</div>
                    <h1 class="overflow-hidden whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs transition-all duration-500 ease-in-out">{{ link.name }}</h1>
                </RouterLink>
            </li>
        </ul>
    </aside>
</template>