<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';
import apiClient from '../services/api/apiService';
import type { baseResponse } from '../types';
import type { RoleListPayload, RoleListResponse } from '../types/role';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useDialogStore } from '../store/dialogStore';
import { useProgressBarStore } from '../store/progressBarStore';
import { ref } from 'vue';
import { RolePayloadForm } from '../constants/form';
import type { AxiosError, AxiosResponse } from 'axios';
import FormDialog from '../components/dialogs/FormDialog.vue';
import Table from '../components/Table.vue';
import { RoleTableHeaders } from '../constants/table';
import { usePageOptionStore } from '../store/sortingStore';
import { SortOrderOption } from '../constants/page_option';
import TableSort from '../components/TableSort.vue';

const dialogStore = useDialogStore();
const progress = useProgressBarStore();
const header = RoleTableHeaders;
const form = ref({...RolePayloadForm});
const pageOptionStore = usePageOptionStore();
const queryClient = useQueryClient();


const fetchRole = async ():Promise<RoleListResponse> => {
    const apiUrl = '/role/list';
    const res:AxiosResponse<baseResponse<RoleListResponse>> = await apiClient.get(apiUrl);
    return res.data.res_data;
}

const {data: roleList , isPending , isError } = useQuery({
    queryFn: fetchRole,
    queryKey: ['rolelistAxios'],
})

const handleSubmit = () => {
    const { RoleName } = form.value;
    if(!RoleName) return dialogStore.openDialog('กรุณากรอก Role Name',{status: 'warning'});
    createRoleMutation.mutate(form.value);
}

const createRole = async (payload:RoleListPayload) => {
    const apiUrl = '/role/insert';
    const res:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload);
    return res.data;
}

const resetForm = () => {
    form.value = {...RolePayloadForm};
}

const closeModal = () => {
    dialogStore.form = false;
    resetForm();
}

const createRoleMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , RoleListPayload>({
    mutationFn: createRole,
    onSuccess: (data) => {
        closeModal();
        queryClient.invalidateQueries({queryKey: ['rolelistAxios']});
        dialogStore.openDialog(data.res_message || 'unknown error' , {status: 'success'});
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

const handleEmit = (page:number) => {
  pageOptionStore.product.CurrentPage = page;
  queryClient.invalidateQueries({queryKey: ['productListAxios']});
}

const handleSortOrderEmit = (sort:string) => {
    pageOptionStore.product.SortOrder = sort;
    queryClient.invalidateQueries({queryKey: ['productListAxios']});
}

</script>
<template>
    <div class="h-full w-full">
        <div class="w-full p-6 min-h-[120px] bg-base-100 rounded-box">
            <h1 class="text-3xl font-bold">Role Management</h1>
        </div>
        <div class="mt-4 bg-base-100 shadow-lg rounded-box p-6">
            <div class="w-full flex gap-6 items-center">
                <div class="p-4 bg-base-300 flex-1 rounded-lg grid grid-cols-2">
                    <h1>Merchant :</h1>
                    <span class="text-primary">{{ roleList?.MerchantName }}</span>
                </div>
                <div class="p-4 bg-base-300 flex-1 rounded-lg grid grid-cols-2">
                    <h1>Branch :</h1>
                    <span class="text-primary">{{ roleList?.BranchName }}</span>
                </div>
                <button class="btn p-4" @click="() => dialogStore.form = true"><IconPlus/>Add New Role</button>
            </div>
            <div class="bg-base-300 mt-6 p-2 rounded-box">
                <div class="flex gap-2 items-center m-3">
                    <div class="flex items-center gap-2">
                        <h1>show</h1>
                        <select v-model="pageOptionStore.product.PageSize" className="select select-sm w-fit rounded-lg">
                            <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                        </select>
                    </div>
                    <TableSort :sort-item="SortOrderOption" @page-sort="handleSortOrderEmit">
                        <template #icon>    
                            {{ SortOrderOption.find((s) => s.value === pageOptionStore.product.SortOrder)?.title  }}
                            <IconSortAscendingLetters/>
                        </template>
                    </TableSort>
                </div>
                <Table 
                    :headers="header" 
                    :items="roleList?.Data" 
                    :is-error="isError"
                    :is-loading="isPending"
                    :item-per-page="pageOptionStore.role.PageSize" 
                    :current-page="pageOptionStore.role.CurrentPage"
                    :total-items="pageOptionStore.product.TotalRecords"
                    @page-changed="handleEmit"
                />
            </div>
        </div>
    </div>
    <FormDialog>
        <template #form>
            <div class="bg-base-100 text-base-content rounded-box px-6 py-8">
                <div class="w-full flex justify-center">
                    <span class="p-4 bg-base-300 w-full flex justify-center rounded-box text-2xl shadow-lg">Insert Role</span>
                </div>
                <form @submit.prevent="handleSubmit" class="text-base mx-auto mt-10">
                    <div class="flex flex-col gap-4 mb-4">
                        <label class="form-control w-full">
                            <div class="label">
                            <span class="label-text">Role Name</span>
                            </div>
                            <input
                            type="text"
                            required
                            v-model="form.RoleName"
                            placeholder="e.g., Admin"
                            class="input input-bordered w-full validator rounded-lg"
                            />
                        </label>
                        <label class="form-control w-full">
                            <div class="label">
                            <span class="label-text">Description</span>
                            </div>
                            <textarea
                            v-model="form.Description"
                            class="textarea textarea-bordered h-24 w-full rounded-lg"
                            placeholder="Enter Description here..."
                            ></textarea>
                        </label>
                    </div>
                    <div class="flex justify-center">
                        <button type="submit" class="btn btn-primary px-8" :disabled="createRoleMutation.isPending.value">Submit<span v-if="createRoleMutation.isPending.value" className="loading loading-spinner loading-xs ml-2"></span></button>
                    </div>
              </form>
            </div>
        </template>
    </FormDialog>
</template>