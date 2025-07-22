<script setup lang="ts">
interface TitleBarCardProps {
    title: string;
    text:string | number | undefined;
    isPending: boolean;
}
const props = defineProps<TitleBarCardProps>();
</script>
<template>
    <div class="rounded-lg bg-base-100/50 p-4 w-full sm:max-w-1/5 min-w-fit flex-1 flex flex-col gap-2">
        <h1 class="text-sm font-light text-nowrap">{{ props.title }}</h1>
        <div  class="h-full flex justify-start">
            <h1 v-if="!props.isPending" class="text-4xl" >{{ props.text }}</h1><span v-else class=" loading loading-dots"></span>
        </div>
        
    </div>
</template>