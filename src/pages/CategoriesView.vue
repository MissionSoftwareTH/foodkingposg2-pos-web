<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Table from '../components/Table.vue';
import type { baseResponse, CategoriesResponse , CategoriesTable, CategoriesPayload, Data } from '../types';
import { IconFilter2, IconPlus, IconSortAscendingLetters, IconTrash ,IconEdit } from '@tabler/icons-vue';
import apiClient from '../services/api/apiService';
import { AxiosError, type AxiosResponse } from 'axios';
import { useDialogStore } from '../store/dialogStore';
import { useConfirmDialogStore } from '../store/confirmDialogStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useToastStore } from '../store/toastStore';
import { useProgressBarStore } from '../store/progressBarStore';
import TableSort from '../components/TableSort.vue';
import { categoriesPayloadForm } from '../constants/form';
import { categoriesTableHeaders } from '../constants/table';
import { categoriesSortColumnOption, SortOrderOption } from '../constants/page_option';
import { usePageOptionStore } from '../store/sortingStore';
import { useI18n } from 'vue-i18n';
import { translator } from '../services/utils';

const confirmStore = useConfirmDialogStore();
const dialogStore = useDialogStore();
const toastStore = useToastStore();
const queryClient = useQueryClient();
const progressBarStore = useProgressBarStore();
const form = ref({...categoriesPayloadForm});
const updateForm = ref({...categoriesPayloadForm});
const pageOptionStore = usePageOptionStore();
const isInputUpdated = ref<number | undefined>(undefined);
const { t } = useI18n();
const headers = computed(() => {return translator(categoriesTableHeaders,t)});
const sortColumnOption = computed(() => {return translator(categoriesSortColumnOption,t)});
const sortOrder = computed(() => {return translator(SortOrderOption,t)});


// fetch data
const fetchCategoriesList = async (): Promise<CategoriesTable[]> => {
    const {MerchantId , CurrentPage , PageSize , SortColumn , SortOrder} = pageOptionStore.categories;
    const params = {
        SortOrder , SortColumn ,  MerchantId , PageSize , Page: CurrentPage
    };
    const apiUrl = '/dropdown/product/category';
    const response:AxiosResponse<baseResponse<Data<CategoriesResponse[]>>> = await apiClient.get(apiUrl, {params});
    const data:CategoriesTable[] = response.data.res_data.data || []
    return data;
};

const {data: categoriesData , isPending , isError , isFetching } = useQuery<CategoriesTable[] , AxiosError>({
    queryKey: ['categoriesListAxios'] ,
    queryFn: fetchCategoriesList ,
})

//post data
const createBranch = async (payload:CategoriesPayload) => {
    const apiUrl = '/product/category/insert';
    const response:AxiosResponse<baseResponse<void>> = await apiClient.post(apiUrl , payload );
    return response.data;
}

const createCategoriesMutation = useMutation<baseResponse<void>,AxiosError<baseResponse<void>>,CategoriesPayload>({
    mutationFn: createBranch,
    onSuccess: (data) => {
        toastStore.showToast(data.res_message , 'success');
        queryClient.invalidateQueries({ queryKey: ['categoriesListAxios']});
        queryClient.invalidateQueries({ queryKey: ['categoriesList']});

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
    const { ProductCategoryName } = form.value;
    if(!ProductCategoryName) {
        return toastStore.showToast('ใส่ข้อมูลไม่ครบถ้วน' , 'warning');
    }
    createCategoriesMutation.mutate(form.value);
 }

//update data
const updateCategories = async (payload:CategoriesPayload) => {
    const apiUrl = '/product/category/update';
    const response:AxiosResponse<baseResponse<void>> = await apiClient.patch(apiUrl , payload );
    return response.data;
}

const updateCategoriesMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , CategoriesPayload>({
    mutationFn: updateCategories,
    onSuccess: (data) => {
        toastStore.showToast(data.res_message , 'success');
        queryClient.invalidateQueries({queryKey: ['categoriesListAxios']});
        queryClient.invalidateQueries({queryKey: ['productListAxios']});
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
  resetForm();
}

const resetForm = () => {
  form.value = {...categoriesPayloadForm};
}

const handleEmit = (page:number) => {
  pageOptionStore.categories.CurrentPage = page;
  queryClient.invalidateQueries({queryKey: ['categoriesListAxios']});
}

const handleSortOrderEmit = (sort:string) => {
    pageOptionStore.categories.SortOrder = sort;
    queryClient.invalidateQueries({queryKey: ['categoriesListAxios']});
}

const handleSortColumnEmit = (sort:string) => {
    pageOptionStore.categories.SortColumn = sort;
    queryClient.invalidateQueries({queryKey: ['categoriesListAxios']});
}

const handleUpdateSubmit = () => {
  if(!updateForm.value) {
    return toastStore.showToast('ไม่สามารถ update ได้');
  }
  form.value = updateForm.value;
  updateCategoriesMutation.mutate(form.value);
}

const handleTextInputUpdate = ( newValue: string ,productId:number) => {
    console.log(newValue , productId);
    if (updateForm.value) {
        updateForm.value = {};
        updateForm.value.ProductCategoryId = productId;
        updateForm.value.ProductCategoryName = newValue;
    }
    console.log(isInputUpdated.value);
};

watch(() => pageOptionStore.categories.PageSize ,() => {
  pageOptionStore.categories.CurrentPage = 1;
  queryClient.invalidateQueries({queryKey: ['categoriesListAxios']});
})

</script>
<template>
<div class="flex flex-col p-2 gap-4">
    <h1 class="text-3xl font-semibold">{{ $t('category_management') }}</h1>
    <div class="card bg-gradient-to-br from-secondary to-accent shadow-lg font-semibold">
        <form @submit.prevent="handleSubmit" class="w-full h-full flex gap-4 p-4 items-center">
            <div class="form-control flex">
                <input type="text" :placeholder="$t('category_name_placeholder')" class="input input-bordered flex-2 min-w-sm" v-model="form.ProductCategoryName"/>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isFetching"><IconPlus class="size-5"/>{{ $t('add_new_category') }}<span v-if="isFetching" className="loading loading-spinner loading-xs ml-2"></span></button>
        </form>
    </div>
    <div class="flex gap-4 flex-col">
        <div class="flex gap-2 items-center">
            <div class="flex items-center gap-2">
                <h1>{{ $t('show') }}</h1>
                <select v-model="pageOptionStore.categories.PageSize" className="select select-sm w-fit rounded-lg">
                    <option v-for="item in [5,10,25,50]" :value="item" :key="`item-${item}`">{{item}}</option>
                </select>
            </div>
           <TableSort :sort-item="sortColumnOption" @page-sort="handleSortColumnEmit">
                <template #icon>
                    {{ sortColumnOption.find((s) => s.value === pageOptionStore.categories.SortColumn)?.title }}  
                    <IconFilter2/>
                </template>
            </TableSort>
            <TableSort :sort-item="sortOrder" @page-sort="handleSortOrderEmit">
                <template #icon>    
                    {{ sortOrder.find((s) => s.value === pageOptionStore.categories.SortOrder)?.title  }}
                    <IconSortAscendingLetters/>
                </template>
            </TableSort>
            <span class="w-full"></span>
        </div>
        <Table 
            :isLoading="isPending"
            :isError="isError"
            :headers="headers"
            :items="categoriesData"
            :item-per-page="pageOptionStore.categories.PageSize"
            :total-items="pageOptionStore.categories.TotalRecords"
            :current-page="pageOptionStore.categories.CurrentPage"
            @page-changed="handleEmit"
        >
            <template #ProductCategoryName="categories">
                <div class="flex items-center gap-2 w-fit">
                    <input type="text" class="input input-ghost max-w-[150px] disabled:text-base-content disabled:bg-transparent disabled:border-none disabled:cursor-default" :disabled="isInputUpdated !== categories.item.ProductCategoryId" :value="categories.item.ProductCategoryName" @input="e => handleTextInputUpdate(String((e.target as HTMLSelectElement).value),categories.item.ProductCategoryId)">
                    <span v-if="isInputUpdated === categories.item.ProductCategoryId" class="flex items-center gap-2">
                        <button @click="handleUpdateSubmit()" class="btn btn-primary btn-sm">{{ $t('update') }}</button>
                        <button @click="() => isInputUpdated = undefined" class="btn btn-error btn-sm">{{ $t('close') }}</button>
                    </span>
                    <button v-else class="btn btn-xs" @click="() => isInputUpdated = categories.item.ProductCategoryId"><IconEdit class="size-4"/></button>
                </div>
            </template>
            <template #actions>
                <button class="btn btn-circle btn-soft btn-xs bg-error text-error-content" @click="() => confirmStore.isOpen = true"><IconTrash class="size-4"/></button>
            </template>
        </Table>
    </div>
</div>
</template>