<template>
    <div class="overflow-x-auto">
        <table class="min-w-full  relative">
            <thead class="bg-primary">
                <tr>
                    <th
                        v-for="header in headers"
                        :key="header.key"
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-primary-content uppercase tracking-wider"
                    >
                        {{ header.title }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-base-300 divide-y divide-primary">
                <tr v-for="(item,index) in items" :key="item.id" class="relative">
                    <td
                        v-for="header in headers"
                        :key="header.key"
                        class="px-6 py-4 whitespace-nowrap text-sm text-base-content"
                    >
                        <span v-if="header.type !== 'actions'">{{ item[header.key] }}</span>
                        <span v-else><slot name="actions" :item="item" :index="index"></slot></span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import type { HeadersTable } from '../types';

defineProps({
    headers: {
        type: Array as () => HeadersTable[],
        required: true,
    },
    items: {
        type: Array as () => any[],
        required: true,
    },
});
</script>
