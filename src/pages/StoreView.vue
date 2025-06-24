<script setup lang="ts">
import { ref, watch } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, BranchPayload, BranchResponse , BranchTable, DataBaseResponse } from '../types';
import { IconFilter2, IconPencil, IconPlus, IconSortAscendingLetters, IconTrash, IconX } from '@tabler/icons-vue';
import apiClient from '../services/api/apiService';
import { AxiosError, type AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';
import { useConfirmDialogStore } from '../store/confirmDialogStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useToastStore } from '../store/toastStore';
import { useProgressBarStore } from '../store/progressBarStore';
import { formatDateTime } from '../services/utils';
import TableSort from '../components/TableSort.vue';
// import TestTable from '../components/testTable.vue';
// import Test from '../components/Test.vue';
import { storeForm } from '../constants/form';
import { storeTableHeaders } from '../constants/table';
import { SortOrderOption, storeSortColumnOption } from '../constants/page_option';
import { extractPageOption } from '../services/utils/dataExtract';
import { usePageOptionStore } from '../store/sortingStore';

const confirmStore = useConfirmDialogStore();
const dialogStore = useDialogStore();
const toastStore = useToastStore();
const queryClient = useQueryClient();
const progressBarStore = useProgressBarStore();
const mode = ref<number>(1);
const myModalRef = ref<HTMLDialogElement | null>(null);
const form = ref(storeForm);
const headers = storeTableHeaders;
const sortColumnOption = storeSortColumnOption;
const pageOptionStore = usePageOptionStore();

const openModal = (data?:BranchTable) => {
    if(data) {
        mode.value = 2;
        form.value = {
            BranchId: data.BranchId,
            BranchName: data.BranchName,
            BranchEmail: data.ContactEmail,
            BranchPhone: data.ContactPhone,
        };
        return myModalRef?.value?.showModal();
    }
    mode.value = 1;
    myModalRef?.value?.showModal();
};

// fetch data
const fetchBranchList = async (): Promise<BranchTable[]> => {
    const {MerchantId , CurrentPage , PageSize , SortColumn , SortOrder} = pageOptionStore.store
    const params = {
        SortOrder , SortColumn ,  MerchantId , PageSize , Page: CurrentPage
    }
    const apiUrl = '/branchs/list';
    const response:AxiosResponse<baseResponse<DataBaseResponse<BranchResponse[]>>> = await apiClient.get(apiUrl, {params});
    const data:BranchTable[] = response.data.res_data.ConstructData || []
    data.map((branch) => {
        branch.CreatedAt = formatDateTime(branch.CreatedAt);
        branch.UpdatedAt = formatDateTime(branch.UpdatedAt);
    }) || [];
    pageOptionStore.store = extractPageOption(response.data.res_data , pageOptionStore.store);
    return data;
};

const {data: branchData , isPending , isError , isFetching } = useQuery<BranchTable[] , AxiosError>({
    queryKey: ['branchListAxios'] ,
    queryFn: fetchBranchList ,
})

//post data
const createBranch = async (payload:BranchPayload) => {
    const apiUrl = '/branchs/insert';
    const response:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload );
    return response.data;
}

const createBranchMutation = useMutation<baseResponse<void>,AxiosError<baseResponse<void>>,BranchPayload>({
    mutationFn: createBranch,
    onSuccess: (data) => {
        myModalRef.value?.close();
        dialogStore.openDialog(data.res_message , {status: 'success'});
        queryClient.invalidateQueries({ queryKey: ['branchListAxios']});
        //ล้างฟอร์ม
        form.value = {...storeForm};
    },
    onError: (error) => {
        console.error(error.response?.data.res_message || error.message);
        dialogStore.openDialog(error.response?.data.res_message || error.message , {status: 'error'});
    },
    onMutate: () => {
        progressBarStore.loadingStart();
    },
    onSettled: () => {
        setTimeout(() => {
        progressBarStore.loadingStop();
        }, 1000);
    }  
})

const handleSubmit = () => {
    const { MerchantId , BranchName , BranchId } = form.value;
    switch(mode.value) {
    //create
    case 1: {
        if(!MerchantId || !BranchName) {
        return toastStore.showToast('ใส่ข้อมูลไม่ครบถ้วน' , 'warning');
        }
        createBranchMutation.mutate(form.value);
        return;
    }
    //update
    case 2: {
        if(!BranchId) {
        return toastStore.showToast('ใส่ข้อมูลไม่ครบถ้วน' , 'warning');
        }
        updateBranchMutation.mutate(form.value);
        return; 
    }
    default: return;
  }
}

//update data
const updateBranch = async (payload:BranchPayload) => {
    const apiUrl = '/branchs/update';
    const response:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload );
    return response.data;
}

const updateBranchMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , BranchPayload>({
    mutationFn: updateBranch,
    onSuccess: (data) => {
        toastStore.showToast(data.res_message , 'success');
        queryClient.invalidateQueries({queryKey: ['branchListAxios']});
        closeModal();
    },
    onError: (error) => {
        toastStore.showToast(error.response?.data.res_message || error.message , 'error');
    },
    onSettled: () => {
        setTimeout(() => {
        progressBarStore.loadingStop();
        }, 1000);
    },
    onMutate: () => {
        progressBarStore.loadingStart();
    }
})

const closeModal = () => {
  myModalRef.value?.close();
  resetForm();
}

const resetForm = () => {
  form.value = {...storeForm};
}

const handleEmit = (page:number) => {
  pageOptionStore.store.CurrentPage = page;
  queryClient.invalidateQueries({queryKey: ['branchListAxios']});
}

const handleSortOrderEmit = (sort:string) => {
    pageOptionStore.store.SortOrder = sort;
    queryClient.invalidateQueries({queryKey: ['branchListAxios']});
}

const handleSortColumnEmit = (sort:string) => {
    pageOptionStore.store.SortColumn = sort;
    queryClient.invalidateQueries({queryKey: ['branchListAxios']});
}

watch(() => pageOptionStore.store.PageSize ,() => {
  pageOptionStore.store.CurrentPage = 1;
  queryClient.invalidateQueries({queryKey: ['branchListAxios']});
})

</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">Store Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <div class="w-full h-full flex justify-between p-4 items-center">
            <div class="rounded-lg bg-base-100/50 backdrop-blur-lg p-4 max-w-1/5 flex-1">
                <h1 class="text-sm">Total Store</h1>
                <div class="flex justify-center items-center w-full">
                     <h1 class="text-4xl" v-if="!isPending">{{ pageOptionStore.store.TotalRecords }}</h1><span v-else class=" loading loading-dots"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>show</h1>
                <select v-model="pageOptionStore.store.PageSize" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
           <TableSort :sort-item="sortColumnOption" @page-sort="handleSortColumnEmit">
                <template #icon>
                    {{ pageOptionStore.store.SortColumn }}  
                    <IconFilter2/>
                </template>
            </TableSort>
            <TableSort :sort-item="SortOrderOption" @page-sort="handleSortOrderEmit">
                <template #icon>    
                    {{ SortOrderOption.find((s) => s.value === pageOptionStore.store.SortOrder)?.title  }}
                    <IconSortAscendingLetters/>
                </template>
            </TableSort>
            <span class="w-full"></span>
            <button class="btn btn-primary btn-sm rounded-lg" @click="openModal()"><IconPlus class="size-5"/>Add Store</button>
        </div>
        <Table 
            class="rounded-xl shadow-lg w-full h-full"
            :isLoading="isPending"
            :isError="isError"
            :headers="headers"
            :items="branchData"
            :item-per-page="pageOptionStore.store.PageSize"
            :total-items="pageOptionStore.store.TotalRecords"
            :current-page="pageOptionStore.store.CurrentPage"
            @page-changed="handleEmit"
        >
            <template #actions="product">
                <button class="btn btn-circle btn-soft btn-xs bg-info text-info-content mr-2" @click="openModal(product.item)"><IconPencil class="size-4"/></button>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" @click="() => confirmStore.isOpen = true"><IconTrash class="size-4"/></button>
            </template>
        </Table>
        <!-- <TestTable
            class="rounded-xl shadow-lg w-full h-full"
            :isLoading="isPending"
            :isError="isError"
            :headers="headers"
            :items="branchData"
            :item-per-page="pageOptionStore.store.PageSize"
            :total-items="pageOptionStore.store.TotalRecords"
            :current-page="pageOptionStore.store.CurrentPage"
            @page-changed="handleEmit"
        >
            <template #actions="product">
                <button class="btn btn-circle btn-soft btn-xs bg-info text-info-content mr-2" @click="openModal(product.item)"><IconPencil class="size-4"/></button>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" @click="() => confirmStore.isOpen = true"><IconTrash class="size-4"/></button>
            </template>
        </TestTable> -->
        <!-- <Test/> -->
    </div>

    <!-- add merchant dialog -->
    <dialog ref="myModalRef" className="modal">
        <div className="modal-box">
            <button class="absolute top-2 right-2 btn btn-soft btn-circle btn-error size-8" @click="closeModal"><IconX class="text-error-content"/></button>
            <h3 v-if="mode === 1" className="font-semibold text-xl">Add New Store</h3>
            <h3 v-else-if="mode === 2" className="font-semibold text-xl">Update Store</h3>
            <div className="modal-action">
                <form class="card-body" @submit.prevent="handleSubmit">
                    <div class="form-control flex">
                        <label class="label text-base-content flex-1">
                            <span class="label-text">Store Name</span>
                        </label>
                        <input type="text" placeholder="Store Name" class="input input-bordered flex-2 validator" v-model="form.BranchName"/>
                    </div>
                    <div class="form-control flex">
                        <label class="label text-base-content flex-1">
                            <span class="label-text">Store Phone</span>
                        </label>
                        <input type="text" placeholder="Store Email" class="input input-bordered flex-2" v-model="form.BranchPhone"/>
                    </div>
                    <div class="form-control flex">
                        <label class="label text-base-content flex-1">
                            <span class="label-text">Store Email</span>
                        </label>
                        <input type="text" placeholder="Store Email" class="input input-bordered flex-2" v-model="form.BranchEmail"/>
                    </div>
                    <div class="form-control mt-6">
                        <button type="submit" class="btn btn-primary" :disabled="isFetching">Submit<span v-if="isFetching" className="loading loading-spinner loading-xs ml-2"></span></button>
                    </div>
                </form>
            </div>
        </div>
    </dialog>
</div>
</template>