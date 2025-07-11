<template>
    <Transition name="fade">
        <dialog 
            v-if="dialogStore.form"
            class="fixed top-0 left-0 w-full h-full bg-black/50 z-70 flex items-center justify-center"
            @click.self="() =>  dialogStore.form = false"
        >
            <slot name="form"></slot>
        </dialog>
    </Transition>
</template>

<script setup lang="ts">
import { useDialogStore } from '../../store/dialogStore';


const dialogStore = useDialogStore();
</script>