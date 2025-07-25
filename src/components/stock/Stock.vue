<script lang="ts" setup>
import { computed, watch } from 'vue';
import { usePageOptionStore } from '../../store/sortingStore';
import Table from '../Table.vue';
import TableSort from '../TableSort.vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { stockTableHeaders } from '../../constants/table';
import { SortOrderOption, stockSortColumnOption } from '../../constants/page_option';
import type { StockResponse, StockTable } from '../../types/stock';
import type { AxiosError, AxiosResponse } from 'axios';
import type { baseResponse, DataBaseResponse } from '../../types';
import apiClient from '../../services/api/apiService';
import { extractPageOption } from '../../services/utils/dataExtract';
import { IconEye, IconFilter2, IconSortAscendingLetters } from '@tabler/icons-vue';
import { useI18n } from 'vue-i18n';
import { translator } from '../../services/utils';

const emit = defineEmits<{
  (e: 'selectStock', selected: StockTable): void;
}>();

const handleEmit = (emitValue:StockTable) => {
    // console.log(emitValue);
    emit('selectStock', emitValue);
}

const queryClient = useQueryClient();
const pageOptionStore = usePageOptionStore();
const { t } = useI18n();
const headers = computed(() => {return translator(stockTableHeaders,t)});
const sortColumnOption = computed(() => {return translator(stockSortColumnOption,t)});
const sortOrder = computed(() => {return translator(SortOrderOption,t)});


//fetch stock
const fetchStock = async ():Promise<StockTable[]> => {
        const apiUrl = '/product/inventory/list';
        const {SortColumn , SortOrder} = pageOptionStore.stock;
        const params = {
          SortColumn ,SortOrder , PageSize:pageOptionStore.stock.PageSize , Page: pageOptionStore.stock.CurrentPage,
        }
        const res:AxiosResponse<baseResponse<DataBaseResponse<StockResponse[]>>> = await apiClient.get(apiUrl , {params} );
        const stockList:StockTable[] = res.data.res_data.ConstructData?.map((item) => ({
            ProductInfo: {
                ProductInfoId: item.ProductInfoId,
                ProductName: item.ProductName
            },
            BranchInfo: {
                BranchId: item.BranchId,
                BranchName: item.BranchName
            },
            ProductCost: item.ProductCost,
            CurrentStock: item.CurrentStock,
            Status: item.Status,
        })) || [];
        pageOptionStore.stock = extractPageOption(res.data.res_data , pageOptionStore.stock);
        return stockList;
}

const {data: stock , isPending: isTablePending , isError: isTableError } = useQuery<StockTable[] , AxiosError>({
    queryKey: ['stockListAxios'] ,
    queryFn: fetchStock ,
})

const handlePageEmit = (page:number) => {
  pageOptionStore.stock.CurrentPage = page;
  queryClient.invalidateQueries({queryKey: ['stockListAxios']});
}

const handleSortOrderEmit = (sort:string) => {
    pageOptionStore.stock.SortOrder = sort;
    queryClient.invalidateQueries({queryKey: ['stockListAxios']});
}

const handleSortColumnEmit = (sort:string) => {
    pageOptionStore.stock.SortColumn = sort;
    queryClient.invalidateQueries({queryKey: ['stockListAxios']});
}

watch(() => pageOptionStore.stock.PageSize ,() => {
  pageOptionStore.stock.CurrentPage = 1;
  queryClient.invalidateQueries({queryKey: ['stockListAxios']});
})

</script>
<template>
   <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>{{ $t('show') }}</h1>
                <select v-model="pageOptionStore.stock.PageSize" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
            <TableSort :sort-item="sortColumnOption" @page-sort="handleSortColumnEmit">
                <template #icon>
                    {{ sortColumnOption.find((s) => s.value === pageOptionStore.stock.SortColumn)?.title }}  
                    <IconFilter2/>
                </template>
            </TableSort>
            <TableSort :sort-item="sortOrder" @page-sort="handleSortOrderEmit">
                <template #icon>    
                    {{ sortOrder.find((s) => s.value === pageOptionStore.stock.SortOrder)?.title }}
                    <IconSortAscendingLetters/>
                </template>
            </TableSort>
            <span class="w-full"></span>
        </div>
        <Table
          :headers="headers"
          :items="stock"
          :isLoading="isTablePending"
          :isError="isTableError"
          :item-per-page="pageOptionStore.stock.PageSize"
          :current-page="pageOptionStore.stock.CurrentPage"
          :total-items="pageOptionStore.stock.TotalRecords"
          @page-changed="handlePageEmit"
        >
            <template #ProductName="stock">
                {{ stock.item.ProductInfo.ProductName }}
            </template>
            <template #BranchName="stock">
                {{ stock.item.BranchInfo.BranchName }}
            </template>
            <template #actions="stock">
                <button class="btn btn-circle btn-soft btn-xs bg-info text-info-content mr-2" @click="handleEmit(stock.item)"><IconEye class="size-4"/></button>
            </template>
        </Table>
    </div>
</template>