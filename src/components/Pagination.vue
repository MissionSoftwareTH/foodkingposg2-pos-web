<template>
  <nav class="flex items-center gap-2 overflow-hidden">
    <ul class="join join-horizontal">
      <li >
        <button
          class="btn btn-ghost size-14"
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          aria-label="Previous Page"
        >
          &lt;  <!-- < -->
        </button>
      </li>

      <li
        v-for="page in pages"
        :key="page"
      >
        <button v-if="page !== '...'" class="btn btn-ghost size-14" :class="currentPage === page && 'btn-active'" :disabled="currentPage === page || page === '...'" @click="goToPage(page as number)">
          {{ page }}
        </button>
        <button v-else class="btn btn-ghost size-14" disabled>. . .</button>
      </li>

      <li>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn btn-ghost size-14"
          aria-label="Next Page"
        >
          &gt; <!-- > -->
        </button>
      </li>
    </ul>
    <div class="text-base-content/50 flex items-center">
      Page <input type="number" v-model="inputPage" @change="handleInputPage" class="min-w-4 max-w-8 text-center"> of {{ totalPages }}
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  maxVisibleButtons?: number; // ตัวนี้จะหมายถึงปุ่มตัวเลขกลางๆ ที่ "ไม่นับรวม" 1, totalPages และ ellipsis
}


const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  maxVisibleButtons: 5, // ปรับค่านี้ให้เป็นจำนวนปุ่มที่คุณต้องการให้แสดง 'กลางๆ' เช่น 3, 5
});

const emit = defineEmits<{
  (e: 'page-changed', page: number): void;
}>();

const totalPages = computed(() =>
Math.ceil(props.totalItems / props.itemsPerPage)
);

const pages = computed(() => {
  const pageNumbers: (number | string)[] = [];
  const middlePagesCount = props.maxVisibleButtons; // จำนวนปุ่มตัวเลขที่ต้องการแสดงในส่วนกลาง
  const boundaryPagesCount = 2; // สำหรับปุ่ม 1 และ totalPages
  // Case 1: Total pages are less than or equal to the desired visible pages (e.g., 7)
  // Show all pages directly
  if (totalPages.value <= middlePagesCount + boundaryPagesCount) {
    for (let i = 1; i <= totalPages.value; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  
  let mid = middlePagesCount + 1;
  if(props.currentPage > 4 && props.currentPage < totalPages.value - 4) {
    mid = middlePagesCount;
  }
  
  // Case 2: Many pages, need to use ellipsis
  let start = Math.max(2, props.currentPage - Math.floor(mid / 2));
  let end = Math.min(totalPages.value - 1, start + mid - 1);
  // Adjust start/end if we are too close to the beginning/end
  if (end - start + 1 < mid) {
    if (start === 2) { // Close to beginning, expand end
      end = Math.min(totalPages.value - 1, start + mid - 1);
    } else if (end === totalPages.value - 1) { // Close to end, expand start
      start = Math.max(2, end - mid + 1);
    }
  }
  
  
  // Always add page 1
  pageNumbers.push(1);
  
  // Add leading ellipsis if needed
  if (start > 2) {
    // console.log(start , '>' , 2)
    pageNumbers.push('...');
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }
  
  // Add trailing ellipsis if needed
  if (end < totalPages.value - 2) {
    pageNumbers.push('...');
  }
  
  // Always add last page
  pageNumbers.push(totalPages.value);
  
  // Filter out duplicate 1 or totalPages if they appear in middle range
  // This can happen if maxVisibleButtons is large enough to overlap
  const uniquePageNumbers: (number | string)[] = [];
  for (const page of pageNumbers) {
    uniquePageNumbers.push(page);
  }
  // console.log(uniquePageNumbers)
  return uniquePageNumbers;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    inputPage.value = page;
    emit('page-changed', page);
  }
};

const inputPage = ref<number>(props.currentPage);
const handleInputPage = () => {
  if( inputPage.value <= 0 || inputPage.value > totalPages.value) {
    console.log('not in total page')
    return inputPage.value = props.currentPage;
  }
  console.log('input')
  goToPage(inputPage.value);
}

</script>