<script lang="ts" setup>
import { Chart as ChartJS , type ChartData, type ChartOptions, registerables, Colors } from 'chart.js';
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-date-fns';

interface ChartLineProps {
    chartId?: string;
    datasetIdKey?: string;
    cssClasses?: string;
    styles?: any;
    plugins?: any;
    chartData: ChartData<'line'>;
    isPending: boolean;
    isError: boolean;
}
const props = withDefaults(defineProps<ChartLineProps>(),{
    chartId: 'line-chart',
    datasetIdKey: 'label',
    cssClasses: '',
    styles: () => {},
    plugins: () => {},
})

ChartJS.register(...registerables , Colors);

const lineChartOptions:ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
        displayFormats: {
          hour: 'yyyy-MM-dd HH:mm',
          day: 'yyyy-MM-dd',
          month: 'MMM yyyy',
          year: 'yyyy'
        },
        timezone: 'Asia/Bangkok'
      }
    },
    y: {
      beginAtZero: true
    }
  }
} as any;

</script>
<template>
    <div v-if="isPending" class="flex justify-center items-center h-[400px]">
        <p>กำลังโหลดข้อมูลกราฟ...</p>
    </div>
    <div v-else-if="isError" class="flex justify-center items-center h-[400px] text-red-500">
        <p>เกิดข้อผิดพลาดในการโหลดข้อมูลกราฟ</p>
    </div>
    <Line
        v-else
        :options="lineChartOptions"
        :data="props.chartData"
        :chart-id="props.chartId"
        :dataset-id-key="props.datasetIdKey"
        :plugins="props.plugins"
        :css-classes="props.cssClasses"
        :styles="props.styles"
    />
</template>