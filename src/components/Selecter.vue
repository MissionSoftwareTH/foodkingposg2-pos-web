<template>
  <select v-model="internalSelectedId" class="select select-bordered w-full rounded-lg" @change="emitStatusChange">
    <option
      v-for="(status, index) in List"
      :key="`status-option-${index}`"
      :value="status.ProductStatusId"
    >
      {{ status.ProductStatusName }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// Define the types for the component's props
interface CellProps {
  initialId: number;
  List: any[];
}

const props = defineProps<CellProps>();

// Define the types for the component's emitted events
const emit = defineEmits<{
  (e: 'update:status', value: number): void;
}>();

const internalSelectedId = ref<number>(props.initialId);

// Watch for changes in initialId prop to update internalSelectedId
watch(() => props.initialId, (newVal: number) => {
  internalSelectedId.value = newVal;
});

// Emit the new value when the select changes
const emitStatusChange = () => {
  emit('update:status', internalSelectedId.value);
};

// Optional: If you want to ensure the initial value is set correctly on mount
// This is usually handled by ref(props.initialId) directly,
// but can be useful for debugging or complex initializations.
onMounted(() => {
  if (props.initialId !== internalSelectedId.value) {
    internalSelectedId.value = props.initialId;
  }
});
</script>