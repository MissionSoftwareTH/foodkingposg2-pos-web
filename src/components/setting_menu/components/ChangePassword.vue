<template>
    <form class="flex flex-col p-4 font-semibold " @submit.prevent="handleSubmit">
        <div class="flex justify-between">
            <div class="">
                <h1 class="text-xl">Change Password</h1>
                <p class="text-base font-medium text-base-content/50">Update your password</p>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Submit<span v-if="updatePasswordMutation.isPending.value" className="loading loading-spinner loading-xs ml-2"></span></button>
        </div>
        <span class="divider"></span>
        <div class="space-y-4 p-2 w-full">
            <div class=" flex max-sm:flex-col">
                <label class="label text-base-content flex-1">
                    <span class="label-text ">Current Password</span>
                </label>
                <input type="password" placeholder="current password" class="input input-bordered flex-1 lg:flex-3" required v-model="form.Password"/>
            </div>
            <div class=" flex max-sm:flex-col">
                <label class="label text-base-content flex-1">
                    <span class="label-text">New Password</span>
                </label>
                <input type="password" placeholder="new password" class="input input-bordered flex-1 lg:flex-3" required v-model="form.new_password"/>
            </div>
            <div class=" flex max-sm:flex-col">
                <label class="label text-base-content flex-1">
                    <span class="label-text">Confirm Password</span>
                </label>
                <input type="password" placeholder="confirm password" class="input input-bordered flex-1 lg:flex-3" required v-model="form.confirm_password"/>
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