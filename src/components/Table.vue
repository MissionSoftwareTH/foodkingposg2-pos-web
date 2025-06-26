<template>
  <div v-if="!isLoading" class="overflow-hidden text-nowrap bg-base-100 rounded-box">
      <div ref="tableContainerRef" class="overflow-x-auto w-full h-full">
        <table class="min-w-full relative">
          <thead class="bg-primary">
            <tr>
              <th
                v-for="header in headers.filter((h) => h.type !='actions')"
                :key="header.key"
                scope="col"
                class="px-6 py-4 text-left text-sm font-semibold text-primary-content uppercase tracking-wider"
              >
                {{ header.title }}
              </th>
              <th
                key="table-action"
                scope="col"
                class=" text-left text-sm font-semibold text-primary-content uppercase tracking-wider sticky right-0 bg-primary z-10 px-6 py-4 before:w-0.5 before:h-full before:absolute before:bg-base-300 before:left-0 before:top-0"
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody class="bg-base-100 divide-y divide-primary">
            <tr v-if="isError">
              <td :colspan="headers.length + 1" class="px-6 py-8 text-center text-base-content text-xl">
                <div class="flex flex-col justify-center items-center gap-2 my-10">
                  <div class="rounded-full bg-base-content size-60 flex justify-center items-center">
                    <IconPlugConnectedX class="size-40 text-base-100"/>
                  </div>
                  <h1>Lost Connection</h1>
                </div>
              </td>
            </tr>
            <tr v-else-if="items && items.length === 0">
              <td :colspan="headers.length + 1" class="px-6 py-8 text-center text-base-content text-xl">
                <div class="flex flex-col justify-center items-center gap-2">
                  <div class="rounded-full bg-base-content size-60 flex justify-center items-center">
                    <IconShoppingBagX class="size-40 text-base-100 "/>
                  </div>
                  <h1>no data availiable</h1>
                </div>
              </td>
            </tr>
            <tr v-else v-for="(item, index) in items" :key="item.id" class="relative">
              <td
                v-for="header in headers.filter((h) => h.type !== 'actions')"
                :key="header.key"
                class="px-6 py-4 whitespace-nowrap text-base text-base-content "
              >
                <span v-if="header.type === 'custom'"><slot :name="header.key" :item="item" :index="index"></slot></span>
                <span v-else>{{ item[header.key] }}</span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-base text-base-content box-border sticky right-0 z-10 bg-base-100 before:w-0.5 before:h-full before:absolute before:bg-base-300 before:left-0 before:top-0"
              >
                <slot name="actions" :item="item" :index="index"></slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
import { onMounted, onUnmounted, ref } from 'vue';
import { OverlayScrollbars } from 'overlayscrollbars';

const tableContainerRef = ref<HTMLElement | null>(null);
let osInstance: any = null;
onMounted(() => {
  if (tableContainerRef.value) {
    osInstance = OverlayScrollbars(tableContainerRef.value, {
      overflow: {
        x: 'scroll',
        y: 'hidden',
      },
      scrollbars: {
        theme: 'os-theme-dark',
        visibility: 'auto',
        autoHide: 'leave',
        autoHideDelay: 500,
      },
    });
  }
});
onUnmounted(() => {
  if (osInstance) {
    osInstance.destroy();
  }
});

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