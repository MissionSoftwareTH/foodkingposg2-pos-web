<script setup lang="ts">
import { useAbility } from '@casl/vue';
import BarChart from '../components/charts/BarChart.vue';
import TitleBarCard from '../components/TitleBarCard.vue';
import LineChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';

// You can add your logic here
const {can: $can} = useAbility();

const chartOptions = {
        responsive: true,
        maintainAspectRatio: false
}

const chartData = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน' , 'พฤษภาคม' , 'มิถุนายน' , 'กรกฎาคม' , 'สิงหาคม' , 'กันยายน' , 'ตุลาคม' , 'พฤศจิกายน' , 'ธันวาคม'],
    datasets: [
        {
            label: 'ยอดขาย',
            backgroundColor: 'rgb(0, 204, 0)',
            data: [40, 20, 12, 39 , 59 , 42 , 87 , 12 ,98 , 44 , 24 , 60]
        }
    ]
}

const lineChartData = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน' , 'พฤษภาคม' , 'มิถุนายน' , 'กรกฎาคม' , 'สิงหาคม' , 'กันยายน' , 'ตุลาคม' , 'พฤศจิกายน' , 'ธันวาคม'],
    datasets: [
        {
            label: 'ยอดขาย',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: '#ff6384',
            pointBackgroundColor: '#ff6384',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff6384',
            fill: true,
            data: [40, 20, 12, 39 , 59 , 42 , 87 , 12 ,98 , 44 , 24 , 60]
        }
    ]
}

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
}

</script>
<template>
    <div class="flex flex-col p-2 gap-4 mb-4">
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
        <div class="w-full p-6 shadow-lg bg-base-100 rounded-box h-[400px]">
            <BarChart
                 :chart-data="chartData"
                 :chart-options="chartOptions"
                 :height="300"
                 class="h-[400px]"
            /> 
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div v-if="$can('read','Post')" class="bg-base-100 shadow-xl p-6 rounded-box">
                <PieChart
                     :chart-data="PieChartData"
                     :chart-options="chartOptions"
                     :height="300"
                     class="h-[400px]"
                /> 
            </div>
            <div v-if="$can('edit','all')" class="bg-base-100 shadow-xl p-6 rounded-box">
                <LineChart
                    :chart-data="lineChartData"
                    :chart-options="chartOptions"
                    :height="300"
                    class="h-[400px]"
                /> 
            </div>
        </div>
    </div>
</template>