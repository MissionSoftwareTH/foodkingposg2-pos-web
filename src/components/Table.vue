<template>
  <div class="overflow-x-auto text-nowrap">
    <table class="min-w-full relative">
      <thead class="bg-primary">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="px-6 py-4 text-left text-xs font-semibold text-primary-content uppercase tracking-wider"
          >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-base-300 divide-y divide-primary">
        <tr v-if="items && items.length === 0">
          <td :colspan="headers.length" class="px-6 py-8 text-center text-base-content text-lg">
            <div class="flex flex-col justify-center items-center gap-2">
                <IconShoppingBagX class="size-60 text-base-100"/>
                <h1>no data availiable</h1>
            </div>
          </td>
        </tr>
        <tr v-else v-for="(item, index) in items" :key="item.id" class="relative">
          <td
            v-for="header in headers"
            :key="header.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-base-content"
          >
            <span v-if="header.type !== 'actions'">{{ item[header.key] }}</span>
            <span v-else><slot :name="header.key" :item="item" :index="index"></slot></span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination />
  </div>
</template>

<script lang="ts" setup>
import { IconShoppingBagX } from '@tabler/icons-vue';
import type { HeadersTable } from '../types';
import Pagination from './Pagination.vue';

defineProps({
  headers: {
    type: Array as () => HeadersTable[],
    required: true,
  },
  items: {
    type: Array as () => any[] | undefined,
    required: true,
  },
});
</script>