<script setup lang="ts">

defineProps({
    sortItem: {
        type: Array as () => any[] | undefined,
        required: true,
    }
});

const emit = defineEmits<{
  (e: 'page-sort', sort: string): void;
}>();

const handleEmitSubmit = (value:string) => {
    emit('page-sort', value);
}

</script>
<template>
    <div class="dropdown">
        <button class="btn rounded-lg btn-sm p-2 btn-ghost uppercase text-nowrap">
            <slot name="icon"></slot>
        </button>
        <ul class="dropdown-content menu bg-base-100 shadow-lg rounded-lg gap-2">
            <li v-for="item in sortItem" :key="item.value">
                <input type="radio" name="product_filter" id="" :value="item.value" :aria-label="item.title" @click="handleEmitSubmit(item.value)" class="btn btn-sm text-nowrap rounded-lg p-2 btn-ghost uppercase" />
            </li>
        </ul>
    </div>
</template>