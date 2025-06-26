<script setup lang="ts">
import { ref, watch } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, BrandResponse , BrandTable, BrandPayload, Data } from '../types';
import { IconFilter2, IconPlus, IconSortAscendingLetters, IconTrash } from '@tabler/icons-vue';
import apiClient from '../services/api/apiService';
import { AxiosError, type AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';
import { useConfirmDialogStore } from '../store/confirmDialogStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useToastStore } from '../store/toastStore';
import { useProgressBarStore } from '../store/progressBarStore';
import TableSort from '../components/TableSort.vue';
import { brandPayloadForm } from '../constants/form';
import { brandTableHeaders } from '../constants/table';
import { brandSortColumnOption, SortOrderOption } from '../constants/page_option';
import { usePageOptionStore } from '../store/sortingStore';

const confirmStore = useConfirmDialogStore();
const dialogStore = useDialogStore();
const toastStore = useToastStore();
const queryClient = useQueryClient();
const progressBarStore = useProgressBarStore();
const mode = ref<number>(1);
const myModalRef = ref<HTMLDialogElement | null>(null);
const form = ref(brandPayloadForm);
const updateForm = ref(brandPayloadForm);
const headers = brandTableHeaders;
const sortColumnOption = brandSortColumnOption;
const pageOptionStore = usePageOptionStore();
const isInputUpdated = ref<number | undefined>(undefined);

// fetch data
const fetchBrandList = async (): Promise<BrandTable[]> => {
    const {MerchantId , CurrentPage , PageSize , SortColumn , SortOrder} = pageOptionStore.brand;
    const params = {
        SortOrder , SortColumn ,  MerchantId , PageSize , Page: CurrentPage
    };
    const apiUrl = '/dropdown/product/brand';
    const response:AxiosResponse<baseResponse<Data<BrandResponse[]>>> = await apiClient.get(apiUrl, {params});
    const data:BrandTable[] = response.data.res_data.data || []
    return data;
};

const {data: brandData , isPending , isError , isFetching } = useQuery<BrandTable[] , AxiosError>({
    queryKey: ['brandListAxios'] ,
    queryFn: fetchBrandList ,
})

//post data
const createBranch = async (payload:BrandPayload) => {
    const apiUrl = '/product/brand/insert';
    const response:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload );
    return response.data;
}

const createBrandMutation = useMutation<baseResponse<void>,AxiosError<baseResponse<void>>,BrandPayload>({
    mutationFn: createBranch,
    onSuccess: (data) => {
        toastStore.showToast(data.res_message , 'success');
        queryClient.invalidateQueries({ queryKey: ['brandListAxios']});
        queryClient.invalidateQueries({ queryKey: ['brandList']});
        //ล้างฟอร์ม
        closeModal();
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
    const { BrandName , ProductBrandId } = form.value;
    if(!BrandName) {
        return toastStore.showToast('ใส่ข้อมูลไม่ครบถ้วน' , 'warning');
    }
    switch(mode.value) {
    //create
    case 1: {
        
        createBrandMutation.mutate(form.value);
        return;
    }
    //update
    case 2: {
        if(!ProductBrandId) {
        return toastStore.showToast('ใส่ข้อมูลไม่ครบถ้วน' , 'warning');
        }
        updateBrandMutation.mutate(form.value);
        return; 
    }
    default: return;
  }
}

//update data
const updateBrand = async (payload:BrandPayload) => {
    const apiUrl = '/product/brand/update';
    const response:AxiosResponse<baseResponse<void>> = await apiClient.patch(apiUrl , payload );
    return response.data;
}

const updateBrandMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , BrandPayload>({
    mutationFn: updateBrand,
    onSuccess: (data) => {
        toastStore.showToast(data.res_message , 'success');
        queryClient.invalidateQueries({queryKey: ['brandListAxios']});
        closeModal();
    },
    onError: (error) => {
        toastStore.showToast(error.response?.data.res_message || error.message , 'error');
    },
    onSettled: () => {
        setTimeout(() => {
        progressBarStore.loadingStop();
        isInputUpdated.value = undefined;
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
  form.value = {...brandPayloadForm};
}

const handleEmit = (page:number) => {
  pageOptionStore.brand.CurrentPage = page;
  queryClient.invalidateQueries({queryKey: ['brandListAxios']});
}

const handleSortOrderEmit = (sort:string) => {
    pageOptionStore.brand.SortOrder = sort;
    queryClient.invalidateQueries({queryKey: ['brandListAxios']});
}

const handleSortColumnEmit = (sort:string) => {
    pageOptionStore.brand.SortColumn = sort;
    queryClient.invalidateQueries({queryKey: ['brandListAxios']});
}

const handleUpdateSubmit = () => {
  if(!updateForm.value) {
    return toastStore.showToast('ไม่สามารถ update ได้');
  }
  form.value = updateForm.value;
  updateBrandMutation.mutate(form.value);
}

const handleTextInputUpdate = ( newValue: string ,productId:number) => {
    console.log(newValue , productId);
    if (updateForm.value) {
        updateForm.value = {};
        updateForm.value.ProductBrandId = productId;
        updateForm.value.BrandName = newValue;
    }
    isInputUpdated.value = productId;
    console.log(isInputUpdated.value);
};

watch(() => pageOptionStore.brand.PageSize ,() => {
  pageOptionStore.brand.CurrentPage = 1;
  queryClient.invalidateQueries({queryKey: ['brandListAxios']});
})


</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">Brand Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <form @submit.prevent="handleSubmit" class="w-full h-full flex gap-4 p-4 items-center">
            <div class="form-control flex">
                <input type="text" placeholder="Brand name" class="input input-bordered flex-2 min-w-sm" v-model="form.BrandName"/>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isFetching"><IconPlus class="size-5"/>Add new brand<span v-if="isFetching" className="loading loading-spinner loading-xs ml-2"></span></button>
        </form>
    </div>
    <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>show</h1>
                <select v-model="pageOptionStore.brand.PageSize" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
           <TableSort :sort-item="sortColumnOption" @page-sort="handleSortColumnEmit">
                <template #icon>
                    {{ pageOptionStore.brand.SortColumn }}  
                    <IconFilter2/>
                </template>
            </TableSort>
            <TableSort :sort-item="SortOrderOption" @page-sort="handleSortOrderEmit">
                <template #icon>    
                    {{ SortOrderOption.find((s) => s.value === pageOptionStore.brand.SortOrder)?.title  }}
                    <IconSortAscendingLetters/>
                </template>
            </TableSort>
            <span class="w-full"></span>
        </div>
        <Table 
            :isLoading="isPending"
            :isError="isError"
            :headers="headers"
            :items="brandData"
            :item-per-page="pageOptionStore.brand.PageSize"
            :total-items="pageOptionStore.brand.TotalRecords"
            :current-page="pageOptionStore.brand.CurrentPage"
            @page-changed="handleEmit"
        >
            <template #ProductBrandName="brand">
                <div class="flex items-center">
                    <input type="text" :value="brand.item.ProductBrandName" @input="e => handleTextInputUpdate(String((e.target as HTMLSelectElement).value),brand.item.ProductBrandId)">
                    <button v-if="isInputUpdated === brand.item.ProductBrandId" @click="handleUpdateSubmit()" class="btn btn-primary btn-xs">Update</button>
                </div>
            </template>
            <template #actions>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" @click="() => confirmStore.isOpen = true"><IconTrash class="size-4"/></button>
            </template>
        </Table>
    </div>
</div>
</template>