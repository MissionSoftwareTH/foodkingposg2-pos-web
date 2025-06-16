<template>
    <form class="flex flex-col p-4 font-semibold " @submit.prevent="changePassword()">
        <div class="flex justify-between">
            <div class="">
                <h1 class="text-xl">Change Password</h1>
                <p class="text-base font-medium text-base-content/50">Update your password</p>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Submit<span v-if="isLoading" className="loading loading-spinner loading-xs ml-2"></span></button>
        </div>
        <span class="divider"></span>
        <div class="space-y-4 p-2 w-full">
            <div class=" flex max-sm:flex-col">
                <label class="label text-base-content flex-1">
                    <span class="label-text ">Current Password</span>
                </label>
                <input type="password" placeholder="current password" class="input input-bordered flex-1 lg:flex-3" required v-model="form.password"/>
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
import type { AxiosResponse } from 'axios';
import { useDialogStore } from '../../../store/dialogStore';
import type { baseResponse, formData, Payload } from '../../../types';
import { getApiHeaders } from '../../../services/api/apiHeader';
import apiClient from '../../../services/api/apiService';

const dialogStore = useDialogStore();
const isLoading = ref<boolean>(false);

const form = ref<formData>({
    password: '',
    new_password: '',
    confirm_password: '',
})

const changePassword = async () => {
    try {
        const { password , new_password , confirm_password } = form.value;
        if( !password || !new_password || !confirm_password )return dialogStore.openDialog('All required' , {status: 'warning'});
        const headers = getApiHeaders();
        const payload:Payload = {
            OldPassword: password,
            NewPassword: new_password
        };
        const apiUrl = '/admins/change/password'
        const res:AxiosResponse<baseResponse<void>> = await apiClient.patch(apiUrl , payload , {headers});
        console.log(res)
        dialogStore.openDialog(res.data.res_message || 'unknown message' , {status: 'success', type: 'force'});

    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog(error?.response?.data?.res_message || error , {status: 'error'});
    }
};
</script>