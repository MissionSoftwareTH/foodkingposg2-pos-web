<script setup lang="ts">
import { useAbility } from '@casl/vue';
import BarChart from '../components/charts/BarChart.vue';
import TitleBarCard from '../components/TitleBarCard.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
// import apiClient from '../services/api/apiService';
// import type { ChartDataResponse, ChartResponse, ChartTable } from '../types/charts';
// import type { baseResponse, Data } from '../types';
// import { useQuery } from '@tanstack/vue-query';
// import type { AxiosError, AxiosResponse } from 'axios';
// import { formatDateTime } from '../services/utils';

const {can: $can} = useAbility();

// const fetchChartsData = async ():Promise<ChartTable> => {
//     const apiUrl = '/dashboard/charts/data';
//     const res:AxiosResponse<baseResponse<Data<ChartResponse>>> = await apiClient.get(apiUrl);
//     const PCSCreatedAt = res.data.res_data.data.ProductCostSummary?.CreatedAt?.map((data) => formatDateTime(data ,'th-TH', {
//         year: undefined,
//         month: undefined,
//         day: undefined,
//         hour: '2-digit',
//         minute: '2-digit',
//         second: undefined
//     }));
//     console.log(PCSCreatedAt)
//     const data:ChartTable = {
//         Title: 'ยอดสั่งซื้อ',
//         Data: res.data.res_data.data.ProductCostSummary.Data,
//         CreatedAt: PCSCreatedAt,
//     }
//     console.log(data);
//     return data;
// };

// const {data: chartTable , isPending: chartPending , isError: chartError} = useQuery<ChartTable , AxiosError>({
//     queryKey: ['ChartAxios'],
//     queryFn: fetchChartsData,
// });

</script>

<template>
    <div class="p-2 space-y-4 mb-4">
        <h1 class="text-3xl font-semibold ">{{ $t('dashboard') }}</h1>
        <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
            <div class="w-full h-full flex gap-4 p-4 max-sm:flex-col items-center bg-gradient-to-tr overflow-x-auto">
                <TitleBarCard :title="$t('gross_sales')" :text="65" :is-pending="false"/>
                <TitleBarCard :title="$t('refunds') " :text="85" :is-pending="false"/>
                <TitleBarCard :title="$t('discounts') " :text="77" :is-pending="false"/>
                <TitleBarCard :title="$t('net_sales') " :text="43" :is-pending="false"/>
                <TitleBarCard :title="$t('gross_profit') " :text="12" :is-pending="false"/>
            </div>
        </div>
        <div class="w-full bg-base-100 p-6 rounded-box shadow-lg relative">
            <LineChart
                :title="$t('sales')"
                :is-pending="false"
                :is-error="false"
            />
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div v-if="$can('read','Post')" class="p-6 bg-base-100 shadow-lg rounded-box">
                <PieChart
                    :is-pending="false"
                    :is-error="false"
                />
            </div>
            <div v-if="$can('edit','all')" class="p-6 bg-base-100 shadow-lg rounded-box">
                <BarChart
                    :is-pending="false"
                    :is-error="false"
                />
            </div>
        </div>
    </div>
</template>