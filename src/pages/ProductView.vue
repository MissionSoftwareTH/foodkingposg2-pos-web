<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, Data, HeadersTable } from '../types';
import { IconFilter2, IconPencil, IconPhotoOff, IconPlus, IconSortAscendingLetters, IconTrash, IconX } from '@tabler/icons-vue';
import { getApiHeaders } from '../services/api/apiHeader';
import apiClient from '../services/api/apiService';
import type { AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';
import type { ProductPayload, ProductResponse, ProductTable } from '../types/product';
import CurrencyInput from '../components/CurrencyInput.vue';
import type { BrandList, CategoryList, ProductStatusList } from '../types/dropdown';

const headers:HeadersTable[] = [
    {
        key: 'ProductInfo',
        title: 'Product',
        type: 'actions',
    },
    {
        key: 'ProductCode',
        title: 'Product Code',
    },
    {
        key: 'ProductStatus',
        title: 'Status',
        type: 'actions',
    },
    {
        key: 'ProductPrice',
        title: 'Price',
        type: 'actions',
    },
    {
        key: 'ProductCost',
        title: 'Cost',
        type: 'actions',
    },
    {
        key: 'ProductVatType',
        title: 'Vat Type',
    },
    {
        key: 'ProductDiscountPercent',
        title: 'Percent Discount',
        type: 'actions',
    },
    {
        key: 'ProductDiscountAmount',
        title: 'Amount Discount',
        type: 'actions',
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
const default_form:ProductPayload = {
    ProductName: '',
    ProductCode: '',
    ProductImagePath: null,
    ProductBrandId: undefined,
    ProductStatusId: undefined,
    ProductCategoryId: undefined,
    ProductPrice: 0,
    ProductCost: 0,
    ProductBarcode: '',
    ProductVatType: null,
    ProductEnableDiscountPercent: false,
    ProductDiscountPercent: 0,
    ProductEnableDiscountAmount: false,
    ProductDiscountAmount: 0,
    ProductDescription: '',
};
const form = ref<ProductPayload>({
    ProductName: '',
    ProductCode: '',
    ProductImagePath: null,
    ProductBrandId: undefined,
    ProductStatusId: undefined,
    ProductCategoryId: undefined,
    ProductPrice: 0,
    ProductCost: 0,
    ProductBarcode: '',
    ProductVatType: null,
    ProductEnableDiscountPercent: false,
    ProductDiscountPercent: 0,
    ProductEnableDiscountAmount: false,
    ProductDiscountAmount: 0,
    ProductDescription: '',
});
const items = ref<ProductTable[]>([]);
const categoryList = ref<CategoryList[]>();
const brandList = ref<BrandList[]>();
const productStatusList = ref<ProductStatusList[]>();

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
    await getCategoryList();
    await getBrandList();
    await getProductStatusList();
    myModalRef.value.showModal();
    isLoading.value = false;
  }
};

const getCategoryList = async () => {
  try {
    const headers = getApiHeaders();
    const apiUrl = '/dropdown/product/category';
    const res:AxiosResponse<baseResponse<Data<CategoryList[]>>> = await apiClient.get(apiUrl , {headers});
    categoryList.value = res?.data?.res_data?.data || [];
  } catch (error:any) {
    console.error();
    dialogStore.openDialog(error?.response?.data?.res_message || error , {status: 'error'});
  }
}

const getBrandList = async () => {
  try {
    const headers = getApiHeaders();
    const apiUrl = '/dropdown/product/brand';
    const res:AxiosResponse<baseResponse<Data<BrandList[]>>> = await apiClient.get(apiUrl , {headers});
    brandList.value = res?.data?.res_data?.data || [];
  } catch (error:any) {
    console.error();
    dialogStore.openDialog(error?.response?.data?.res_message || error , {status: 'error'});
  }
}

const getProductStatusList = async () => {
  try {
    const headers = getApiHeaders();
    const apiUrl = '/dropdown/product/status';
    const res:AxiosResponse<baseResponse<Data<ProductStatusList[]>>> = await apiClient.get(apiUrl , {headers});
    productStatusList.value = res?.data?.res_data?.data || [];
  } catch (error:any) {
    console.error();
    dialogStore.openDialog(error?.response?.data?.res_message || error , {status: 'error'});
  }
}

const selectedOption = ref<string | number>(5);

const getProduct = async () => {
    try {
        const headers = getApiHeaders();
        const apiUrl = '/product/list';
        const res:AxiosResponse<baseResponse<Data<ProductResponse[]>>> = await apiClient.get(apiUrl , {headers});
        items.value = res?.data?.res_data?.data?.map((product) => ({
          ProductInfo:{
              ProductName: product.ProductName || '',
              ProductImagePath: product.ProductImagePath || null,
              ProductCategory: {
                ProductCategoryId: product.ProductCategory?.ProductCategoryId,
                ProductCategoryName: product.ProductCategory?.ProductCategoryName || 'no category'
              },
          } ,
          ProductCode: product.ProductCode || null,
          ProductStatus: {
            ProductStatusId: product.ProductStatus?.ProductStatusId,
            ProductStatusName: product.ProductStatus?.ProductStatusName || 'not availiable',
            ProductStatusDescription: product.ProductStatus?.ProductStatusDescription || 'not availiable',
          },
          ProductBrand: product.ProductBrand || null,
          ProductPrice: product.ProductPrice || 0,
          ProductCost: product.ProductCost || 0,
          ProductVatType:product.ProductVatType || 'not availiable',
          ProductDiscountPercent: {
            ProductEnableDiscount: product.ProductEnableDiscountPercent || false,
            ProductDiscountValue: product.ProductDiscountPercent || 0,
          },
          ProductDiscountAmount: {
            ProductEnableDiscount: product.ProductEnableDiscountAmount || false,
            ProductDiscountValue: product.ProductDiscountAmount || 0,
          },
        })) || [];
        console.log(items.value); 
        
    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog(error?.res?.data?.res_message || error, {status: 'error'});
    }
}

const addItem = async () => {
    try {
        isLoading.value = true;
        const headers = getApiHeaders();
        const payload = form.value;
        const apiUrl = '/product/insert';
        const res:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload , {headers});
        dialogStore.openDialog(res?.data?.res_message || 'unknown message', {status: 'success'});
        resetForm();
        getProduct();

    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog(error?.res?.data?.res_message || 'unknown message', {status: 'error'});
    } finally {
        isLoading.value = false;
        myModalRef.value?.close();
    }
}


const handleImageUpload = (event:any) => {
  const file = event.target.files[0];
  if (file) {
    // ในกรณีที่คุณต้องการเก็บชื่อไฟล์หรือ URL ชั่วคราว
    form.value.ProductImagePath = file;
    // หากต้องการส่งไฟล์จริงไปที่ backend คุณจะต้องเก็บ file object นี้ไว้ใน state อื่น
    // เช่น const selectedImageFile = ref(null);
    // selectedImageFile.value = file;
    console.log('Selected file:', file);
  } else {
    form.value.ProductImagePath = null;
  }
};

onMounted(() => {
    getProduct();
})

</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-2xl font-bold">Product Management</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <div class="w-full h-full flex justify-between p-4 items-center">
            <div class="">
                <div class="rounded-box bg-base-100/50 backdrop-blur-lg p-4">
                    Product for this merchant
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
                        <input type="radio" name="product_filter" id="" :value="item" :aria-label="item" class="btn btn-sm text-nowrap rounded-lg">
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
            <button class="btn btn-primary btn-sm rounded-lg" @click="openModal"><IconPlus class="size-5"/>Add Item</button>
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
                        <h2 class="text-base-content/50 text-xs">{{product.item.ProductInfo.ProductCategory.ProductCategoryName}}</h2>
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
            <h3 className="font-bold text-xl">Add New Product</h3>
            <div className="modal-action">
              <form @submit.prevent="addItem" class="text-sm mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Product Code</span>
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
                  <div v-if="form.ProductImagePath" class="text-sm text-gray-500 mt-2">
                    Selected: {{ form.ProductImagePath }}
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Brand</span>
                    </div>
                    <select v-model="form.ProductBrandId" class="select select-bordered w-full rounded-lg">
                      <option value="" disabled>Select Brand</option>
                      <option v-for="(brand,index) in brandList" :key="`brand-${index}`" :value="brand.ProductBrandId">{{ brand.ProductBrandName }}</option>
                    </select>
                  </label>

                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Category</span>
                    </div>
                    <select v-model="form.ProductCategoryId" class="select select-bordered w-full rounded-lg">
                      <option value="">Select Category</option>
                      <option v-for="(cat,index) in categoryList" :key="`brand-${index}`" :value="cat.ProductCategoryId">{{ cat.ProductCategoryName }}</option>
                    </select>
                  </label>

                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Status</span>
                    </div>
                    <select v-model="form.ProductStatusId" class="select select-bordered w-full rounded-lg">
                      <option value="">Select Status</option>
                      <option v-for="(status,index) in productStatusList" :key="`brand-${index}`" :value="status.ProductStatusId">{{ status.ProductStatusName }}</option>
                    </select>
                  </label>

                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">VAT Type</span>
                    </div>
                    <select v-model="form.ProductVatType" class="select select-bordered w-full rounded-lg">
                      <option value="">Select VAT Type</option>
                      <option value="VAT">VAT</option>
                      <option value="VATs">VATs</option>
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
                  <label class="form-control w-full">
                    <div class="label">
                      <span class="label-text">Product Cost</span>
                    </div>
                    <CurrencyInput v-model="form.ProductCost"/>
                  </label>
                </div>

                <div class="flex items-center gap-4 mb-4">
                  <label class="form-control flex-1">
                    <div class="label cursor-pointer">
                      <input
                        type="checkbox"
                        v-model="form.ProductEnableDiscountPercent"
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
                        v-model="form.ProductEnableDiscountAmount"
                        class="checkbox checkbox-primary mr-2 "
                      />
                      <span class="label-text">Amount Discount</span>
                    </div>
                  </label>
                  <div class="flex-3">
                    <CurrencyInput v-model="form.ProductDiscountAmount" symbol-value="%" class="max-w-xs" :disabled="!form.ProductEnableDiscountAmount"/>
                  </div>
                </div>

                <div class="form-control w-full mb-6 flex flex-col">
                  <div class="label">
                    <span class="label-text">ProductDescription</span>
                  </div>
                  <textarea
                    v-model="form.ProductDescription"
                    class="textarea textarea-bordered h-24 w-full rounded-lg"
                    placeholder="Enter product ProductDescription here..."
                  ></textarea>
                </div>

                <div class="flex justify-center">
                  <button type="submit" class="btn btn-primary px-8" :disabled="isLoading">Add Product<span v-if="isLoading" className="loading loading-spinner loading-xs ml-2"></span></button>
                </div>
              </form>
            </div>
        </div>
    
    </dialog>
</div>
</template>