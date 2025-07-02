<script setup lang="ts">
import Table from '../Table.vue';
import apiClient from '../../services/api/apiService';
import type { StockCardTable, StockCardResponse } from '../../types/stock';
import type { AxiosError, AxiosResponse } from 'axios';
import type { baseResponse, DataBaseResponse } from '../../types';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { stockCardTableHeaders } from '../../constants/table';
import { usePageOptionStore } from '../../store/sortingStore';
import { SortOrderOption, stockCardSortColumnOption } from '../../constants/page_option';
import TableSort from '../TableSort.vue';
import { IconFilter2, IconSortAscendingLetters } from '@tabler/icons-vue';
import { watch } from 'vue';
import { extractPageOption } from '../../services/utils/dataExtract';
import { formatDateTime } from '../../services/utils';


interface Props {
    productId?: number;
    BranchId?: number;
}
const props = defineProps<Props>()

defineEmits<{
  (e: 'openInsertDialog', open: boolean): void;
}>();

const headers = stockCardTableHeaders;
const sortColumnOption = stockCardSortColumnOption;
const pageOptionStore = usePageOptionStore();
const queryClient = useQueryClient();

const fetchStockCard = async () => {
    const apiUrl = '/product/stock/record';
    // const {SortColumn , SortOrder} = pageOptionStore.stock;
    const params = {
    //   SortColumn ,
    //   SortOrder , 
    //   PageSize:pageOptionStore.stock.PageSize , 
    //   Page: pageOptionStore.stock.CurrentPage,
      ProductInfoId: props.productId,
      BranchId: props.BranchId,
    }
    const res:AxiosResponse<baseResponse<DataBaseResponse<StockCardResponse[]>>> = await apiClient.get(apiUrl ,{params});
    const stockCardList:StockCardTable[] = res?.data?.res_data?.ConstructData || []; 
    stockCardList.map((list) => {
        list.CreatedAt = formatDateTime(list.CreatedAt);
    })
    pageOptionStore.stockCard = extractPageOption(res.data.res_data , pageOptionStore.stockCard);
    return stockCardList;
}

const {data: stockCard, isPending: isTablePending, isError: isTableError} = useQuery<StockCardTable[], AxiosError>({
    queryKey: ['stockCardListAxios'],
    queryFn: fetchStockCard,
});

const handlePageEmit = (page:number) => {
  pageOptionStore.stockCard.CurrentPage = page;
  queryClient.invalidateQueries({queryKey: ['stockListAxios']});
}

const handleSortOrderEmit = (sort:string) => {
    pageOptionStore.stockCard.SortOrder = sort;
    queryClient.invalidateQueries({queryKey: ['stockListAxios']});
}

const handleSortColumnEmit = (sort:string) => {
    pageOptionStore.stockCard.SortColumn = sort;
    queryClient.invalidateQueries({queryKey: ['stockListAxios']});
}

watch(() => pageOptionStore.stockCard.PageSize ,() => {
  pageOptionStore.stockCard.CurrentPage = 1;
  queryClient.invalidateQueries({queryKey: ['stockListAxios']});
})


</script>
<template>
       <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>show</h1>
                <select v-model="pageOptionStore.stockCard.PageSize" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
            <TableSort :sort-item="sortColumnOption" @page-sort="handleSortColumnEmit">
                <template #icon>
                    {{ pageOptionStore.stockCard.SortColumn }}  
                    <IconFilter2/>
                </template>
            </TableSort>
            <TableSort :sort-item="SortOrderOption" @page-sort="handleSortOrderEmit">
                <template #icon>    
                    {{ SortOrderOption.find((s) => s.value === pageOptionStore.stockCard.SortOrder)?.title }}
                    <IconSortAscendingLetters/>
                </template>
            </TableSort>
            <span class="w-full"></span>
        </div>
        <Table
          :headers="headers" 
          :items="stockCard" 
          :isLoading="isTablePending"
          :isError="isTableError"
          :item-per-page="pageOptionStore.stockCard.PageSize"
          :current-page="pageOptionStore.stockCard.CurrentPage"
          :total-items="pageOptionStore.stockCard.TotalRecords"
          @page-changed="handlePageEmit"
        >
        </Table>
    </div>

</template>