<script setup lang="ts">

const props = defineProps({
    sortItem: {
        type: Array as () => any[] | undefined,
        required: true,
    }
})

const emit = defineEmits<{
  (e: 'page-sort', sort: string): void;
}>();

const handleSendEmit = (value:string) => {
    emit('page-sort', value);
}

</script>
<template>
    <div class="dropdown">
        <button class="btn rounded-lg btn-sm p-2 btn-ghost ">
            <slot name="icon"></slot>
        </button>
        <ul class="dropdown-content menu bg-base-100 shadow-lg rounded-lg gap-2">
            <li v-for="item in sortItem" :key="item.value">
                <input type="radio" name="product_filter" id="" :value="item.value" :aria-label="item.title" @click="handleSendEmit(item.value)" class="btn btn-sm text-nowrap rounded-lg">
            </li>
        </ul>
    </div>
</template>