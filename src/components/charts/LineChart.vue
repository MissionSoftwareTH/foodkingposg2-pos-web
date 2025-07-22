<script lang="ts" setup>
// import type { ChartTable } from '../../types/charts';


interface ChartLineProps {
    // data: ChartTable;
    title: string;
    isPending: boolean;
    isError: boolean;
}

const props = defineProps<ChartLineProps>();

const cat = () => {
  let array = []
  for (let index = 0; index < 31; index++) {
    array.push(index+1);
  }
  return array;
}

 const options = {
    chart: {
      id: 'bar-chart-ex',
      toolbar: false,
      zoom: {
        enabled: false // ปิดการซูมด้วยเมาส์ (ถ้าไม่ต้องการ)
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
        categories: cat(),
        label: {
          style: {
            color: '#0000'
          }
        }
    },
    stroke: {
      curve: 'smooth'
    }
}


const randomData = () => {
  let data = []
  for (let index = 0; index < 31; index++) {
    data.push(Math.floor(Math.random()*100));
  }
  return data;
}

const randomSeries = () => {
  let series = [];
  let num = Math.floor(Math.random()*3);
  if(num === 0) num = 1;
  console.log(num);
  for (let i = 0; i < num; i++) {
    series.push(
      {
        name: `series-${i+1}`,
        data: randomData(),
      }
    )
  }
  console.log(series)
  return series;
}

const series = randomSeries();

</script>
<template>
    <h1 class="text-lg">{{ props.title }}</h1>
    <div v-if="isPending" class="flex justify-center items-center h-[400px]">
        <p>กำลังโหลดข้อมูลกราฟ...</p>
    </div>
    <div v-else-if="isError" class="flex justify-center items-center h-[400px] text-red-500">
        <p>เกิดข้อผิดพลาดในการโหลดข้อมูลกราฟ</p>
    </div>
    <apexchart
      v-else
      type="area"
      height="400px"
      :options="options"
      :series="series"
    >
    </apexchart>
</template>