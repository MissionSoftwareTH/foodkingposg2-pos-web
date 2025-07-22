<template>
    <form class="flex flex-col p-4 font-semibold " @submit.prevent="handleSubmit">
        <div class="flex justify-between">
            <div class="">
                <h1 class="text-xl">{{ $t('change_password_title') }}</h1>
                <p class="text-base font-medium text-base-content/50">{{ $t('change_password_subtitle') }}</p>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">{{ $t('submit') }}<span v-if="updatePasswordMutation.isPending.value" className="loading loading-spinner loading-xs ml-2"></span></button>
        </div>
        <span class="divider"></span>
        <div class="space-y-4 p-2 w-full">
            <div class=" flex max-sm:flex-col">
                <label class="label text-base-content flex-1">
                    <span class="label-text ">{{ $t('current_password') }}</span>
                </label>
                <input type="password" :placeholder="$t('current_password_placeholder')" class="input input-bordered flex-1 lg:flex-3" required v-model="form.Password"/>
            </div>
            <div class=" flex max-sm:flex-col">
                <label class="label text-base-content flex-1">
                    <span class="label-text">{{ $t('new_password') }}</span>
                </label>
                <input type="password" :placeholder="$t('new_password_placeholder')" class="input input-bordered flex-1 lg:flex-3" required v-model="form.new_password"/>
            </div>
            <div class=" flex max-sm:flex-col">
                <label class="label text-base-content flex-1">
                    <span class="label-text">{{ $t('confirm_password') }}</span>
                </label>
                <input type="password" :placeholder="$t('confirm_password_placeholder')" class="input input-bordered flex-1 lg:flex-3" required v-model="form.confirm_password"/>
            </div>
        </div>
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { AxiosError, AxiosResponse } from 'axios';
import type { baseResponse, formData, Payload } from '../../../types';
import apiClient from '../../../services/api/apiService';
import { useToastStore } from '../../../store/toastStore';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useProgressBarStore } from '../../../store/progressBarStore';

const toastStore = useToastStore();
const progressBarStore = useProgressBarStore();
const queryClient = useQueryClient();

const form = ref<formData>({
    Password: '',
    new_password: '',
    confirm_password: '',
})

const updatePassword = async (payload:Payload) => {
    const apiUrl = '/admins/change/password'
    const res:AxiosResponse<baseResponse<void>> = await apiClient.patch(apiUrl , payload );
    return res.data;
}

const updatePasswordMutation = useMutation<baseResponse<void> , AxiosError<baseResponse<void>> , Payload>({
    mutationFn: updatePassword,
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
        progressBarStore.loadingStop();
    }
});

const handleSubmit = () => {
    const { Password , new_password , confirm_password } = form.value;
    if( !Password || !new_password || !confirm_password )return toastStore.showToast('กรอกข้อมูลให้ครบถ้วน', 'warning');
    updatePasswordMutation.mutate(form.value);
}

</script>