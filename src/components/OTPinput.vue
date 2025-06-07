<template>
    <div class="flex items-center justify-center">
        <input
            v-for="(_digit, index) in otp"
            :key="index"
            type="text"
            :maxlength="1"
            :value="otp[index]"
            class="mx-1 w-12 h-12 rounded border border-base-content text-center focus:outline-none focus:border-primary focus:shadow-sm focus:shadow-primary/50 caret-transparent"
            @input="handleInput(index, $event)"
            @keydown.delete="handleBackspace(index)"
            @keydown.arrow-left="moveFocus(index, -1)"
            @keydown.arrow-right="moveFocus(index, 1)"
            @paste.prevent :ref="setInputRef(index)"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, withDefaults, nextTick, type ComponentPublicInstance } from 'vue';

const props = withDefaults(defineProps<{
    length: number;
}>(), {
    length: 6,
});

const emit = defineEmits<{
    'otp-completed': [otp: string];
}>();

const otp = ref<string[]>(Array(props.length).fill(''));
const inputRefs = ref<HTMLInputElement[]>([]);

onMounted(() => {
    nextTick(() => {
        if (inputRefs.value.length > 0) {
            inputRefs.value[0]?.focus();
        }
    });
});

const setInputRef = (index: number) => {
    return (el: Element | ComponentPublicInstance | null) => {
        if (el) {
            inputRefs.value[index] = el as HTMLInputElement;
        }
    };
};

const handleInput = (index: number, event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    if (!/^\d*$/.test(value)) {
        inputElement.value = otp.value[index];
        return;
    }

    if (value.length > 1) {
        value = value.slice(-1);
        inputElement.value = value;
    }

    otp.value[index] = value;

    if (value && index < props.length - 1) {
        nextTick(() => {
            inputRefs.value[index + 1]?.focus();
        });
    }

    if (otp.value.every(digit => digit !== '')) {
        emit('otp-completed', otp.value.join(''));
    }
};

const handleBackspace = (index: number) => {
    if (otp.value[index]) {
        otp.value[index] = '';
    } else if (index > 0) {
        otp.value[index - 1] = ''; 
        nextTick(() => { 
            inputRefs.value[index - 1]?.focus();
        });
    }
    if (!otp.value.every(digit => digit !== '')) {
        // สามารถ emit event 'otp-incomplete' หรือทำการล้างค่าที่ถูก emit ไปก่อนหน้าได้ที่นี่
        // ตัวอย่าง: emit('otp-incomplete');
    }
};

const moveFocus = (index: number, offset: number) => {
    const newIndex = index + offset;
    if (newIndex >= 0 && newIndex < props.length) {
        inputRefs.value[newIndex]?.focus();
    }
};


// ลบ handlePaste function ออกไปเลย เพราะเราจะไม่ใช้มันแล้ว
// เนื่องจาก @paste.prevent จะจัดการให้
/*
const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault(); // ป้องกันการวางค่าเริ่มต้น
    const pastedData = event.clipboardData?.getData('text');

    if (pastedData && /^\d+$/.test(pastedData)) {
        const pastedDigits = pastedData.split('').slice(0, props.length);
        for (let i = 0; i < props.length; i++) {
            otp.value[i] = pastedDigits[i] || '';
            if (i === pastedDigits.length - 1 || i === props.length - 1) {
                nextTick(() => {
                    inputRefs.value[Math.min(i, props.length - 1)]?.focus();
                });
            }
        }

        if (pastedDigits.length >= props.length) {
            emit('otp-completed', otp.value.join(''));
        }
    }
};
*/
</script>

<style scoped>
.otp-input:focus {
  caret-color: transparent; /* ทำให้ cursor โปร่งใสเมื่อช่องถูกโฟกัส */
}
</style>