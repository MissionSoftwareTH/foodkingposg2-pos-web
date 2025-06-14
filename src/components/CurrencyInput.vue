<template>
  <div class="relative flex items-center input input-bordered w-full rounded-lg">
    <input
      type="text"
      :value="formattedValue"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeydown"
      class="flex-grow bg-transparent outline-none border-none p-2"
      :disabled="disabled"
    />
    <span class="pl-1 pr-2 text-gray-500">{{ symbolValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// กำหนด Interface สำหรับ Props เพื่อความชัดเจนของ Type
interface Props {
  modelValue?: number | string | null; // ค่าที่ผูกกับ v-model, สามารถเป็น Number, String หรือ Null
  symbolValue?: string; // สัญลักษณ์สกุลเงิน, เช่น '฿', '$'
  disabled?: boolean; // ปิดการใช้งาน Input
  maxDecimalPlaces?: number; // จำนวนทศนิยมสูงสุดที่อนุญาตให้ป้อน (เพิ่มเข้ามา)
}

// กำหนด Props และค่าเริ่มต้น (default values)
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  symbolValue: '฿',
  disabled: false,
  maxDecimalPlaces: 2, // กำหนดค่าเริ่มต้นเป็น 2 ตำแหน่ง
});

// กำหนด Emits สำหรับเหตุการณ์ 'update:modelValue'
const emit = defineEmits(['update:modelValue']);

// ตัวแปรภายในสำหรับเก็บค่าใน input field
const internalValue = ref<string | number | null>(props.modelValue);

// Watcher สำหรับซิงค์ internalValue กับ props.modelValue
// เพื่อรองรับการเปลี่ยนแปลงค่าจากภายนอก component (เช่น การใช้ v-model)
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    internalValue.value = newValue;
  }
}, { immediate: true });

// Computed Property สำหรับจัดรูปแบบค่าที่จะแสดงใน Input
const formattedValue = computed<string>(() => {
  if (internalValue.value === null || internalValue.value === '') {
    return '';
  }
  // แปลงเป็นตัวเลขก่อนจัดรูปแบบ เพื่อให้แน่ใจว่าทำงานถูกต้อง
  const num = parseFloat(String(internalValue.value));
  if (isNaN(num)) {
    return ''; // ถ้าแปลงไม่ได้ ให้คืนค่าว่าง
  }

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: props.maxDecimalPlaces, // ใช้ค่าจาก props
  });
});

// จัดการเหตุการณ์ Keydown เพื่อควบคุมการป้อนข้อมูล
const onKeydown = (event: KeyboardEvent) => {
  const allowedKeys = [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
  ];

  // อนุญาตปุ่มพื้นฐาน
  if (allowedKeys.includes(event.key)) {
    return;
  }

  // อนุญาต Ctrl/Cmd + C, X, A (Copy, Cut, Select All)
  if ((event.ctrlKey || event.metaKey) && ['c', 'x', 'a'].includes(event.key.toLowerCase())) {
    return;
  }

  // อนุญาต Ctrl/Cmd + V (Paste) แต่จะไปกรองข้อมูลใน onInput แทน
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
    return;
  }

  const currentInputValue = String(internalValue.value);
  const isNumber = /^[0-9]$/.test(event.key);
  // อนุญาตจุดทศนิยมแค่ครั้งเดียว
  const isDecimalPoint = event.key === '.' && !currentInputValue.includes('.');

  // ถ้าไม่ใช่ตัวเลขและไม่ใช่จุดทศนิยมที่ถูกต้อง ให้ป้องกันการพิมพ์
  if (!isNumber && !isDecimalPoint) {
    event.preventDefault();
  }
};

// จัดการเหตุการณ์ Input เพื่อกรองและอัปเดตค่า
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // ลบอักขระที่ไม่ใช่ตัวเลขและจุดทศนิยมออก
  let cleanedValue = value.replace(/[^0-9.]/g, '');

  // จัดการกรณีที่มีจุดทศนิยมหลายจุด (เก็บจุดแรก)
  const parts = cleanedValue.split('.');
  if (parts.length > 2) {
    cleanedValue = parts[0] + '.' + parts.slice(1).join('');
  }

  // **เพิ่ม:** จำกัดจำนวนทศนิยมตาม `maxDecimalPlaces`
  if (parts.length === 2 && parts[1].length > props.maxDecimalPlaces) {
    cleanedValue = parts[0] + '.' + parts[1].substring(0, props.maxDecimalPlaces);
  }

  internalValue.value = cleanedValue; // อัปเดตค่าภายในทันที
};

// จัดการเหตุการณ์ Blur เพื่อ emit ค่าสุดท้ายที่ถูกต้อง
const onBlur = () => {
  const numValue = parseFloat(String(internalValue.value));
  if (!isNaN(numValue)) {
    emit('update:modelValue', numValue);
  } else {
    emit('update:modelValue', null); // ถ้าไม่ใช่ตัวเลข ให้ emit เป็น null
  }
};
</script>
