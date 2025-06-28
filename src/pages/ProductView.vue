<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, Data, DataBaseResponse } from '../types';
import { IconFilter2, IconPencil, IconPhotoOff, IconPlus, IconSortAscendingLetters, IconTrash, IconX } from '@tabler/icons-vue';
import apiClient from '../services/api/apiService';
import type { AxiosError, AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';
import type { ProductPayload, ProductResponse, ProductTable } from '../types/product';
import CurrencyInput from '../components/CurrencyInput.vue';
import type { BrandList, CategoryList, ProductStatusList, TaxTypeList } from '../types/dropdown';
import { useConfirmDialogStore } from '../store/confirmDialogStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useToastStore } from '../store/toastStore';
import { useProgressBarStore } from '../store/progressBarStore';
import TableSort from '../components/TableSort.vue';
import { productTableHeaders } from '../constants/table';
import { productPayloadForm } from '../constants/form';
import { productSortColumnOption, SortOrderOption } from '../constants/page_option';
import { extractPageOption } from '../services/utils/dataExtract';
import { usePageOptionStore } from '../store/sortingStore';
import TitleBarCard from '../components/TitleBarCard.vue';

const headers = productTableHeaders;
const dialogStore = useDialogStore();
const store = useConfirmDialogStore();
const progressBarStore = useProgressBarStore();
const pageOptionStore = usePageOptionStore();
const toastStore = useToastStore();
const myModalRef = ref<HTMLDialogElement | null>(null);
const mode = ref(1);
const form = ref({...productPayloadForm});
const sortColumnOption = productSortColumnOption;
const queryClient = useQueryClient();
  
//fetch product
const fetchProduct = async ():Promise<ProductTable[]> => {
        const apiUrl = '/product/list';
        const {SortColumn , SortOrder} = pageOptionStore.product;
        const params = {
          SortColumn ,SortOrder , PageSize:pageOptionStore.product.PageSize , Page: pageOptionStore.product.CurrentPage,
        }
        const res:AxiosResponse<baseResponse<DataBaseResponse<ProductResponse[]>>> = await apiClient.get(apiUrl , {params} );
        const productList:ProductTable[] = res?.data?.res_data?.ConstructData?.map((product) => ({
          ProductInfoId: product.ProductInfoId || null,
          ProductBarcode: product.ProductBarcode || '',
          ProductDescription: product.ProductDescription || '',
          ProductInfo:{
              ProductName: product.ProductName || '',
              ProductImagePath: product.ProductImagePath || null,
              ProductCategory: {
                ProductCategoryId: product.ProductCategory?.ProductCategoryId || null,
                ProductCategoryName: product.ProductCategory?.ProductCategoryName || 'no category'
              },
          } ,
          ProductCode: product.ProductCode || null,
          ProductStatus: {
            ProductStatusId: product.ProductStatus?.ProductStatusId || null,
            ProductStatusName: product.ProductStatus?.ProductStatusName || 'not availiable',
            ProductStatusDescription: product.ProductStatus?.ProductStatusDescription || 'not availiable',
          },
          ProductBrand: {
            ProductBrandId: product.ProductBrand?.ProductBrandId || null,
            ProductBrandName: product.ProductBrand?.ProductBrandName || 'not availiable'
          },
          ProductPrice: product.ProductPrice || 0,
          ProductTaxType:{
            ProductTaxTypeId: product.ProductTaxType?.ProductTaxTypeId || null,
            ProductTaxTypeName: product.ProductTaxType?.ProductTaxTypeName || 'not availiable',
            ProductTaxTypeDescription: product.ProductTaxType?.ProductTaxTypeDescription || 'not availiable'
          }, 
          ProductDiscountPercent: {
            ProductEnableDiscount: !!product.ProductEnableDiscountPercent,
            ProductDiscountValue: product.ProductDiscountPercent || 0,
          },
          ProductDiscountAmount: {
            ProductEnableDiscount: !!product.ProductEnableDiscountAmount,
            ProductDiscountValue: product.ProductDiscountAmount || 0,
          },
        })) || [];
        pageOptionStore.product = extractPageOption(res.data.res_data , pageOptionStore.product);
        return productList;
}

const {data: product , isPending: isTablePending , isError: isTableError } = useQuery<ProductTable[] , AxiosError>({
    queryKey: ['productListAxios'] ,
    queryFn: fetchProduct ,
})


//fetch dropdown list
const fetchCategoryList = async ():Promise<CategoryList[]> => {
  
  const apiUrl = '/dropdown/product/category';
  const res:AxiosResponse<baseResponse<Data<CategoryList[]>>> = await apiClient.get(apiUrl );
  const catDropdown:CategoryList[] = res.data.res_data.data;
    return catDropdown;
  }

const { data: categoryList , isPending: isCatPending } = useQuery<CategoryList[] , AxiosError>({
  queryKey: ['catListAxios'],
  queryFn: fetchCategoryList,
})

const fetchBrandList = async ():Promise<BrandList[]> => {
  
  const apiUrl = '/dropdown/product/brand';
  const res:AxiosResponse<baseResponse<Data<BrandList[]>>> = await apiClient.get(apiUrl );
  const brandDropdown:BrandList[] = res.data.res_data.data;
  return brandDropdown;
}

const { data: brandList , isPending: isBrandPending} = useQuery<BrandList[] , AxiosError>({
  queryKey: ['brandListAxios'],
  queryFn: fetchBrandList,
})

const fetchProductStatusList = async ():Promise<ProductStatusList[]> => {
  
  const apiUrl = '/dropdown/product/status';
  const res:AxiosResponse<baseResponse<Data<ProductStatusList[]>>> = await apiClient.get(apiUrl );
  const productStatusList:ProductStatusList[] = res.data.res_data.data;
  return productStatusList;
}

const { data: productStatusList , isPending: isProductStatusPending } = useQuery<ProductStatusList[] , AxiosError>({
  queryKey: ['productStatusListAxios'],
  queryFn: fetchProductStatusList,
})

const fetchTaxTypeList = async ():Promise<TaxTypeList[]> => {
  
  const apiUrl = '/dropdown/product/taxtypes';
  const res:AxiosResponse<baseResponse<Data<TaxTypeList[]>>> = await apiClient.get(apiUrl );
  const taxTypeList:TaxTypeList[] = res.data.res_data.data;
  return taxTypeList;
}

const { data: productTaxTypeList , isPending: isTaxTypePending } = useQuery<TaxTypeList[] , AxiosError>({
  queryKey: ['taxTypeListAxios'],
  queryFn: fetchTaxTypeList,
})

//post product
const createProduct = async (payload:ProductPayload) => {
  const apiUrl = '/product/insert';
  const res:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload );
  return res.data;
}

const createProductMutation = useMutation<baseResponse<void>,AxiosError,ProductPayload>({
  mutationFn: createProduct,
  onSuccess: (data) => {
    closeModal();
    dialogStore.openDialog(data.res_message , {status: 'success'});
    queryClient.invalidateQueries({queryKey: ['productListAxios']});
  },
  onError: (error) => {
    dialogStore.openDialog(error.message , {status: 'error'});
  }
});

const handleSubmit = () => {
  const {ProductCode , ProductName} = form.value;
  if(!ProductCode || !ProductName) {
    return toastStore.showToast('กรอกข้อมูลให้ครบถ้วน','warning');
  }
  switch(mode.value) {
    //create
    case 1: {
      createProductMutation.mutate(form.value);
      return;
    }
    //update
    case 2: {
      updateProductMutation.mutate(form.value);
      return; 
    }
    default: return;
  }
}

//update product
const updateProduct = async (payload:ProductPayload) => {
  const apiUrl = '/product/update';
  const res = await apiClient.patch(apiUrl , payload );
  return res.data;
}

const updateProductMutation = useMutation<baseResponse<void>,AxiosError,ProductPayload>({
  mutationFn: updateProduct,
  onSuccess: (data) => {
    toastStore.showToast(data.res_message , 'success');
    queryClient.invalidateQueries({queryKey: ['productListAxios']});
    closeModal();
  },
  onError: (error) => {
    toastStore.showToast(error.message , 'error');
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

const handleUpdateSubmit = () => {
  const ProductInfoId = form.value;
  if(!ProductInfoId) {
    return toastStore.showToast('ไม่สามารถ update ได้');
  }
  updateProductMutation.mutate(form.value);
}

const closeModal = () => {
  myModalRef.value?.close();
  resetForm();
}

const resetForm = () => {
  form.value = {...productPayloadForm};
}

const handleSelecterUpdate = <T extends keyof ProductPayload>(key: T, newValue: ProductPayload[T] ,productId:any) => {
  if (form.value) {
    form.value = {};
    form.value.ProductInfoId = productId;
    form.value[key] = newValue;
  }
  handleUpdateSubmit();
};

const openModal = (data?:ProductTable) => {
  if(data) {
    console.log(data)
    const payloadData:ProductPayload = {
      ProductInfoId: data.ProductInfoId || undefined,
      ProductName: data.ProductInfo.ProductName,
      ProductCode: data.ProductCode || undefined,
      ProductImagePath: data.ProductInfo?.ProductImagePath || undefined,
      ProductBrandId: data.ProductBrand?.ProductBrandId || undefined,
      ProductStatusId: data.ProductStatus?.ProductStatusId || undefined,
      ProductCategoryId: data.ProductInfo.ProductCategory?.ProductCategoryId || undefined,
      ProductPrice: data.ProductPrice,
      ProductBarcode: data.ProductBarcode,
      ProductTaxTypeId: data.ProductTaxType.ProductTaxTypeId || undefined,
      ProductEnableDiscountPercent: data.ProductDiscountPercent.ProductEnableDiscount === true ? 1 : 0,
      ProductDiscountPercent: data.ProductDiscountPercent.ProductDiscountValue,
      ProductEnableDiscountAmount: data.ProductDiscountAmount.ProductEnableDiscount === true ? 1 : 0,
      ProductDiscountAmount: data.ProductDiscountAmount.ProductDiscountValue,
      ProductDescription: data.ProductDescription,
    }
    form.value = payloadData;
    console.log('form',form.value);
    mode.value = 2;
    return myModalRef?.value?.showModal();
  }
  mode.value = 1;
  myModalRef?.value?.showModal();
};

const handleImageUpload = (event:any) => {
  const file = event.target.files[0];
  if (file) {
    // ในกรณีที่คุณต้องการเก็บชื่อไฟล์หรือ URL ชั่วคราว
    form.value.ProductImagePath = file;
    // หากต้องการส่งไฟล์จริงไปที่ backend คุณจะต้องเก็บ file object นี้ไว้ใน state อื่น
    // เช่น const selectedImageFile = ref(null);
    // selectedImageFile.value = file;
  } else {
    form.value.ProductImagePath = null;
  }
};

const enableDiscountPercentComputed = computed({
  get() {
    // เมื่ออ่านค่าจาก checkbox
    return form.value.ProductEnableDiscountPercent === 1;
  },
  set(newValue: boolean) {
    // เมื่อ checkbox ถูกเปลี่ยน (true/false) ให้แปลงเป็น 1/0
    form.value.ProductEnableDiscountPercent = newValue ? 1 : 0;
  }
});

const enableDiscountAmountComputed = computed({
  get() {
    // เมื่ออ่านค่าจาก checkbox
    return form.value.ProductEnableDiscountAmount === 1;
  },
  set(newValue: boolean) {
    // เมื่อ checkbox ถูกเปลี่ยน (true/false) ให้แปลงเป็น 1/0
    form.value.ProductEnableDiscountAmount = newValue ? 1 : 0;
  }
});

const handleEmit = (page:number) => {
  pageOptionStore.product.CurrentPage = page;
  queryClient.invalidateQueries({queryKey: ['productListAxios']});
}

const handleSortOrderEmit = (sort:string) => {
    pageOptionStore.product.SortOrder = sort;
    queryClient.invalidateQueries({queryKey: ['productListAxios']});
}

const handleSortColumnEmit = (sort:string) => {
    pageOptionStore.product.SortColumn = sort;
    queryClient.invalidateQueries({queryKey: ['productListAxios']});
}

watch(() => pageOptionStore.product.PageSize ,() => {
  pageOptionStore.product.CurrentPage = 1;
  queryClient.invalidateQueries({queryKey: ['productListAxios']});
})

</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">Product Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <div class="w-full h-full flex gap-4 p-4 items-center">
          <TitleBarCard title="Total Product" :text="pageOptionStore.product.TotalRecords" :is-pending="isTablePending"/>
          
        </div>
    </div>
    <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>show</h1>
                <select v-model="pageOptionStore.product.PageSize" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
            <TableSort :sort-item="sortColumnOption" @page-sort="handleSortColumnEmit">
                <template #icon>
                    {{ pageOptionStore.product.SortColumn }}  
                    <IconFilter2/>
                </template>
            </TableSort>
            <TableSort :sort-item="SortOrderOption" @page-sort="handleSortOrderEmit">
                <template #icon>    
                    {{ SortOrderOption.find((s) => s.value === pageOptionStore.product.SortOrder)?.title  }}
                    <IconSortAscendingLetters/>
                </template>
            </TableSort>
            <span class="w-full"></span>
            <button class="btn btn-primary btn-sm rounded-lg" @click="openModal()"><IconPlus class="size-5"/>Add Product</button>
        </div>
        <Table 
          :headers="headers" 
          :items="product" 
          :isLoading="isTablePending" 
          :isError="isTableError"
          :item-per-page="pageOptionStore.product.PageSize"
          :current-page="pageOptionStore.product.CurrentPage"
          :total-items="pageOptionStore.product.TotalRecords"
          @page-changed="handleEmit"
        >
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
            <template #ProductBrand="product">
              {{ product.item.ProductBrand.ProductBrandName }}
            </template>
            <template #ProductStatus="product">
              <select :value="product.item.ProductStatus.ProductStatusId" @change="e => handleSelecterUpdate('ProductStatusId', Number((e.target as HTMLSelectElement).value), product.item.ProductInfoId)" class="select select-bordered  min-w-[120px] rounded-lg bg-transparent border-none shadow-none p-1 focus:bg-base-100">
                <option v-for="(status,index) in productStatusList" :key="`status-${index}`" :value="status.ProductStatusId">{{ status.ProductStatusName }}</option>
              </select>
            </template>
            <template #ProductPrice="product">
              {{ product.item.ProductPrice }} ฿
            </template>
            <template #ProductTaxType="product">
              <select :value="product.item.ProductTaxType.ProductTaxTypeId" @change="e => handleSelecterUpdate('ProductTaxTypeId', Number((e.target as HTMLSelectElement).value), product.item.ProductInfoId)" class="select select-bordered min-w-[120px] rounded-lg bg-transparent border-none shadow-none p-1 focus:bg-base-100">
                <option v-for="(status,index) in productTaxTypeList" :key="`status-${index}`" :value="status.ProductTaxTypeId">{{ status.ProductTaxTypeName }}</option>
              </select>
            </template>
            <template #ProductDiscountPercent="product">
                <h1 v-if="product.item.ProductDiscountPercent.ProductEnableDiscount">{{ product.item.ProductDiscountPercent.ProductDiscountValue }}%</h1>
                <h1 v-else class="text-error">disabled</h1>
            </template>
            <template #ProductDiscountAmount="product">
                <h1 v-if="product.item.ProductDiscountAmount.ProductEnableDiscount">{{ product.item.ProductDiscountAmount.ProductDiscountValue }}฿</h1>
                <h1 v-else class="text-error">disabled</h1>
            </template>
            <template #actions="product">
                <button class="btn btn-circle btn-soft btn-xs bg-info text-info-content mr-2" @click="openModal(product.item)"><IconPencil class="size-4"/></button>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" @click="() => store.isOpen = true"><IconTrash class="size-4"/></button>
            </template>
        </Table>
    </div>

    <!-- add product dialog -->
    <dialog ref="myModalRef" className="modal">
      <div className="modal-box min-w-1/2">
        <button class="absolute top-2 right-2 btn btn-soft btn-circle btn-error size-8" @click="closeModal"><IconX class="text-error-content"/></button>
        <h3 v-if="mode === 1" className="font-semibold text-xl">Add New Product</h3>
        <h3 v-else-if="mode === 2" className="font-semibold text-xl">Update Product</h3>
        <div className="modal-action">
          <form @submit.prevent="handleSubmit()" class="text-base mx-auto">
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
          </form>
        </div>
      </div>
    </dialog>
</div>
</template>