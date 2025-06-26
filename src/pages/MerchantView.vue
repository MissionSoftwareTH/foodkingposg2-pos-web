<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, Data, HeadersTable, MerchantData, Payload } from '../types';
import { IconFilter2, IconPencil, IconPlus, IconSortAscendingLetters, IconTrash, IconX } from '@tabler/icons-vue';
import apiClient from '../services/api/apiService';
import type { AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';

const headers:HeadersTable[] = [
    {
        key: 'MerchantId',
        title: 'Merchant Id',
    },
    {
        key: 'MerchantName',
        title: 'Merchant Name',
    },
    {
        key: 'ContactPhone',
        title: 'Contact Phone',
    },
    {
        key: 'ContactEmail',
        title: 'Contact Email',
    },
    {
        key: 'CreatedAt',
        title: 'Created At',
    },
    {
        key: 'UpdatedAt',
        title: 'Updated At',
    },
    {
        key: 'Status',
        title: 'Status',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
];

const dialogStore = useDialogStore();
const myModalRef = ref<HTMLDialogElement | null>(null);
const isLoading = ref<boolean>(false);
const form = ref<Payload>({
    MerchantName: '',
    ContactPhone: '',
    ContactEmail: '',
});
const items = ref<MerchantData[]>([]);

const openModal = () => {
  if (myModalRef.value) {
    myModalRef.value.showModal();
  }
};

const selectedOption = ref<string | number>(5);

const getMerchant = async () => {
    try {
        
        const apiUrl = '/merchants/list';
        const res:AxiosResponse<baseResponse<Data<MerchantData[]>>> = await apiClient.get(apiUrl );
        
        items.value = res?.data?.res_data?.data || [];
        console.log(items.value);
        
        
    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog(error?.res?.data?.res_message || error, {status: 'error'});
    }
}

const addMerchant = async () => {
    try {
        isLoading.value = true;
        
        const payload = form.value;
        const apiUrl = '/merchants/insert';
        const res:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload );
        dialogStore.openDialog(res?.data?.res_message || 'unknown message', {status: 'success'});
        getMerchant();

    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog(error?.res?.data?.res_message || 'unknown message', {status: 'success'});
    } finally {
        isLoading.value = false;
        myModalRef.value?.close();
    }
}

onMounted(() => {
    getMerchant();
})

</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">Merchant Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <div class="w-full h-full flex justify-between p-4 items-center">
            <div class="">
                <div class="rounded-lg bg-base-100/50 backdrop-blur-lg p-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, quasi?
                </div>
            </div>
            <button class="btn btn-primary btn-sm " @click="openModal"><IconPlus class="size-5"/>Add Merchant</button>
        </div>
    </div>
    <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>show</h1>
                <select v-model="selectedOption" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
            <div class="dropdown">
                <button class="btn rounded-lg btn-sm p-2 btn-ghost ">
                    <IconFilter2/>
                </button>
                <ul class="dropdown-content menu bg-base-100 shadow-lg rounded-lg gap-2">
                    <li v-for="item in ['Product Name','Product Code']" :key="item">
                        <input type="radio" name="product_filter" id="" :value="item" :aria-label="item" class="btn btn-sm text-nowrap rounded-lg">
                    </li>
                </ul>
            </div>
            <div class="dropdown">
                <button class="btn rounded-lg btn-sm p-2 btn-ghost ">
                    <IconSortAscendingLetters/>
                </button>
                <ul class="dropdown-content menu bg-base-100 shadow-lg rounded-lg gap-2">
                    <li v-for="item in ['ASC','DESC']" :key="item">
                        <input type="radio" name="product_filter" id="" :value="item" :aria-label="item" class="btn btn-sm text-nowrap rounded-lg">
                    </li>
                </ul>
            </div>
            <span class="w-full"></span>
            <button class="btn btn-primary btn-sm rounded-lg" @click="openModal"><IconPlus class="size-5"/>Add Item</button>
        </div>
        <Table :headers="headers" :items="items" class="rounded-xl shadow-lg w-full h-full" :is-loading="true" :is-error="false">
            <template #actions>
                <button class="btn btn-circle btn-soft btn-xs bg-info text-info-content mr-2" ><IconPencil class="size-4"/></button>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" ><IconTrash class="size-4"/></button>
            </template>
        </Table>
    </div>

    <!-- add merchant dialog -->
    <dialog ref="myModalRef" className="modal">
        <div className="modal-box">
            <button class="absolute top-2 right-2 btn btn-soft btn-circle btn-error size-8" @click="() => myModalRef?.close()"><IconX class="text-error-content"/></button>
            <h3 className="font-semibold text-xl">Add New Merchant</h3>
            <div className="modal-action">
                <form class="card-body" @submit.prevent="addMerchant">
                    <div class="form-control flex">
                        <label class="label text-base-content flex-1">
                            <span class="label-text">MerchantName</span>
                        </label>
                        <input type="text" placeholder="MerchantName" class="input input-bordered flex-2" required v-model="form.MerchantName"/>
                    </div>
                    <div class="form-control flex">
                        <label class="label text-base-content flex-1">
                            <span class="label-text">ContactPhone</span>
                        </label>
                        <input type="text" placeholder="ContactPhone" class="input input-bordered flex-2" required v-model="form.ContactPhone"/>
                    </div>
                    <div class="form-control flex">
                        <label class="label text-base-content flex-1">
                            <span class="label-text">ContactEmail</span>
                        </label>
                        <input type="text" placeholder="ContactEmail" class="input input-bordered flex-2" required v-model="form.ContactEmail"/>
                    </div>
                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary" :disabled="isLoading">Add<span v-if="isLoading" className="loading loading-spinner loading-xs ml-2"></span></button>
                    </div>
                </form>
            </div>
        </div>
    </dialog>
</div>
</template>