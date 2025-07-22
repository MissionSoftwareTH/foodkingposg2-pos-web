<template>
    <form class="flex flex-col p-4 font-semibold" @submit.prevent="handleSubmit()">
        <div class="flex justify-between">
            <div class="">
                <h1 class="text-xl">{{ $t('personal_info_title') }}</h1>
                <p class="text-base font-medium text-base-content/50">{{ $t('personal_info_subtitle') }}</p>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">{{ $t('submit') }}<span v-if="isLoading" className="loading loading-spinner loading-xs ml-2"></span></button>
        </div>
        <span class="divider"></span>
        <div class="space-y-5 p-2 w-full overflow-y-auto">
            <div class="flex gap-4 rounded-full bg-base-100 p-5">
                <img src="/assets/images/profile-mock.png" alt="mock image" class="size-20 rounded-full">
                <div class="flex flex-col justify-between">
                    <div class="flex gap-4">
                        <button type="button" class="btn btn-sm btn-info">{{ $t('change_user_img') }}</button>
                        <button type="button" class="btn btn-sm btn-base-100">{{ $t('remove_img') }}</button>
                    </div>
                    <p class="text-base-content/50 text-sm">{{ $t('change_img_subtitle') }}</p>
                </div>
            </div>
            <div class="flex gap-6">
                <div class="flex-1 flex flex-col gap-2">
                    <label class="label text-base-content">
                        <span class="label-text text-base text-base-content/50">{{ $t('first_name') }}</span>
                    </label>
                    <input type="text" :placeholder="$t('first_name_placeholder')" class="input input-bordered w-full" required v-model="form.FirstName"/>
                </div>
                <div class="flex-1 flex flex-col gap-2">
                    <label class="label text-base-content">
                        <span class="label-text text-base text-base-content/50">{{ $t('last_name') }}</span>
                    </label>
                    <input type="text" :placeholder="$t('last_name_placeholder')" class="input input-bordered w-full" required v-model="form.LastName"/>
                </div>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { AxiosError, AxiosResponse } from 'axios';
import type { baseResponse, formData, Payload } from '../../../types';
import apiClient from '../../../services/api/apiService';
import { useAppSetupStore } from '../../../store/appSetupStore';
import { useToastStore } from '../../../store/toastStore';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useProgressBarStore } from '../../../store/progressBarStore';

const toastStore = useToastStore();
const isLoading = ref<boolean>(false);
const appSetupStore = useAppSetupStore();
const progressBarStore = useProgressBarStore();
const queryClient = useQueryClient();

const form = ref<formData>({
    FirstName: appSetupStore.user_data?.FirstName,
    LastName: appSetupStore.user_data?.LastName,
})

const updateUserInfo = async (payload:Payload) => {
    const apiUrl = '/admins/update/admin/info'
    const res:AxiosResponse<baseResponse<void>> = await apiClient.patch(apiUrl , payload );
    return res.data;
}

const updateUserInfoMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , Payload>({
    mutationFn: updateUserInfo,
    onSuccess: (data) => {
       toastStore.showToast(data.res_message , 'success');
       queryClient.invalidateQueries({queryKey: ['userInfo']});
    },
    onError: (error) => {
        toastStore.showToast(error.response?.data.res_message || error.message , 'error');
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
    const { FirstName , LastName } = form.value;
    if( !FirstName || !LastName ) return toastStore.showToast('ข้อมูลไม่ครบถ้วน' , 'warning');
    updateUserInfoMutation.mutate(form.value);
};
</script>