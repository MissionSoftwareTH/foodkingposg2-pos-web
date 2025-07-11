<script lang="ts" setup>
import { Chart as ChartJS , CategoryScale, Legend, LinearScale, Title, Tooltip, type ChartData, type ChartOptions, LineElement, PointElement, PieController, ArcElement } from 'chart.js';
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
    chartOptions?: ChartOptions<'pie'>;
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

ChartJS.register(Title , Tooltip , Legend , PieController , ArcElement , CategoryScale , LinearScale);

</script>
<template>
<Pie 
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