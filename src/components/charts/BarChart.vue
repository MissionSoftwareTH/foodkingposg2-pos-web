<script lang="ts" setup>


interface ChartBarProps {
    data?: number[];
    isPending: boolean;
    isError: boolean;
}
const props = withDefaults(defineProps<ChartBarProps>(),{
 })

const cat = () => {
  let array = []
  for (let index = 0; index < 31; index++) {
    array.push(index+1);
  }
  return array;
}

const randomData = () => {
  let data = []
  for (let index = 0; index < 31; index++) {
    data.push(Math.floor(Math.random()*100));
  }
  return data;
}

const options = {
    chart: {
        id: 'bar-chart-ex',
    },
    xaxis: {
        categories: cat()
    },
}

const series = [
    {
        name: 'series-1',
        data: randomData(),
    }
]

</script>
<template>
    <div v-if="isPending" class="flex justify-center items-center h-[400px]">
        <p>กำลังโหลดข้อมูลกราฟ...</p>
    </div>
    <div v-else-if="isError" class="flex justify-center items-center h-[400px] text-red-500">
        <p>เกิดข้อผิดพลาดในการโหลดข้อมูลกราฟ</p>
    </div>
    <apexchart v-else height="400" type="bar" :options="options" :series="series"></apexchart>
    
</template>