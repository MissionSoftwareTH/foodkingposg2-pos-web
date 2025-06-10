<template>
    <form class="flex flex-col p-4 font-semibold" @submit.prevent="handleSubmit()">
        <div class="flex justify-between">
            <div class="">
                <h1 class="text-lg">Personal Info</h1>
                <p class="text-sm font-medium text-base-content/50">Update your personal details</p>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Submit<span v-if="isLoading" className="loading loading-spinner loading-xs ml-2"></span></button>
        </div>
        <span class="divider"></span>
        <div class="space-y-5 p-2 w-full overflow-y-auto">
            <div class="flex gap-4 items-center rounded-full bg-base-300 p-5">
                <img src="/public/assets/images/profile-mock.png" alt="mock image" class="size-30 rounded-full">
                <div class="space-y-5">
                    <div class="flex gap-4">
                        <button type="button" class="btn btn-sm btn-info">change your image</button>
                        <button type="button" class="btn btn-sm btn-error">remove image</button>
                    </div>
                    <p class="text-base-content/50 text-xs">We supports PNGs , JPGs and GIFs under 2MB</p>
                </div>
            </div>
            <div class="flex gap-6">
                <div class="flex-1 flex flex-col gap-2">
                    <label class="label text-base-content">
                        <span class="label-text text-sm text-base-content/50">First Name</span>
                    </label>
                    <input type="text" placeholder="first name" class="input input-bordered w-full" required v-model="form.firstname"/>
                </div>
                <div class="flex-1 flex flex-col gap-2">
                    <label class="label text-base-content">
                        <span class="label-text text-sm text-base-content/50">Last Name</span>
                    </label>
                    <input type="text" placeholder="last name" class="input input-bordered w-full" required v-model="form.lastname"/>
                </div>
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
import { useAppSetupStore } from '../../../store/appSetupStore';
import { getInfo } from '../../../services/utils';

const dialogStore = useDialogStore();
const isLoading = ref<boolean>(false);
const appSetupStore = useAppSetupStore();

const form = ref<formData>({
    firstname: appSetupStore.user_data?.FirstName,
    lastname: appSetupStore.user_data?.LastName,
})

const handleSubmit = async () => {
    try {
        const { firstname , lastname } = form.value;
        if( !firstname || !lastname )return dialogStore.openDialog('All required' , {status: 'warning'});
        const headers = getApiHeaders();
        const payload:Payload = {
            FirstName: firstname,
            LastName: lastname
        };
        const apiUrl = '/admins/update/admin/info'
        const res:AxiosResponse<baseResponse<void>> = await apiClient.patch(apiUrl , payload , {headers});
        console.log(res)
        getInfo();
        dialogStore.openDialog(res.data.res_message || 'unknown message' , {status: 'success'});

    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog(error?.response?.data?.res_message || error , {status: 'error'});
    }
};
</script>