<template>
  <div class="flex overflow-hidden rounded-box">
    <div ref="testRef" class="max-w-full bg-base-100 h-full overflow-x-auto">
      <table class="min-w-max bg-base-100 h-full">
        <thead class="border-b-2">
          <tr>
            <th scope="col" v-for="index in 20" class="p-4">
              header{{ index }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-primary">
          <tr v-for="_index in 10">
            <td v-for="index in 20" class="p-4">
              {{ index }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <table class="bg-base-100 h-full border-l-2">
      <thead class="border-b-2">
        <tr>
          <th scope="col" class="p-4">
            action
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-primary">
        <tr v-for="_index in 10">
          <td class="p-4 flex justify-center">
            <button class="btn btn-sm">
              edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { OverlayScrollbars } from 'overlayscrollbars';
import { onMounted, onUnmounted, ref } from 'vue';

const testRef = ref<HTMLElement | null>(null);
let osInstance: any = null;

onMounted(() => {
  if (testRef.value) {
    osInstance = OverlayScrollbars(testRef.value, {
      overflow: {
        x: 'scroll',
        y: 'hidden',
      },
      scrollbars: {
        theme: 'os-theme-dark',
        visibility: 'auto',
        autoHide: 'leave',
        autoHideDelay: 500,
      },
    });
  }
});

onUnmounted(() => {
  if (osInstance) {
    osInstance.destroy();
  }
});

</script>