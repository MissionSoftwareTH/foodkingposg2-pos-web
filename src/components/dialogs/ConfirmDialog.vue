<template>
  <dialog ref="dialogRef" class="modal" :open="store.isOpen" @click="handleBackdropClick">
    <div class="modal-box" @click.stop>
        <div class="flex gap-2 items-center text-warning">
            <IconAlertTriangle class="size-10"/>
            <h3 class="font-semibold text-xl">Warning</h3>
        </div>

      <p class="py-4">Are you sure to continue your progress</p>

      <div class="modal-action">
        <button
          class="btn btn-ghost"
          @click="cancel"
          :disabled="store.isLoading"
        >
          {{ store.cancelButtonText }}
        </button>
        <button
          class="btn btn-primary"
          @click="confirm"
          :disabled="store.isLoading"
        >
          <span v-if="store.isLoading" class="loading loading-spinner loading-xs mr-2"></span>
          {{ store.confirmButtonText }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useConfirmDialogStore } from '../../store/confirmDialogStore';
import { IconAlertTriangle } from '@tabler/icons-vue';

const store = useConfirmDialogStore();
const dialogRef = ref<HTMLDialogElement | null>(null);

// Watch for changes in store.isOpen to control the dialog element
// DaisyUI's modal class works by setting the 'open' attribute on the <dialog>
// and then using CSS to show/hide it.
watch(() => store.isOpen, (newVal) => {
  if (newVal) {
    dialogRef.value?.showModal(); // HTML dialog API to show the modal natively
  } else {
    dialogRef.value?.close(); // HTML dialog API to hide the modal
  }
});

const confirm = () => {
  store.hideConfirm(true); // Call store action to resolve promise and close modal
};

const cancel = () => {
  store.hideConfirm(false); // Call store action to reject promise and close modal
};

const handleBackdropClick = (event: MouseEvent) => {
  if (dialogRef.value && event.target === dialogRef.value) {
    // If the click target is the dialog element itself (backdrop),
    // then treat it as a cancel action.
    cancel();
  }
};
</script>