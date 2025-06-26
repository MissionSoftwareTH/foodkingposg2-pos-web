<template>
  <div class="p-4 relative overflow-x-auto">
    <table class="w-full border-collapse table-fixed">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            :style="{ width: column.width }"
            class="px-4 py-2 bg-gray-200 text-gray-700 font-bold uppercase text-sm border relative whitespace-nowrap"
          >
            <div class="flex justify-between items-center h-full">
              <span>{{ column.label }}</span>
              <div
                v-if="index < columns.length - 1"
                class="resize-handle absolute right-0 top-0 h-full w-2 cursor-col-resize bg-blue-400 hover:bg-blue-600"
                @mousedown="startResize($event, index)"
              ></div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td
            v-for="column in columns"
            :key="column.key"
            :style="{ width: column.width }"
            class="px-4 py-2 border text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <!-- {{ row[column.key] || '-' }} -->
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="isResizing"
      :style="{ left: ghostLineX + 'px', height: tableHeight + 'px', top: tableTop + 'px' }"
      class="ghost-resize-line fixed bg-blue-600 w-px z-50 pointer-events-none"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, nextTick } from 'vue';

interface Column {
  key: string;
  label: string;
  width: string;
}

const columns = ref<Column[]>([
  { key: 'id', label: 'ID', width: '100px' },
  { key: 'name', label: 'Name', width: '200px' },
  { key: 'email', label: 'Email', width: '300px' },
  { key: 'city', label: 'City', width: '150px' },
]);

const data = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com', city: 'New York' },
  { id: 2, name: 'Bob', email: 'bob@example.com', city: 'London' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', city: 'Paris' },
  { id: 4, name: 'David', email: 'david@example.com', city: 'Tokyo' },
  { id: 5, name: 'Eve', email: 'eve@example.com', city: 'Berlin' },
]);

// State สำหรับการปรับขนาด
let resizingIndex: number | null = null;
let startX: number = 0;
let startWidths: number[] = [];
let startTableLeft: number = 0; // ตำแหน่งซ้ายของตารางเมื่อเริ่มลาก

// State สำหรับ Ghost Line
const isResizing = ref(false);
const ghostLineX = ref(0);
const tableHeight = ref(0);
const tableTop = ref(0);

const startResize = (event: MouseEvent, index: number) => {
  resizingIndex = index;
  startX = event.clientX;

  const thElement = (event.target as HTMLElement).closest('th');
  const tableElement = thElement?.closest('table');

  if (!thElement || !tableElement) return;

  // เก็บความกว้างเริ่มต้นของทุกคอลัมน์ (คำนวณจาก offsetWidth)
  startWidths = Array.from(tableElement.querySelectorAll('thead th')).map(th => (th as HTMLElement).offsetWidth);

  // เก็บตำแหน่งของตารางสำหรับ Ghost Line
  const tableRect = tableElement.getBoundingClientRect();
  startTableLeft = tableRect.left;
  tableHeight.value = tableRect.height;
  tableTop.value = tableRect.top;

  // กำหนดตำแหน่งเริ่มต้นของ Ghost Line ให้ตรงกับขอบขวาของคอลัมน์ที่กำลังปรับ
  ghostLineX.value = thElement.getBoundingClientRect().right;

  isResizing.value = true; // แสดง Ghost Line

  document.addEventListener('mousemove', doResize);
  document.addEventListener('mouseup', stopResize);
};

const doResize = (event: MouseEvent) => {
  if (resizingIndex === null || !isResizing.value) return;

  // อัปเดตตำแหน่ง Ghost Line เท่านั้น
  // ลบ startTableLeft เพื่อให้ ghostLineX เป็นค่า relative กับจุดเริ่มต้นของตาราง
  ghostLineX.value = event.clientX;
};

const stopResize = () => {
  if (resizingIndex === null) return;

  const dx = ghostLineX.value - (startTableLeft + startWidths.slice(0, resizingIndex + 1).reduce((sum, w) => sum + w, 0));

  const minWidth = 50;

  // ปรับความกว้างของคอลัมน์ปัจจุบัน
  let newWidthCurrent = startWidths[resizingIndex] + dx;
  if (newWidthCurrent < minWidth) newWidthCurrent = minWidth;
  columns.value[resizingIndex].width = `${newWidthCurrent}px`;

  // ปรับความกว้างของคอลัมน์ถัดไป (ถ้ามี)
  if (resizingIndex + 1 < columns.value.length) {
    let newWidthNext = startWidths[resizingIndex + 1] - dx;
    if (newWidthNext < minWidth) newWidthNext = minWidth;
    columns.value[resizingIndex + 1].width = `${newWidthNext}px`;
  }

  isResizing.value = false; // ซ่อน Ghost Line
  resizingIndex = null;

  document.removeEventListener('mousemove', doResize);
  document.removeEventListener('mouseup', stopResize);
};

// ทำความสะอาด Event Listener เมื่อ Component ถูกถอดออก
onUnmounted(() => {
  stopResize();
});
</script>

<style scoped>
/* Penting! Memastikan table-layout: fixed berfungsi dengan baik */
table {
  table-layout: fixed;
}

/* Memastikan handle mudah digenggam dan terlihat */
.resize-handle {
  z-index: 10; /* Pastikan di atas konten tabel lainnya */
}

/* Gaya untuk Ghost Line */
.ghost-resize-line {
  /* fixed position ทำให้เส้นอยู่เหนือทุกอย่าง */
  /* ความกว้างของเส้น 1px และสี */
  /* pointer-events-none ทำให้คลิกทะลุเส้นไปที่องค์ประกอบข้างหลังได้ */
}
</style>