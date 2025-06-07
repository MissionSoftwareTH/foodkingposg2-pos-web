<script setup lang="ts">
import { useAbility } from '@casl/vue';
import { useDialogStore, type DialogStatus } from '../store/dialogStore';

// You can add your logic here
const {can: $can} = useAbility();
const dialogStore = useDialogStore();
const handleClick = (clickStatus: DialogStatus) => {
    dialogStore.openDialog('Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, ea?',{status: clickStatus});
}
</script>

<template>
    <div class="mx-auto p-2 flex flex-col">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Example Card -->
            <div v-if="$can('read','Post')" class="card bg-base-300 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">View Card</h2>
                    <p>this card for viewer</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-success" @click="handleClick('success')">view</button>
                    </div>
                </div>
            </div>

            <!-- Example Card -->
            <div v-if="$can('edit','all')" class="card bg-base-300 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Edit Card</h2>
                    <p>Another card example.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-warning" @click="handleClick('warning')">Action</button>
                    </div>
                </div>
            </div>

            <!-- Example Card -->
            <div v-if="$can('manage','all')" class="card bg-base-300 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Card 3</h2>
                    <p>A third card for your dashboard.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-error" @click="handleClick('error')">Action</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>