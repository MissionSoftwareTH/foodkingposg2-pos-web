<script lang="ts" setup>
import { Chart as ChartJS , BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
import { Bar } from 'vue-chartjs'

interface ChartBarProps {
    chartId?: string;
    datasetIdKey?: string;
    width?: number;
    height?: number;
    cssClasses?: string;
    styles?: any;
    plugins?: any;
    chartData: ChartData<'bar'>;
    chartOptions?: ChartOptions<'bar'>;
}
const props = withDefaults(defineProps<ChartBarProps>(),{
    chartId: 'bar-chart',
    datasetIdKey: 'label',
    width: 400,
    height: 400,
    cssClasses: '',
    styles: () => {},
    plugins: () => {},
})

ChartJS.register(Title , Tooltip , Legend , BarElement , CategoryScale , LinearScale);

</script>
<template>
<Bar 
    :options="props.chartOptions"
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