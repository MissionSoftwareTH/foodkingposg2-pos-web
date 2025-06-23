<template>
  <div v-if="!isLoading" class="overflow-x-auto text-nowrap bg-base-100">
      <table class="min-w-full relative">
        <thead class="bg-primary">
          <tr>
            <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="px-6 py-4 text-left text-sm font-semibold text-primary-content uppercase tracking-wider"
            >
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-base-100 divide-y divide-primary">
        <tr v-if="isError">
          <td :colspan="headers.length" class="px-6 py-8 text-center text-base-content text-xl">
            <div class="flex flex-col justify-center items-center gap-2">
                <IconPlugConnectedX class="size-60 text-base-100"/>
                <h1>Lost Connection</h1>
            </div>
          </td>
        </tr>
        <tr v-else-if="items && items.length === 0">
          <td :colspan="headers.length" class="px-6 py-8 text-center text-base-content text-xl">
            <div class="flex flex-col justify-center items-center gap-2">
                <IconShoppingBagX class="size-60 text-base-100"/>
                <h1>no data availiable</h1>
            </div>
          </td>
        </tr>
        <tr v-else v-for="(item, index) in items" :key="item.id" class="relative even:bg-base-300">
          <td
            v-for="header in headers"
            :key="header.key"
            class="px-6 py-4 whitespace-nowrap text-base text-base-content "
          >
            <span v-if="header.type !== 'actions'">{{ item[header.key] }}</span>
            <span v-else><slot :name="header.key" :item="item" :index="index"></slot></span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :items-per-page="itemPerPage" :current-page="currentPage" :total-items="totalItems" @page-changed="handleEmit"/>
  </div>
  <div v-else class="w-full space-y-2">
      <div class=" skeleton h-15 mb-2"></div>
      <div class=" skeleton h-10"></div>
      <div class=" skeleton h-10"></div>
      <div class=" skeleton h-10"></div>
      <div class=" skeleton h-10"></div>
  </div>
</template>

<script lang="ts" setup>
import { IconPlugConnectedX, IconShoppingBagX } from '@tabler/icons-vue';
import type { HeadersTable } from '../types';
import Pagination from './Pagination.vue';

const emit = defineEmits<{
  (e: 'page-changed', page: number): void;
}>();

const handleEmit = (emitValue:number) => {
  emit('page-changed', emitValue);
}

defineProps({
  headers: {
    type: Array as () => HeadersTable[],
    required: true,
  },
  items: {
    type: Array as () => any[] | undefined,
    required: true,
  },
  isError: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  itemPerPage: {
    type: Number,
    default: 5,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  totalItems: {
    type: Number,
    default: 1,
  }
});
</script>