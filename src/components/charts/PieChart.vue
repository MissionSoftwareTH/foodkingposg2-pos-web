<script lang="ts" setup>

interface ChartPieProps {
    isPending: boolean;
    isError: boolean;
}
const props = withDefaults(defineProps<ChartPieProps>(),{
})

const randomData = () => {
  let data = []
  for (let index = 0; index < 6; index++) {
    data.push(Math.floor(Math.random()*100));
  }
  return data;
}

const options = {
    chart: {
        animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    }
    },
    labels: ['product-1','product-2','product-3','product-4','product-5','product-6']
}
const series = randomData()

</script>
<template>
    <div v-if="isPending" class="flex justify-center items-center h-[400px]">
        <p>กำลังโหลดข้อมูลกราฟ...</p>
    </div>
    <div v-else-if="isError" class="flex justify-center items-center h-[400px] text-red-500">
        <p>เกิดข้อผิดพลาดในการโหลดข้อมูลกราฟ</p>
    </div>
    <apexchart
        v-else
        type="pie"
        height="400px"
        :options="options"
        :series="series"
    >
    </apexchart>
</template>