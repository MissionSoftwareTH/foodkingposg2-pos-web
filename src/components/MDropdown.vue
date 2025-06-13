<script lang="ts" setup>
defineProps({
    label: {
        type: String ,
        required: false,
    },
    item: {
        type: [String, Number], // หรือ type อื่นๆ ที่คุณคาดหวัง เช่น Object, any
        required: false,
        default: 5 // ค่าเริ่มต้นเผื่อไม่มีข้อมูล
    }
});

const emit = defineEmits<{
  (e: 'selected', value: string | number): void;
}>();

const handleMenuItemClick = (value: string | number) => {
    // ปล่อย event 'selected' พร้อมกับค่าที่เลือก
    emit('selected', value);
    // คุณอาจต้องการปิด dropdown หลังจากเลือก (DaisyUI มักจะจัดการเองถ้าใช้ form method="dialog" หรือ target _self)
    // แต่ถ้าไม่ปิดอัตโนมัติ คุณอาจต้องเขียนโค้ดปิดเอง เช่น:
    // const dropdown = document.querySelector('.dropdown');
    // if (dropdown) { dropdown.blur(); } // ตัวอย่างการปิด dropdown
};

</script>

<template>
    <div class="dropdown">
        <button class="btn btn-sm btn-ghost w-full rounded-lg">
            <h1>{{ label }}</h1>
            <span class="badge bg-primary rounded-lg px-4 text-primary-content">{{ item }}</span>
        </button>
        <ul class="dropdown-content menu bg-base-300 shadow-lg rounded-lg">
            <slot :handleMenuItemClick="handleMenuItemClick"></slot>
        </ul>
    </div>
</template>