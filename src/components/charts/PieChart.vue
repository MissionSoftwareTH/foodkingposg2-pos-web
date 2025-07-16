<script lang="ts" setup>
import { Chart as ChartJS , type ChartData , registerables } from 'chart.js';
import { Pie } from 'vue-chartjs'

interface ChartPieProps {
    chartId?: string;
    datasetIdKey?: string;
    width?: number;
    height?: number;
    cssClasses?: string;
    styles?: any;
    plugins?: any;
    chartData: ChartData<'pie'>;
    isPending: boolean;
    isError: boolean;
}
const props = withDefaults(defineProps<ChartPieProps>(),{
    chartId: 'pie-chart',
    datasetIdKey: 'label',
    width: 400,
    height: 400,
    cssClasses: '',
    styles: () => {},
    plugins: () => {},
})

ChartJS.register(...registerables);

const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false
};

</script>
<template>
    <div v-if="isPending" class="flex justify-center items-center h-[400px]">
        <p>กำลังโหลดข้อมูลกราฟ...</p>
    </div>
    <div v-else-if="isError" class="flex justify-center items-center h-[400px] text-red-500">
        <p>เกิดข้อผิดพลาดในการโหลดข้อมูลกราฟ</p>
    </div>
    <Pie 
        v-else
        :options="pieChartOptions"
        :data="props.chartData"
        :chart-id="props.chartId"
        :dataset-id-key="props.datasetIdKey"
        :plugins="props.plugins"
        :css-classes="props.cssClasses"
        :styles="props.styles"
        :width="props.width"
        :height="props.height"
    />
</template>