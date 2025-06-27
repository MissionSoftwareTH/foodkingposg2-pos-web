<script setup lang="ts">
import { ref, watch } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, Data , DataBaseResponse, POSPayload , POSResponse , POSTable } from '../types';
import { IconFilter2, IconPencil, IconPlus, IconSortAscendingLetters, IconTrash, IconX } from '@tabler/icons-vue';
import apiClient from '../services/api/apiService';
import type { AxiosError, AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';
import type { BranchList } from '../types/dropdown';
import { formatDateTime } from '../services/utils';
import { useProgressBarStore } from '../store/progressBarStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useToastStore } from '../store/toastStore';
import { posTableHeaders } from '../constants/table';
import { posPayloadForm } from '../constants/form';
import { posSortColumnOption, SortOrderOption } from '../constants/page_option';
import TableSort from '../components/TableSort.vue';
import { extractPageOption } from '../services/utils/dataExtract';
import { usePageOptionStore } from '../store/sortingStore';
import TitleBarCard from '../components/TitleBarCard.vue';

const headers = posTableHeaders;
const dialogStore = useDialogStore();
const myModalRef = ref<HTMLDialogElement | null>(null);
const mode = ref<number>(1);
const progressBarStore = useProgressBarStore();
const queryClient = useQueryClient();
const toastStore = useToastStore();
const form = ref({...posPayloadForm});
const pageOptionStore = usePageOptionStore();
const sortColumnOption = posSortColumnOption;

const resetForm = () => {
  form.value = {...posPayloadForm};
  console.log(form.value);
  console.log(posPayloadForm);
}

const closeModal = () => {
  resetForm();
  myModalRef?.value?.close();
}

const openModal = (data?:POSTable) => {
    if(data) {
        mode.value = 2;
        form.value = {
            PosSystemsId: data.PosSystemId,
            PosName: data.PosSystemName,
            PosKey: data.PosSystemKey,
        };
        return myModalRef?.value?.showModal();
    }
    mode.value = 1;
    myModalRef?.value?.showModal();
};

//fetch POS
const fetchPOSList = async (): Promise<POSTable[]> => {
  const {SortColumn , SortOrder} = pageOptionStore.pos;
  const params = {
    SortColumn ,SortOrder , PageSize:pageOptionStore.pos.PageSize , Page: pageOptionStore.pos.CurrentPage,
  }
  const apiUrl = '/branchs/pos/list';
  const res:AxiosResponse<baseResponse<DataBaseResponse<POSResponse[]>>> = await apiClient.get(apiUrl , {params});
  const resData:POSTable[] = res?.data?.res_data?.ConstructData?.flatMap((data) => 
          data?.PosSystem?.map((pos) => ({
            BranchId: data.BranchId,
            BranchName: data.BranchName,
            PosSystemId: pos?.PosSystemId,
            PosSystemName: pos?.PosSystemName || 'not availiable',
            PosSystemKey: pos?.PosSystemKey || 'not availiable',
            PosCreatedAt: formatDateTime(pos?.PosCreatedAt) || '',
            PosUpdatedAt: formatDateTime(pos?.PosUpdatedAt) || '',
          })) || []
        ) || [];
  pageOptionStore.pos = extractPageOption(res.data.res_data , pageOptionStore.pos)
  return resData;
}

const {data: items , isPending , isError } = useQuery<POSTable[] , AxiosError<baseResponse<void>>>({
  queryKey: ['POSList'],
  queryFn: fetchPOSList ,
});

// fetch BranchList
const fetchBranchList = async ():Promise<BranchList[]> => {
    const apiUrl = '/dropdown/branchs';
    const params = {
      MerchantId: 1
    };
    const res:AxiosResponse<baseResponse<Data<BranchList[]>>> = await apiClient.get(apiUrl , {params});
    return res.data.res_data.data;
}

const {data: branchList } = useQuery<BranchList[] ,AxiosError<baseResponse<void>>>({
  queryKey: ['branchList'],
  queryFn: fetchBranchList,
})

//create POS
const PostPOS = async (payload:POSPayload) => {
  const apiUrl = '/branchs/pos/insert';
  const res:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload );
  return res.data;
}

const postPOSMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , POSPayload>({
  mutationFn:PostPOS,
  onSuccess: (data) => {
    dialogStore.openDialog(data?.res_message, {status: 'success'});
    queryClient.invalidateQueries({queryKey: ['branchListAxios']});
    queryClient.invalidateQueries({queryKey: ['POSList']});
    closeModal();
  },
  onError: (error) => {
    console.error(error);
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

//update POS
const UpdatePOS = async (payload:POSPayload) => {
  const apiUrl = '/branchs/pos/update';
  const res:AxiosResponse<baseResponse<void>> = await apiClient.patch(apiUrl , payload );
  return res.data;
}

const updatePOSMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , POSPayload>({
  mutationFn:UpdatePOS,
  onSuccess: (data) => {
    toastStore.showToast(data?.res_message,'success');
    queryClient.invalidateQueries({queryKey: ['POSList']});
    closeModal();
  },
  onError: (error) => {
    console.error(error);
    toastStore.showToast(error.response?.data.res_message || error.message,'error');
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

//handle
const handleSubmit = () => {
    const { PosKey , PosName , PosSystemsId } = form.value;
    console.log(PosKey , PosName , PosSystemsId)
    switch(mode.value) {
    //create
    case 1: {
        if(!PosName || !PosKey) {
        return toastStore.showToast('ใส่ข้อมูลไม่ครบถ้วน' , 'warning');
        }
        postPOSMutation.mutate(form.value);
        return;
    }
    //update
    case 2: {
        if(!PosSystemsId) {
        return toastStore.showToast('ใส่ข้อมูลไม่ครบถ้วน' , 'warning');
        }
        updatePOSMutation.mutate(form.value);
        return; 
    }
    default: return;
  }
}

const handleEmit = (page:number) => {
  pageOptionStore.pos.CurrentPage = page;
  queryClient.invalidateQueries({queryKey: ['POSList']});
}

const handleSortOrderEmit = (sort:string) => {
    pageOptionStore.pos.SortOrder = sort;
    queryClient.invalidateQueries({queryKey: ['POSList']});
}

const handleSortColumnEmit = (sort:string) => {
    pageOptionStore.pos.SortColumn = sort;
    queryClient.invalidateQueries({queryKey: ['POSList']});
}

watch(() => pageOptionStore.pos.PageSize ,() => {
  pageOptionStore.pos.CurrentPage = 1;
  queryClient.invalidateQueries({queryKey: ['POSList']});
})
</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">POS Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <div class="w-full h-full flex gap-4 p-4 items-center">
          <TitleBarCard title="Total POS" :text="pageOptionStore.pos.TotalRecords" :is-pending="isPending"/>
        </div>
    </div>
    <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>show</h1>
                <select v-model="pageOptionStore.pos.PageSize" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
            <TableSort :sort-item="sortColumnOption" @page-sort="handleSortColumnEmit">
                <template #icon>
                    {{ pageOptionStore.pos.SortColumn }}  
                    <IconFilter2/>
                </template>
            </TableSort>
            <TableSort :sort-item="SortOrderOption" @page-sort="handleSortOrderEmit">
                <template #icon>    
                    {{ SortOrderOption.find((s) => s.value === pageOptionStore.pos.SortOrder)?.title  }}
                    <IconSortAscendingLetters/>
                </template>
            </TableSort>
            <span class="w-full"></span>
            <button class="btn btn-primary btn-sm rounded-lg" @click="openModal()"><IconPlus class="size-5"/>Add POS</button>
        </div>
        <Table 
        :headers="headers" 
        :items="items" 
        :is-loading="isPending" 
        :is-error="isError"
        :current-page="pageOptionStore.pos.CurrentPage"
        :item-per-page="pageOptionStore.pos.PageSize"
        :total-items="pageOptionStore.pos.TotalRecords"
        @page-changed="handleEmit"
        >
            <template #actions="data">
                <button class="btn btn-circle btn-soft btn-xs bg-info text-info-content mr-2" @click="openModal(data.item)"><IconPencil class="size-4"/></button>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" ><IconTrash class="size-4"/></button>
            </template>
        </Table>
    </div>
    <!-- add product dialog -->
    <dialog ref="myModalRef" className="modal">
        <div className="modal-box min-w-1/2">
            <button class="absolute top-2 right-2 btn btn-soft btn-circle btn-error size-8" @click="closeModal()"><IconX class="text-error-content"/></button>
            <h3 v-if="mode === 1" className="font-semibold text-xl">Add New POS</h3>
            <h3 v-else-if="mode === 2" className="font-semibold text-xl">Update POS</h3>
            <div className="modal-action">
              <form @submit.prevent="handleSubmit" class="text-base mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <label class="form-control w-full" v-if="mode === 1">
                    <div class="label">
                      <span class="label-text">Brand</span>
                    </div>
                    <select v-model="form.BranchId" class="select select-bordered w-full rounded-lg">
                      <option :value="undefined" disabled>Select Brand</option>
                      <option v-for="(branch,index) in branchList" :key="`branch-${index}`" :value="branch.BranchId">{{ branch.BranchName }}</option>
                    </select>
                  </label>
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">POS Name</span>
                    </div>
                    <input
                      type="text"
                      required
                      v-model="form.PosName"
                      placeholder="e.g., Kitchen"
                      class="input input-bordered w-full validator rounded-lg"
                    />
                  </label>
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">POS Key</span>
                    </div>
                    <input
                      type="text"
                      required
                      v-model="form.PosKey"
                      placeholder="e.g., ABC123"
                      class="input input-bordered w-full validator rounded-lg"
                    />
                  </label>
                </div>
                <div class="flex justify-center">
                  <button type="submit" class="btn btn-primary px-8" :disabled="postPOSMutation.isPending.value || updatePOSMutation.isPending.value">Submit<span v-if="postPOSMutation.isPending.value || updatePOSMutation.isPending.value" className="loading loading-spinner loading-xs ml-2"></span></button>
                </div>
              </form>
            </div>
        </div>
    </dialog>
</div>
</template>