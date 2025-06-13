<template>
  <div class="relative flex items-center input input-bordered w-full rounded-lg">
      <input
      type="text"
      :value="formattedValue"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeydown"
      class=""
      :disabled="disabled"
      />
      <span class="pl-1">{{symbolValue}}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: null,
  },
  symbolValue: {
    type: String,
    default: '฿',
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

// Computed property เพื่อแสดงผลใน input
const formattedValue = computed(() => {
  if (internalValue.value === null || internalValue.value === '') {
    return '';
  }
  return parseFloat(internalValue.value).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2, // จำกัดทศนิยมสูงสุด 2 ตำแหน่ง
  });
});

watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    internalValue.value = newValue;
  }
}, { immediate: true });

const onKeydown = (event) => {
  const allowedKeys = [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
  ];
  if (allowedKeys.includes(event.key)) {
    return; // อนุญาตให้ปุ่มเหล่านี้ทำงานปกติ
  }

  // --- การเปลี่ยนแปลงสำหรับ Ctrl/Cmd + V (Paste) ---
  // อนุญาตการคัดลอก/ตัด/เลือกทั้งหมด (Ctrl/Cmd + C, X, A)
  if ((event.ctrlKey || event.metaKey) && ['c', 'x', 'a'].includes(event.key.toLowerCase())) {
    return;
  }
  // ถ้าเป็น Ctrl/Cmd + V, ไม่ต้องป้องกันการทำงานของเบราว์เซอร์
  // แต่จะไปกรองค่าใน onInput แทน
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
    return;
  }
  // --------------------------------------------------

  const isNumber = /^[0-9]$/.test(event.key);
  const isDecimalPoint = event.key === '.' && !internalValue.value.includes('.'); // อนุญาตจุดทศนิยมแค่ครั้งเดียว

  if (!isNumber && !isDecimalPoint) {
    event.preventDefault();
  }
};

const onInput = (event) => {
  let value = event.target.value;

  // --- การเปลี่ยนแปลงเพื่อกรองค่าที่วางเข้ามา ---
  // ลบตัวอักษรที่ไม่ใช่ตัวเลขและจุดทศนิยมออก
  let cleanedValue = value.replace(/[^0-9.]/g, '');

  // จัดการกรณีที่มีจุดทศนิยมหลายจุด
  const parts = cleanedValue.split('.');
  if (parts.length > 2) {
    cleanedValue = parts[0] + '.' + parts.slice(1).join('');
  }

  internalValue.value = cleanedValue; // อัปเดต internalValue ทันทีเพื่อให้แสดงผลใน input
};

const onBlur = () => {
  const numValue = parseFloat(internalValue.value);
  if (!isNaN(numValue)) {
    emit('update:modelValue', numValue);
  } else {
    emit('update:modelValue', null);
  }
};
</script>