
<script lang="ts" setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AuthLayout from './layouts/AuthLayout.vue';
import BlankLayout from './layouts/BlankLayout.vue';
import controllerUI from './services/utils/controllerUI';
import type { Layouts } from './types';

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
controllerUI.setupUI();

</script>

<template>
    <component :is="currentLayout">
      <RouterView />
    </component>
</template>