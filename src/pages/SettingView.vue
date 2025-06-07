<template>
    <div class="flex flex-col items-center justify-center bg-gray-100">
        <h1 class="text-3xl font-bold mb-4">Settings</h1>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="theme">
                    Theme
                </label>
                <select
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="theme"
                    v-model="theme"
                >
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                </select>
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="language">
                    Language
                </label>
                <select
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="language"
                    v-model="language"
                >
                    <option>English</option>
                    <option>Thai</option>
                </select>
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    @click="saveSettings"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const theme = ref('Light');
const language = ref('English');

const saveSettings = () => {
    // Save settings here
    console.log('Saving settings', theme.value, language.value);
};
</script>