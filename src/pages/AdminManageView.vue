<script setup lang="ts">
import { IconFilter2, IconPlus, IconSortAscendingLetters } from '@tabler/icons-vue';
import Table from '../components/Table.vue';
import TableSort from '../components/TableSort.vue';
import TitleBarCard from '../components/TitleBarCard.vue';
import { adminListSortColumnOption, SortOrderOption } from '../constants/page_option';
import { AdminListTableHeaders } from '../constants/table';
import { usePageOptionStore } from '../store/sortingStore';
import { ref } from 'vue';
import { AdminListPayloadForm } from '../constants/form';
import { useDialogStore } from '../store/dialogStore';
import { useProgressBarStore } from '../store/progressBarStore';
import type { AxiosError, AxiosResponse } from 'axios';
import type { baseResponse, Data } from '../types';
import type { AdminListPayload, AdminListResponse, AdminListTable } from '../types/admin';
import apiClient from '../services/api/apiService';
import { useMutation, useQuery } from '@tanstack/vue-query';

const progress = useProgressBarStore();
const dialogStore = useDialogStore();
const pageOptionStore = usePageOptionStore();
const headers = AdminListTableHeaders;
const sortColumnOption = adminListSortColumnOption;
const form = ref({...AdminListPayloadForm});

//fetch adminlist
const fetchAdminList = async ():Promise<AdminListResponse[]> => {
    const apiUrl = '/admins/list';
    const res:AxiosResponse<baseResponse<Data<AdminListResponse[]>>> = await apiClient.get(apiUrl);
    // const resTable = res.data.res_data.data.map((data) => {
        
    // })
    return res.data.res_data.data;
}
const {data: adminList , isPending: isAdminListPending , isError: isAdminListError} = useQuery<AdminListResponse[],AxiosError>({
    queryFn: fetchAdminList,
    queryKey: ['adminListAxios']
});

//create admin
const createAdmin = async (payload:AdminListPayload) => {
    const apiUrl = '/admins/insert';
    const res:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload);
    return res.data;
}
const createAdminMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , AdminListPayload>({
    mutationFn: createAdmin,
    onSuccess: (data) => {
        dialogStore.openDialog(data.res_message || 'unknown error' , {status: 'success'});
        closeModal();
    },
    onError: (error) => {
        dialogStore.openDialog(error.response?.data.res_message || error.message , {status: 'error'});
    },
    onMutate: () => {
        progress.loadingStart();
    },
    onSettled: () => {
        progress.loadingStop();
    }
})
const handleSubmit = () => {

    createAdminMutation.mutate(form.value);
}

const resetForm = () => {
   form.value = {...AdminListPayloadForm};
}
const closeModal = () => {
    dialogStore.form = false;
    resetForm();
}
const handleSortColumnEmit = () => {

}
const handleSortOrderEmit = () => {

}
const handleEmit = () => {

}

</script>
<template>
<div class="flex flex-col p-2">
        <h1 class="text-3xl font-semibold mb-4">Admin Management</h1>
        <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
            <div class="w-full h-full flex gap-4 p-4 items-center bg-gradient-to-tr">
                <TitleBarCard title="Total Product" :text="pageOptionStore.adminlist.TotalRecords" :is-pending="false"/>
            </div>
        </div>
        <div class="flex gap-4 flex-col mt-5">
            <div class="flex gap-2 items-center">
                <div class="flex items-center gap-2">
                    <h1>show</h1>
                    <select v-model="pageOptionStore.adminlist.PageSize" className="select select-sm w-fit rounded-lg">
                        <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                    </select>
                </div>
                <TableSort :sort-item="sortColumnOption" @page-sort="handleSortColumnEmit">
                    <template #icon>
                        {{ pageOptionStore.adminlist.SortColumn }}  
                        <IconFilter2/>
                    </template>
                </TableSort>
                <TableSort :sort-item="SortOrderOption" @page-sort="handleSortOrderEmit">
                    <template #icon>    
                        {{ SortOrderOption.find((s) => s.value === pageOptionStore.adminlist.SortOrder)?.title  }}
                        <IconSortAscendingLetters/>
                    </template>
                </TableSort>
                <span class="w-full"></span>
                <button class="btn btn-primary btn-sm rounded-lg" @click="() => dialogStore.form = true"><IconPlus class="size-5"/>Add Product</button>
            </div>
            <Table 
                :headers="headers" 
                :items="adminList"
                :isLoading="isAdminListPending" 
                :isError="isAdminListError"
                :item-per-page="pageOptionStore.adminlist.PageSize"
                :current-page="pageOptionStore.adminlist.CurrentPage"
                :total-items="pageOptionStore.adminlist.TotalRecords"
                @page-changed="handleEmit"
            >

            </Table>
        </div>
    </div>
</template>