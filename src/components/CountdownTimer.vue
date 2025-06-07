<template>
    <span>{{ formattedTime }}</span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed, defineEmits } from 'vue';

const props = defineProps<{
  startTimeMillis: number; // เวลาเริ่มต้นเป็น milliseconds
}>();

const emit = defineEmits<{
  (e: 'countdown-finished', isFinished: boolean): void; // เหตุการณ์ที่ emit เมื่อนับถอยหลังเสร็จสิ้น
}>();

const remainingTime = ref(0); // เวลาที่เหลือในหน่วยมิลลิวินาที
let timer: ReturnType<typeof setInterval> | null = null; // ตัวแปรสำหรับเก็บ timer ID

// Computed property สำหรับแสดงผลเวลาในรูปแบบ HH:mm:ss หรือ mm:ss
const formattedTime = computed(() => {
  const totalSeconds = Math.max(0, Math.floor(remainingTime.value / 1000)); // ตรวจสอบให้แน่ใจว่าเป็น 0 หรือมากกว่า
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // จัดรูปแบบให้มี 2 หลักเสมอ (เช่น 01, 05, 10)
  const pad = (num: number) => num.toString().padStart(2, '0');

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${pad(minutes)}:${pad(seconds)}`;
  }
});

// ฟังก์ชันเริ่มต้นการนับถอยหลัง
const startCountdown = () => {
  emit('countdown-finished', false);
  if (timer) {
    clearInterval(timer); // เคลียร์ timer เก่าถ้ามี
  }

  // กำหนดเวลาเริ่มต้น
  remainingTime.value = props.startTimeMillis*1000;
  emit('countdown-finished', false);
  
  // เริ่มต้น interval
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value -= 1000; // ลดเวลาลง 1 วินาที
    } else {
      // เมื่อเวลานับถอยหลังหมด
      clearInterval(timer as ReturnType<typeof setInterval>); // หยุด timer
      timer = null;
      emit('countdown-finished', true); // Emit เหตุการณ์เมื่อหมดเวลา
    }
  }, 1000); // อัปเดตทุก 1 วินาที
};

// Watch สำหรับ props.startTimeMillis เพื่อเริ่มต้นการนับถอยหลังใหม่เมื่อค่าเปลี่ยน
watch(() => props.startTimeMillis, (newVal) => {
  if (newVal > 0) {
    startCountdown();
  } else {
    // ถ้า startTimeMillis เป็น 0 หรือน้อยกว่า ให้หยุด timer และรีเซ็ต
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    remainingTime.value = 0;
    emit('countdown-finished', true);
  }
}, { immediate: true }); // ให้ทำงานทันทีที่ component โหลดครั้งแรก

// Lifecycle hook: เมื่อ component ถูกเมาท์
onMounted(() => {
  // startCountdown ถูกเรียกโดย watch ด้วย { immediate: true } แล้ว
  // ดังนั้นไม่ต้องเรียกซ้ำที่นี่
});

// Lifecycle hook: เมื่อ component ถูกยกเลิกการเมาท์ (unmounted)
// สำคัญมากเพื่อป้องกัน Memory Leaks
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>