<script setup lang="ts">
import { ref } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, BranchPayload, Data, HeadersTable, BranchResponse , BranchTable } from '../types';
import { IconAffiliate, IconFilter2, IconPencil, IconPlus, IconSortAscendingLetters, IconTrash, IconX } from '@tabler/icons-vue';
import apiClient from '../services/api/apiService';
import type { AxiosError, AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';
import { useConfirmDialogStore } from '../store/confirmDialogStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useToastStore } from '../store/toastStore';
import { useProgressBarStore } from '../store/progressBarStore';
import { formatDateTime } from '../services/utils';
import TableSort from '../components/TableSort.vue';

const headers:HeadersTable[] = [
    {
        key: 'BranchId',
        title: 'Store Id',
    },
    {
        key: 'BranchName',
        title: 'Store Name',
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
        key: 'NumberOfPos',
        title: 'number of POS',
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

const confirmStore = useConfirmDialogStore();
const dialogStore = useDialogStore();
const toastStore = useToastStore();
const queryClient = useQueryClient();
const progressBarStore = useProgressBarStore();
const mode = ref<number>(1);
const myModalRef = ref<HTMLDialogElement | null>(null);
const defaultform = {
    MerchantId: 1,
    BranchName: '',
    BranchEmail: '',
    BranchPhone: '',
}
const form = ref<BranchPayload>({
    MerchantId: 1,
    BranchName: '',
    BranchEmail: '',
    BranchPhone: '',
});

interface PageOption {
    totalItem: number;
    itemPerPage: number;
    currentPage: number;
    sortOrder: string;
    sortBy: string;
}

const PageOption = ref({
    totalItem: 500,
    itemPerPage: 5,
    currentPage: 1,
    sortOrder: 'desc',
    sortBy: '',
})

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
    // 
    const apiUrl = '/branchs/list?MerchantId=1';
    const response:AxiosResponse<baseResponse<Data<BranchResponse[]>>> = await apiClient.get(apiUrl);
    const branchTable:BranchTable[] = response.data.res_data.data;
    branchTable.map((branch) => {
        branch.CreatedAt = formatDateTime(branch.CreatedAt);
        branch.UpdatedAt = formatDateTime(branch.UpdatedAt);
    })
    return branchTable;
};

const {data: branchData , isPending , isError , error , isFetching } = useQuery<BranchTable[] , AxiosError>({
    queryKey: ['branchListAxios'] ,
    queryFn: fetchBranchList ,
})

if (isError.value) {
    console.error(error.value?.response); // เข้าถึงข้อมูล error จาก Axios
    console.error(error.value?.message); // เข้าถึงข้อความ error ทั่วไป
}

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
        form.value = {...defaultform};
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
  form.value = {...defaultform};
}

const handleEmit = (emitValue:number) => { 
    PageOption.value.currentPage = emitValue;
    // console.log(PageOption.value.itemPerPage);
}

const handleSortOrderEmit = (sort:string) => {
    PageOption.value.sortOrder = sort;
    console.log(PageOption.value.sortOrder);
}

const handleSortByEmit = (sort:string) => {
    PageOption.value.sortBy = sort;
    console.log(PageOption.value.sortBy);
}

</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">Store Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <div class="w-full h-full flex justify-between p-4 items-center">
            <div class="">
                <div class="rounded-lg bg-base-100/50 backdrop-blur-lg p-4">
                    Store of this merchant
                </div>
            </div>
        </div>
    </div>
    <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>show</h1>
                <select v-model="PageOption.itemPerPage" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
            <TableSort :sort-item="[{title: 'Product Name', value: 'productName'},{title: 'Product Code', value: 'productCode'}]" @page-sort="handleSortByEmit">
                <template #icon>    
                    <IconFilter2/>
                </template>
            </TableSort>
            <TableSort :sort-item="[{title: 'ASC', value: 'asc'},{title: 'DESC', value: 'desc'}]" @page-sort="handleSortOrderEmit">
                <template #icon>    
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
            :item-per-page="PageOption.itemPerPage"
            :total-items="PageOption.totalItem"
            :current-page="PageOption.currentPage"
            @page-changed="handleEmit"
        >
            <template #actions="product">
                <button class="btn btn-circle btn-soft btn-xs bg-info text-info-content mr-2" @click="openModal(product.item)"><IconPencil class="size-4"/></button>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" @click="() => confirmStore.isOpen = true"><IconTrash class="size-4"/></button>
            </template>
        </Table>
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