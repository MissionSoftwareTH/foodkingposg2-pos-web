<script setup lang="ts">
import { ref } from 'vue';
import TitleBarCard from '../components/TitleBarCard.vue';
import Stock from '../components/stock/Stock.vue';
import StockCard from '../components/stock/StockCard.vue';
import type { StockTable } from '../types/stock';
import { usePageOptionStore } from '../store/sortingStore';
import StockCardAdd from '../components/stock/StockCardAdd.vue';

const isSelected = ref(false);
const pageOptionStore = usePageOptionStore();
const handleSelectedEmit = (value:StockTable) => {
  isSelected.value = true;
  console.log(value);
}

</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">Stock Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <div class="w-full h-full flex gap-4 p-4 items-center">
          <!-- <TitleBarCard title="Total Stock Records" :text="pageOptionStore.stock.TotalRecords" :is-pending="isTablePending"/> -->
           <button v-if="isSelected" class="btn btn-soft btn-primary" @click="isSelected = false">
              Back to Stock
           </button>
        </div>
    </div>
    <Stock @select-stock="handleSelectedEmit" v-if="!isSelected"/>
    <StockCard v-else />
    <StockCardAdd />
</div>
</template>