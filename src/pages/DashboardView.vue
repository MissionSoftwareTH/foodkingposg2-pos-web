<script setup lang="ts">
import { useAbility } from '@casl/vue';
import { useDialogStore } from '../store/dialogStore';
import { onMounted, ref, watch } from 'vue';
import { useProgressBarStore } from '../store/progressBarStore';
import { useToastStore } from '../store/toastStore';
import { debounce } from '../services/utils/debounce';

// You can add your logic here
const {can: $can} = useAbility();
const progressBarStore = useProgressBarStore();
const toastStore = useToastStore();
const progress = ref(0);
const disabled1 = ref(false);
const progress2 = ref(0);


const loadingMethod = () => {
    progressBarStore.loadingStart();
    setTimeout(() => {
       progressBarStore.loadingStop(); 
    }, 3000);
}

const checkingValue = (value:number) => {
    if(value == 100) {
        toastStore.showToast('Progress 1 is down' , 'error');
        disabled1.value = true;
        progressBarStore.loadingStart();
        setTimeout(() => {
            progressBarStore.loadingStop(); 
            disabled1.value = false;
            progress.value = 0;
        }, 10000);
        return;
    }
    if(value > 80) return toastStore.showToast('Progress 1 is critical reduce the progress !' , 'warning');
    if(value > 50) return toastStore.showToast('Progress 1 is more than 50 !', 'warning');
}

const debounceCheckingValue = debounce(checkingValue , 500);

watch(() => progress.value , (value) => {
    debounceCheckingValue(value);
})

onMounted(() => {
    setTimeout(() => {
        progress.value = 70;
        progress2.value = 80;
    },200)
})

</script>

<template>
    <div class="flex flex-col p-2">
        <h1 class="text-3xl font-semibold mb-4">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Example Card -->
            <div v-if="$can('read','Post')" class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Sending Message</h2>
                    <p>sending message to RabbitMQ</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-success">Send Message</button>
                    </div>
                </div>
            </div>

            <!-- Example Card -->
            <div v-if="$can('edit','all')" class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Notification Toast</h2>
                    <p>Show a notification toast on your screen.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-warning" @click="toastStore.showToast('show the toast','info')">Action</button>
                    </div>
                </div>
            </div>

            <!-- Example Card -->
            <div v-if="$can('manage','all')" class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Progress Bar</h2>
                    <p>Activate progress bar</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-error" @click="loadingMethod">Action</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-base-100 shadow-xl max-w-sm my-4"> 
            <div class=" card-body">
                <div class=" size-[200px] w-full flex items-center">
                    <div class="space-y-2 flex-1">
                        <div class="flex gap-2 items-center"><span class="size-4 bg-primary rounded-full"></span> progress 1</div>
                        <div class="flex gap-2 items-center"><span class="size-4 bg-secondary rounded-full"></span> progress 2</div>
                    </div>
                    <div class="flex-1 relative w-full h-full">
                        <div class="absolute top-0 right-10 radial-progress progress-secondary self-center my-4 duration-700 after:invisible" :aria-valuenow="progress2" :style="`--value: ${progress2}; --size: 160px`" role="progressbar"></div>
                        <div class="absolute top-0 right-10 radial-progress progress-primary self-center my-4 duration-700 after:invisible" :aria-valuenow="progress" :style="`--value: ${progress}; --size: 160px`" role="progressbar">{{progress}}%</div>
                    </div>
                </div>
                <div class="space-y-4">
                    <input type="range" min={0} max="100" v-model="progress" :disabled="disabled1" className="range range-sm w-full range-primary" />
                    <input type="range" min={0} max="100" v-model="progress2" className="range range-sm w-full range-secondary" />
                </div>
            </div>
        </div>
    </div>
</template>