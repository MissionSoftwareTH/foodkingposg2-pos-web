<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, Data, HeadersTable, POSPayload , POSResponse , POSTable } from '../types';
import { IconFilter2, IconPencil, IconPhotoOff, IconPlus, IconSortAscendingLetters, IconTrash, IconX } from '@tabler/icons-vue';
import { getApiHeaders } from '../services/api/apiHeader';
import apiClient from '../services/api/apiService';
import type { AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';
import type { BranchList } from '../types/dropdown';
import { formatDateTime } from '../services/utils';

const headers:HeadersTable[] = [
    {
        key: 'PosSystemId',
        title: 'Id',
    },
    {
        key: 'PosSystemName',
        title: 'Pos System Name',
    },
    {
        key: 'PosSystemKey',
        title: 'Pos System Key',
    },
    {
        key: 'BranchName',
        title: 'Branch Name',
    },
    {
        key: 'PosCreatedAt',
        title: 'Created At',
    },
    {
        key: 'PosUpdatedAt',
        title: 'Updated At',
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
const default_form:POSPayload = {
  BranchId: undefined,
  PosName: '',
  PosKey: '',
};
const form = ref<POSPayload>({
  BranchId: undefined,
  PosName: '',
  PosKey: '',
});
const items = ref<POSTable[]>();
const branchList = ref<BranchList[]>();

const resetForm = () => {
  form.value = {...default_form};
}

const closeModal = () => {
  resetForm();
  myModalRef?.value?.close();
}

const openModal = async () => {
  if (myModalRef.value) {
    isLoading.value = true;
    await getBranchList();
    myModalRef.value.showModal();
    isLoading.value = false;
  }
};

const getBranchList = async () => {
  try {
    const headers = getApiHeaders();
    const apiUrl = '/dropdown/branchs';
    const params = {
      MerchantId: 1
    };
    const res:AxiosResponse<baseResponse<Data<BranchList[]>>> = await apiClient.get(apiUrl , {headers,params});
    branchList.value = res?.data?.res_data?.data || [];
  } catch (error:any) {
    console.error(error);
    dialogStore.openDialog(error?.response?.data?.res_message || error , {status: 'error'});
  }
}
const selectedOption = ref<string | number>(5);
const getPOS = async () => {
    try {
        const headers = getApiHeaders();
        const apiUrl = '/branchs/pos/list';
        const res:AxiosResponse<baseResponse<Data<POSResponse[]>>> = await apiClient.get(apiUrl , {headers});
        items.value = res?.data?.res_data?.data?.flatMap((data) => 
          data?.PosSystem?.map((pos) => ({
            BranchId: data.BranchId,
            BranchName: data.BranchName,
            PosSystemId: pos?.PosSystemId,
            PosSystemName: pos?.PosSystemName || 'not availiable',
            PosSystemKey: pos?.PosSystemKey || 'not availiable',
            PosCreatedAt: formatDateTime(pos?.PosCreatedAt) || '',
            PosUpdatedAt: formatDateTime(pos?.PosUpdatedAt) || '',
          })) || []
        )
        console.log(items.value); 
        
    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog(error?.res?.data?.res_message || error, {status: 'error'});
    }
}
const addPOS = async () => {
    try {
        isLoading.value = true;
        const headers = getApiHeaders();
        const payload = form.value;
        const apiUrl = '/branchs/pos/insert';
        const res:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload , {headers});
        dialogStore.openDialog(res?.data?.res_message || 'unknown message', {status: 'success'});
        resetForm();
        getPOS();

    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog(error?.res?.data?.res_message || 'unknown message', {status: 'error'});
    } finally {
        isLoading.value = false;
        myModalRef.value?.close();
    }
}
onMounted(() => {
    getPOS();
})
</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">POS Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <div class="w-full h-full flex justify-between p-4 items-center">
            <div class="">
                <div class="rounded-lg bg-base-100/50 backdrop-blur-lg p-4">
                    POS of this merchant
                </div>
            </div>
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
                <ul class="dropdown-content menu bg-base-300 shadow-lg rounded-lg gap-2">
                    <li v-for="item in ['Product Name','Product Code']" :key="item">
                        <input type="radio" name="product_filter" :value="item" :aria-label="item" class="btn btn-sm text-nowrap rounded-lg">
                    </li>
                </ul>
            </div>
            <div class="dropdown">
                <button class="btn rounded-lg btn-sm p-2 btn-ghost ">
                    <IconSortAscendingLetters/>
                </button>
                <ul class="dropdown-content menu bg-base-300 shadow-lg rounded-lg gap-2">
                    <li v-for="item in ['ASC','DESC']" :key="item">
                        <input type="radio" name="product_filter" id="" :value="item" :aria-label="item" class="btn btn-sm text-nowrap rounded-lg">
                    </li>
                </ul>
            </div>
            <span class="w-full"></span>
            <button class="btn btn-primary btn-sm rounded-lg" @click="openModal"><IconPlus class="size-5"/>Add POS</button>
        </div>
        <Table :headers="headers" :items="items" class="rounded-xl shadow-lg w-full h-full">
            <template #ProductInfo="product">
               <div class="flex items-center gap-4">
                    <div class="size-20 bg-base-100 rounded-lg overflow-hidden">
                        <img v-if="product.item.ProductInfo.ProductImagePath" :src="product.item.ProductInfo.ProductImagePath" :alt="product.item.ProductInfo.ProductName" class="w-full h-full object-cover object-center">
                        <IconPhotoOff v-else class="w-full h-full text-base-300 scale-70"/>
                    </div>
                    <div class="">
                        <h1>{{ product.item.ProductInfo.ProductName }}</h1>
                        <h2 class="text-base-content/50 text-sm">{{product.item.ProductInfo.ProductCategory.ProductCategoryName}}</h2>
                    </div>
               </div> 
            </template>
            <template #ProductStatus="product">
              {{ product.item.ProductStatus.ProductStatusName }}
            </template>
            <template #ProductPrice="product">
              {{ product.item.ProductPrice }} ฿
            </template>
            <template #ProductCost="product">
              {{ product.item.ProductCost }} ฿
            </template>
            <template #ProductDiscountPercent="product">
                <h1 v-if="product.item.ProductDiscountPercent.ProductEnableDiscount">{{ product.item.ProductDiscountPercent.ProductDiscountValue }}%</h1>
                <h1 v-else class="text-error">disabled</h1>
            </template>
            <template #ProductDiscountAmount="product">
                <h1 v-if="product.item.ProductDiscountAmount.ProductEnableDiscount">{{ product.item.ProductDiscountAmount.ProductDiscountValue }}฿</h1>
                <h1 v-else class="text-error">disabled</h1>
            </template>
            <template #actions>
                <button class="btn btn-circle btn-soft btn-xs bg-info text-info-content mr-2" ><IconPencil class="size-4"/></button>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" ><IconTrash class="size-4"/></button>
            </template>
        </Table>
    </div>
    <!-- add product dialog -->
    <dialog ref="myModalRef" className="modal">
        <div className="modal-box min-w-1/2">
            <button class="absolute top-2 right-2 btn btn-soft btn-circle btn-error size-8" @click="closeModal"><IconX class="text-error-content"/></button>
            <h3 className="font-semibold text-xl">Add New POS</h3>
            <div className="modal-action">
              <form @submit.prevent="addPOS" class="text-base mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <label class="form-control w-full">
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
                  <button type="submit" class="btn btn-primary px-8" :disabled="isLoading">Add POS<span v-if="isLoading" className="loading loading-spinner loading-xs ml-2"></span></button>
                </div>
              </form>
            </div>
        </div>
    </dialog>
</div>
</template>