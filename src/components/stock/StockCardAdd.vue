<script lang="ts" setup>
import { ref } from 'vue';
import { stockCardPayload, StockCardPayloadDataForm } from '../../constants/form';
import apiClient from '../../services/api/apiService';
import type { baseResponse, BranchList, Data, ProductList } from '../../types';
import type { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { IconPlus, IconTrash, IconX } from '@tabler/icons-vue';
import type { StockCardPayload, StockCardPayloadData } from '../../types/stock';
import { useDialogStore } from '../../store/dialogStore';
import { useProgressBarStore } from '../../store/progressBarStore';
import { useToastStore } from '../../store/toastStore';
import FormDialog from '../dialogs/FormDialog.vue';

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const dialogStore = useDialogStore();
const progress = useProgressBarStore();
const toast = useToastStore();
const form = ref({...stockCardPayload});
const productForm = ref({...StockCardPayloadDataForm});
const queryClient = useQueryClient();

const resetForm = () => {
  form.value = {...stockCardPayload};
  addList.value = [];
}

const CloseModal = () => {
  dialogStore.form = false;
  resetForm();
}

const handleSubmit = () => {
  handleCreateStockCard();
}

interface addList {
  id: number;
  data: StockCardPayloadData;
}
const addList = ref<addList[]>([]);
const handleAddItem = () => {
  addList.value.push({
    id: addList.value.length + 1,
    data: {...productForm.value}
  });
  productForm.value = {...StockCardPayloadDataForm};
}

const handleremoveThisItem = (index: number) => {
  addList.value.splice(index, 1);
}

// fetch Product List
const fetchProductList = async ():Promise<ProductList[]> => {
  const apiUrl = '/dropdown/products';
  const res:AxiosResponse<baseResponse<Data<ProductList[]>>> = await apiClient.get(apiUrl);
  return res.data.res_data.data
}

const {data: productList } = useQuery<ProductList[] ,AxiosError<baseResponse<void>>>({
  queryKey: ['productList'],
  queryFn: fetchProductList,
})

// fetch Branch List
const fetchBranchList = async ():Promise<BranchList[]> => {
    const apiUrl = '/dropdown/branchs';
    const params = {
      MerchantId: 1
    };
    const res:AxiosResponse<baseResponse<Data<BranchList[]>>> = await apiClient.get(apiUrl , {params});
    return res.data.res_data.data;
}

const {data: branchList , isPending: isBranchPending } = useQuery<BranchList[] ,AxiosError<baseResponse<void>>>({
  queryKey: ['branchList'],
  queryFn: fetchBranchList,
})

// handle create stock card
const handleCreateStockCard = async () => {
  if (!form.value.BranchId) {
    toast.showToast('ไม่ได้เลือกสาขา', 'warning');
    return;
  }
  if (addList.value.length === 0) {
    toast.showToast('ไม่มีข้อมูลที่จะส่ง', 'warning');
    return;
  }

  const payload: StockCardPayload = {
    AdminRoleId: 1,
    BranchId: form.value.BranchId,
    data: addList.value.map(item => item.data)
  };

  createStockCardMutation.mutate(payload);
}

// create Stock Card
const createStockCard = async (payload:StockCardPayload) => {
  const apiUrl = 'product/incoming/insert';
  const res:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl, payload);
  return res.data;
}

const createStockCardMutation = useMutation<baseResponse<void> ,AxiosError<baseResponse<void>>, StockCardPayload >({
  mutationFn: createStockCard,
  onSuccess: (data) => {
    dialogStore.openDialog( data?.res_message || 'unknown response' , { status: 'success' });
    queryClient.invalidateQueries({ queryKey: ['stockListAxios'] });
    queryClient.invalidateQueries({ queryKey: ['stockCardListAxios'] });
    CloseModal();
  },
  onError: (error) => {
    console.error('Error creating stock card:', error);
    dialogStore.openDialog( error.response?.data.res_message || error.message , { status: 'error' });
  },
  onMutate: () => {
    progress.loadingStart();
  },
  onSettled: () => {
    progress.loadingStop();
  }
});

</script>
<template>
    <FormDialog>
      <template #form>
        <div className="bg-base-100 rounded-box text-base-content min-w-2/3 overflow-hidden max-h-9/10 relative px-6 py-8">
          <button class="absolute top-2 right-2 btn btn-soft btn-circle btn-error size-8" @click="CloseModal"><IconX class="text-error-content"/></button>
          <div className="">
            <form @submit.prevent="handleSubmit" class="text-base mx-auto w-full p-4">
              <div class="flex items-start mb-4 ">
                <h3 className="font-semibold text-2xl text-nowrap">Add Stock</h3>
                <div class="w-full"></div>
                <div class="flex gap-2 items-center">
                  <span class="label-text">Store</span>
                  <select class="select select-bordered select-sm max-w-xs min-w-[150px] rounded-lg mx-2" v-model="form.BranchId">
                    <option :value="undefined" disabled ><span v-if="isBranchPending" class=" loading-spinner"></span><span v-else>Select Status</span></option>
                    <option v-for="(b,index) in branchList" :key="`product-${index}`" :value="b.BranchId">{{ b.BranchName }}</option>
                  </select>
                </div>
                <button class="btn btn-info btn-sm">Submit</button>
              </div>
              <div class="border-2 p-6 rounded-box mb-4">
                <div class="flex items-end gap-4 ">
                  <label class="form-control flex-1">
                    <div class="label">
                      <span class="label-text">Product</span>
                    </div>
                    <select class="select select-bordered w-full rounded-lg" v-model="productForm.ProductInfoId">
                      <option :value="undefined" disabled ><span v-if="isBranchPending" class=" loading-spinner"></span><span v-else>Select Status</span></option>
                      <option v-for="(p,index) in productList" :key="`product-${index}`" :value="p.ProductInfoId">{{ p.ProductName }}</option>
                    </select>
                  </label>
                  <label class="form-control flex-1">
                    <div class="label">
                        <span class="label-text">Amount</span>
                        <!-- <span class="label-text text-error">*</span> -->
                    </div>
                    <input type="number" v-model="productForm.NumberOfProducts" class="input appearance-none">
                  </label>
                  <label class="form-control flex-1">
                      <div class="label">
                        <span class="label-text">Cost</span>
                        <!-- <span class="label-text text-error">*</span> -->
                      </div>
                      <input type="number" v-model="productForm.ProductCost" class="input appearance-none">
                  </label>
                  <button type="button" class="btn btn-success" @click="handleAddItem"><IconPlus/></button>
                  </div>
                  <!-- <div class="form-control w-full mb-6 flex flex-col">
                    <div class="label">
                      <span class="label-text">Product Description</span>
                    </div>
                    <textarea
                    v-model="form."
                    class="textarea textarea-bordered h-24 w-full rounded-lg"
                    placeholder="Enter product ProductDescription here..."
                    ></textarea>
                  </div> -->
                </div>
                <div v-if="addList && addList.length > 0" class="w-full overflow-y-auto max-h-[400px]">
                  <div v-for="(list, index) in addList" :key="list.data.ProductInfoId" class="flex items-end gap-4 p-4 rounded-box bg-base-300 mb-4 shadow-lg">
                    <div class="flex items-end gap-4 w-full">
                      <label class="form-control w-full">
                        <div class="label">
                          <span class="label-text">Product</span>
                        </div>
                        <select class="select select-bordered w-full rounded-lg " v-model="list.data.ProductInfoId">
                          <option :value="undefined" disabled ><span v-if="isBranchPending" class=" loading-spinner"></span><span v-else>Select Status</span></option>
                          <option v-for="(p,index) in productList" :key="`product-${index}`" :value="p.ProductInfoId">{{ p.ProductName }}</option>
                        </select>
                      </label>
                      <label class="form-control w-full">
                        <div class="label">
                          <span class="label-text">Amount</span>
                        </div>
                        <input type="number" v-model="list.data.NumberOfProducts" class="input appearance-none ">
                      </label>
                      <label class="form-control w-full">
                        <div class="label">
                          <span class="label-text">Cost</span>
                        </div>
                        <input type="number" v-model="list.data.ProductCost" class="input appearance-none ">
                      </label>
                      <button type="button" class="btn btn-error btn-sm" @click="handleremoveThisItem(index)"><IconTrash/></button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </template>
        </FormDialog>
        <button class="modal-button btn btn-soft btn-primary" @click="() => dialogStore.form = true"><IconPlus/>Add Stock</button>
      </template>