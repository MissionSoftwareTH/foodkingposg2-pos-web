<script lang="ts" setup>
import { ref } from 'vue';
import { stockCardPayload } from '../../constants/form';
import apiClient from '../../services/api/apiService';
import type { baseResponse, BranchList, Data } from '../../types';
import type { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/vue-query';
import { IconPlus, IconX } from '@tabler/icons-vue';
import type { StockCardPayloadData } from '../../types/stock';


defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const myModalRef = ref<HTMLDialogElement | null>(null);

const form = ref({...stockCardPayload});
const productForm = ref<StockCardPayloadData>({
  NumberOfProduct: 0,
  ProductInfoId: 0,
  ProductCost: 0
});

const resetForm = () => {
  form.value = {...stockCardPayload};
}

const CloseModal = () => {
  myModalRef.value?.close();
  resetForm();
}

const handleSubmit = () => {
  console.log('submitted');
}  

// const fetchProductList = async () => {
//   const apiUrl = '/product/status/list';
//   const res = await apiClient.get(apiUrl);
// }

// fetch BranchList
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


</script>
<template>
    <dialog ref="myModalRef" className="modal">
        <div className="modal-box min-w-2/3">
            <button class="absolute top-2 right-2 btn btn-soft btn-circle btn-error size-8" @click="CloseModal"><IconX class="text-error-content"/></button>
            <div className="modal-action">
              <form @submit.prevent="handleSubmit" class="text-base mx-auto">
                <div class="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-xl">Add New Product</h3>
                  <button class="btn btn-info btn-sm">Submit</button>
                </div>
                <div class="flex items-end gap-4">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Product</span>
                    </div>
                    <select class="select select-bordered w-full rounded-lg">
                      <option :value="undefined" disabled ><span v-if="isBranchPending" class=" loading-spinner"></span><span v-else>Select Status</span></option>
                      <option v-for="(b,index) in branchList" :key="`product-${index}`" :value="b.BranchId">{{ b.BranchName }}</option>
                    </select>
                  </label>
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Branch</span>
                    </div>
                    <select class="select select-bordered w-full rounded-lg">
                      <option :value="undefined" disabled ><span v-if="isBranchPending" class=" loading-spinner"></span><span v-else>Select Status</span></option>
                      <option v-for="(b,index) in branchList" :key="`product-${index}`" :value="b.BranchId">{{ b.BranchName }}</option>
                    </select>
                  </label>
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Amount</span>
                      <!-- <span class="label-text text-error">*</span> -->
                    </div>                  
                    <input type="number" v-model="productForm.NumberOfProduct" class="input text-center appearance-none">
                  </label>
                  <button class="btn btn-success"><IconPlus/></button>
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
              </form>
              <!-- <form @submit.prevent="handleSubmit" class="text-base mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Product Code</span>
                      <span class="label-text text-error">*</span>
                    </div>
                    <input
                      type="text"
                      required
                      v-model="form.ProductCode"
                      placeholder="e.g., P001"
                      class="input input-bordered w-full validator rounded-lg"
                    />
                  </label>
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Product Name</span>
                      <span class="label-text text-error">*</span>
                    </div>
                    <input
                      type="text"
                      required
                      v-model="form.ProductName"
                      placeholder="e.g., Fried Chicken"
                      class="input input-bordered w-full validator rounded-lg"
                    />
                  </label>
                </div>

                <div class="form-control w-full mb-4">
                  <div class="label">
                    <span class="label-text">Product Image</span>
                  </div>
                  <input
                    type="file"
                    @change="handleImageUpload"
                    class="file-input file-input-bordered w-full"
                    accept="image/*"
                  />
                  <div v-if="form.ProductImagePath" class="text-base text-gray-500 mt-2">
                    Selected: {{ form.ProductImagePath }}
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Brand</span>
                    </div>
                    <select v-model="form.ProductBrandId" class="select select-bordered w-full rounded-lg">
                      <option :value="undefined" disabled ><span v-if="isBrandPending" class=" loading-spinner"></span><span v-else>Select Brand</span></option>
                      <option v-for="(brand,index) in brandList" :key="`brand-${index}`" :value="brand.ProductBrandId">{{ brand.ProductBrandName }}</option>
                    </select>
                  </label>

                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Category</span>
                    </div>
                    <select v-model="form.ProductCategoryId" class="select select-bordered w-full rounded-lg">
                      <option :value="undefined" disabled ><span v-if="isCatPending" class=" loading-spinner"></span><span v-else>Select Category</span></option>
                      <option v-for="(cat,index) in categoryList" :key="`cat-${index}`" :value="cat.ProductCategoryId">{{ cat.ProductCategoryName }}</option>
                    </select>
                  </label>

                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Status</span>
                    </div>
                    <select v-model="form.ProductStatusId" class="select select-bordered w-full rounded-lg">
                      <option :value="undefined" disabled ><span v-if="isProductStatusPending" class=" loading-spinner"></span><span v-else>Select Status</span></option>
                      <option v-for="(status,index) in productStatusList" :key="`status-${index}`" :value="status.ProductStatusId">{{ status.ProductStatusName }}</option>
                    </select>
                  </label>

                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">VAT Type</span>
                    </div>
                    <select v-model="form.ProductTaxTypeId" class="select select-bordered w-full rounded-lg">
                      <option :value="undefined" disabled ><span v-if="isTaxTypePending" class=" loading-spinner"></span><span v-else>Select VAT Type</span></option>
                      <option v-for="(vat,index) in productTaxTypeList" :key="`vat-${index}`" :value="vat.ProductTaxTypeId">{{ vat.ProductTaxTypeName }}</option>
                    </select>
                  </label>
                </div>

                <div class="form-control w-full mb-4">
                  <div class="label">
                    <span class="label-text">Barcode</span>
                  </div>
                  <input
                    type="text"
                    v-model="form.ProductBarcode"
                    placeholder="e.g., 1234567890"
                    class="input input-bordered w-full rounded-lg"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Product Price</span>
                    </div>
                    <CurrencyInput v-model="form.ProductPrice"/>
                  </label>
                </div>

                <div class="flex items-center gap-4 mb-4">
                  <label class="form-control flex-1">
                    <div class="label cursor-pointer">
                      <input
                        type="checkbox"
                        v-model="enableDiscountPercentComputed"
                        class="checkbox checkbox-primary mr-2"
                      />
                      <span class="label-text">Percent Discount</span>
                    </div>
                  </label>
                  <div class="flex-3">
                    <CurrencyInput v-model="form.ProductDiscountPercent" symbol-value="%" class="max-w-xs" :disabled="!form.ProductEnableDiscountPercent"/>
                  </div>
                </div>

                <div class="flex items-center gap-4 mb-4">
                  <label class="form-control flex-1">
                    <div class="label cursor-pointer">
                      <input
                        type="checkbox"
                        v-model="enableDiscountAmountComputed"
                        class="checkbox checkbox-primary mr-2 "
                      />
                      <span class="label-text">Amount Discount</span>
                    </div>
                  </label>
                  <div class="flex-3">
                    <CurrencyInput v-model="form.ProductDiscountAmount" class="max-w-xs" :disabled="!form.ProductEnableDiscountAmount"/>
                  </div>
                </div>

                <div class="form-control w-full mb-6 flex flex-col">
                  <div class="label">
                    <span class="label-text">Product Description</span>
                  </div>
                  <textarea
                    v-model="form.ProductDescription"
                    class="textarea textarea-bordered h-24 w-full rounded-lg"
                    placeholder="Enter product ProductDescription here..."
                  ></textarea>
                </div>

                <div class="flex justify-center">
                  <button type="submit" class="btn btn-primary px-8" :disabled="createProductMutation.isPending.value || updateProductMutation.isPending.value">Submit<span v-if="createProductMutation.isPending.value || updateProductMutation.isPending.value" className="loading loading-spinner loading-xs ml-2"></span></button>
                </div>
              </form> -->
            </div>
        </div>
    </dialog>
    <button class="modal-button btn btn-soft btn-primary" @click="myModalRef?.showModal()">open</button>
</template>