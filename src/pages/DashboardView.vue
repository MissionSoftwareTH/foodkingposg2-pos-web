<script setup lang="ts">
import { useAbility } from '@casl/vue';
import BarChart from '../components/charts/BarChart.vue';
import TitleBarCard from '../components/TitleBarCard.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import apiClient from '../services/api/apiService';
import type { ChartResponse, ChartTable } from '../types/charts';
import type { baseResponse, Data } from '../types';
import { type ChartData } from 'chart.js';
import { useQuery } from '@tanstack/vue-query';
import type { AxiosError, AxiosResponse } from 'axios';
import 'chartjs-adapter-date-fns';
import { formatDateTime } from '../services/utils';

const {can: $can} = useAbility();

const fetchChartsData = async ():Promise<ChartTable> => {
    const apiUrl = '/dashboard/charts/data';
    const res:AxiosResponse<baseResponse<Data<ChartResponse>>> = await apiClient.get(apiUrl);
    const dateTime = res.data.res_data.data.ChartsData.map((data) => formatDateTime(new Date(data.CreatedAt) ,'th-TH', {
        year: 'numeric',
        day: 'numeric',
        month: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: undefined
    }));
    console.log(dateTime)
    const allProductCost = res.data.res_data.data.ChartsData.map((cost) => ({
        x: cost.CreatedAt,
        y: cost.ProductCost
    }));
    console.log(allProductCost)
    const allAmountIncome = res.data.res_data.data.ChartsData.map((amount) => ({
        x: amount.CreatedAt,
        y: amount.NumberOfIncoming
    }));

    // BarChart: ใช้ข้อมูลแบบ {x, y} สำหรับ TimeScale
    const barChartTable:ChartData<'bar'> = {
        labels: dateTime,
        datasets: [
            {
                label: res.data.res_data.data.ChartLabel + ' (ต้นทุน)',
                 data: allProductCost.map((data) => data.y ),
            },
            {
                label: res.data.res_data.data.ChartLabel + ' (จำนวน)',
                data: allAmountIncome.map((data) => data.y ),
            }
        ]
    };

    // LineChart: ใช้ข้อมูลแบบ {x, y} สำหรับ TimeScale และลบ labels ออก
    const lineChartTable:ChartData<'line'> = {
        // ลบบรรทัด labels: dateTime ออก
        datasets: [
            {
                label: res.data.res_data.data.ChartLabel + ' (ต้นทุน)',
                fill: true,
                data: allProductCost,
            },
            {
                label: res.data.res_data.data.ChartLabel + ' (จำนวน)',
                fill: true,
                data: allAmountIncome,
            }
        ]
    };

    const chartTable:ChartTable = {
        ChartBar: barChartTable,
        ChartLine: lineChartTable,
    };
    return chartTable;
};

const {data: chartTable , isPending: chartPending , isError: chartError} = useQuery<ChartTable , AxiosError>({
    queryKey: ['ChartAxios'],
    queryFn: fetchChartsData,
});

const PieChartData = {
    labels: ['product 1', 'product 2', 'product 3'],
    datasets: [
        {
            label: 'ยอดขาย',
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            data: [40, 20, 12],
            hoverOffset: 4,
        }
    ]
};

</script>

<template>
    <div class="p-2 space-y-4 mb-4">
        <h1 class="text-3xl font-semibold ">Dashboard</h1>
        <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
            <div class="w-full h-full flex gap-4 p-4 items-center bg-gradient-to-tr overflow-x-auto">
                <TitleBarCard title="Gross sales" :text="65" :is-pending="false"/>
                <TitleBarCard title="Refunds" :text="85" :is-pending="false"/>
                <TitleBarCard title="Discounts" :text="77" :is-pending="false"/>
                <TitleBarCard title="Net sales" :text="43" :is-pending="false"/>
                <TitleBarCard title="Gross profit" :text="12" :is-pending="false"/>
            </div>
        </div>
        <div class="w-full">
            <LineChart
                v-if="chartTable?.ChartLine"
                :chart-data="chartTable.ChartLine"
                :height="300"
                :is-pending="chartPending"
                :is-error="chartError"
            />
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div v-if="$can('read','Post')" class="p-6">
                <PieChart
                    :chart-data="PieChartData"
                    :height="300"
                    :is-pending="chartPending"
                    :is-error="chartError"
                />
            </div>
            <div v-if="$can('edit','all')" class="p-6">
                <BarChart
                    v-if="chartTable?.ChartBar"
                    :chart-data="chartTable.ChartBar"
                    :height="300"
                    :is-pending="chartPending"
                    :is-error="chartError"
                />
            </div>
        </div>
    </div>
</template>