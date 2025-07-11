<script lang="ts" setup>
import { Chart as ChartJS , CategoryScale, Legend, LinearScale, Title, Tooltip, type ChartData, type ChartOptions, LineElement, PointElement } from 'chart.js';
import { Line } from 'vue-chartjs'

interface ChartLineProps {
    chartId?: string;
    datasetIdKey?: string;
    width?: number;
    height?: number;
    cssClasses?: string;
    styles?: any;
    plugins?: any;
    chartData: ChartData<'line'>;
    chartOptions?: ChartOptions<'line'>;
}
const props = withDefaults(defineProps<ChartLineProps>(),{
    chartId: 'line-chart',
    datasetIdKey: 'label',
    width: 400,
    height: 400,
    cssClasses: '',
    styles: () => {},
    plugins: () => {},
})

ChartJS.register(Title , Tooltip , Legend , LineElement , PointElement , CategoryScale , LinearScale);

</script>
<template>
<Line 
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