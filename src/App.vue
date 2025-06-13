
<script lang="ts" setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AuthLayout from './layouts/AuthLayout.vue';
import BlankLayout from './layouts/BlankLayout.vue';
import type { Layouts } from './types';
import DialogMessage from './components/dialogs/DialogMessage.vue';
import appController from './services/utils/appController';

// setup layout router
const layouts: Layouts = {
  BlankLayout,
  AuthLayout,
};
const route = useRoute();
const currentLayout = computed(() => {
  const layoutName: string = (route.meta.layout as string) || '';
  return layouts[layoutName] || BlankLayout;
});


// setup theme locale
appController.setup();

</script>

<template>
    <component :is="currentLayout">
      <Transition name="fade" mode="out-in">
        <RouterView />
      </Transition>
    </component>
    <DialogMessage />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}


</style>