<script lang="ts" setup>
import { Chart as ChartJS , CategoryScale, Legend, LinearScale, Title, Tooltip, type ChartData, type ChartOptions, LineElement, PointElement, TimeScale } from 'chart.js';
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-date-fns';

interface ChartLineProps {
    chartId?: string;
    datasetIdKey?: string;
    cssClasses?: string;
    styles?: any;
    plugins?: any;
    chartData: ChartData<'line'>;
}
const props = withDefaults(defineProps<ChartLineProps>(),{
    chartId: 'line-chart',
    datasetIdKey: 'label',
    cssClasses: '',
    styles: () => {},
    plugins: () => {},
})

ChartJS.register(Title , Tooltip , Legend , LineElement , PointElement , CategoryScale , LinearScale , TimeScale);

const lineChartOptions:ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
    x: {
      type: 'time',
      time: {
        unit: 'hour',
        displayFormats: {
          hour: 'yyyy-MM-dd HH:mm'
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
<Line 
    :options="lineChartOptions"
    :data="props.chartData"
    :chart-id="props.chartId"
    :dataset-id-key="props.datasetIdKey"
    :plugins="props.plugins"
    :css-classes="props.cssClasses"
    :styles="props.styles"
/>
</template>