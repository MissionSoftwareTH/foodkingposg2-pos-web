<template>
    <Transition name="fade">
        <dialog 
            v-if="dialogStore.isOpen"
            class="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center"
            @click.self="dialogStore.closeDialog"
        >
            <div class="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-md relative overflow-hidden flex-semibold">
                <component :is="iconComponents[dialogStore.props?.status || 'error']" class="absolute -bottom-20 -right-10 size-56 z-0 opacity-40" :class="setColor"/>
                <div class="relative z-10"> 
                    <div class="flex gap-2 items-center " :class="textAndStrokeColor">
                        <component :is="iconComponents[dialogStore.props?.status || 'error']" class="size-8"/>
                        <h2 class="text-xl font-semibold uppercase"> {{ dialogStore.props?.status || 'error' }}</h2>
                    </div>
                    <p class="my-6 text-base-content">{{ dialogStore.componentName || '' }}</p>
                    <div class="flex justify-start ">
                        <button
                            :disabled="dialogStore.props?.type === 'force'"
                            class="bg-base-100 hover:outline-1 text-base-content font-semibold py-2 px-4 rounded mr-2 disabled:bg-white/50 disabled:text-black/50"
                            :class="setColor"
                            @click="handleCloseBtn"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    </Transition>
</template>

<script setup lang="ts">
import { IconAlertTriangle, IconCancel, IconCircleCheck } from '@tabler/icons-vue';
import { useDialogStore } from '../../store/dialogStore';
import { computed, shallowRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from '../../services/utils';

const dialogStore = useDialogStore();
const router = useRouter();
const iconComponents = shallowRef({
  'error': IconCancel,
  'warning': IconAlertTriangle,
  'success': IconCircleCheck
});

const setColor = computed(() => {
    switch (dialogStore.props?.status) {
        case 'success': return 'text-success outline-success';
        case 'warning': return 'text-warning outline-warning';
        default: return 'text-error outline-error';
    }
});

const textAndStrokeColor = computed(() => {
    switch (dialogStore.props?.status) {
        case 'success': return 'text-success stroke-success';
        case 'warning': return 'text-warning stroke-warning';
        default: return 'text-error stroke-error';
    }
});

const handleCloseBtn = () => {
    switch (dialogStore.props?.type) {
        case 'force':
            console.log('บังคับออก กดอะไรไม่ได้')
            break;
        case 'link':
            if(dialogStore.props.link) {
                router.replace(dialogStore.props.link)
                console.log('ย้ายไปหน้า ', dialogStore.props.link)
            }
            break;
        default:
            console.log('ปิด dialog');
            break;
    }
    dialogStore.closeDialog();
}

watch(() =>  dialogStore.isOpen , () => {
    if(dialogStore.props?.type === 'force') {
        console.log('force')
        setTimeout(() => {
            dialogStore.closeDialog();
            logout();
        }, 3000);
    }
})

</script>