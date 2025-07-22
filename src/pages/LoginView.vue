<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDialogStore } from '../store/dialogStore';
import OTPinput from '../components/OTPinput.vue';
import type { baseResponse, extendTime, Payload, OTP_Response } from '../types';
import CountdownTimer from '../components/CountdownTimer.vue';
import apiClient from '../services/api/apiService';
import type { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { LoginForm, OTPdataForm } from '../constants/form';

const route = useRouter();
const dialogStore = useDialogStore();
const authCompleted = ref<boolean>(false);
const isOTPTimerFinish = ref<boolean>(false);
const isdelayOTPTimerFinish = ref<boolean>(false);
const queryClient = useQueryClient();
const OTPdata = ref({...OTPdataForm});
const form = ref({...LoginForm})

//verify identity login
const handleSubmit = () => {
    const {Email, Password} = form.value;
    if(!Email || !Password) return;  
    PostIdentityLoginMutation.mutate(form.value);
}

const PostIdentityLogin = async (payload:Payload) => {
    const api = '/token/login';
    const res:AxiosResponse<baseResponse<void>> = await apiClient.post(api , payload );
    return res.data;
}

const PostIdentityLoginMutation = useMutation<baseResponse<void>,AxiosError<baseResponse<void>>,Payload>({
    mutationFn: PostIdentityLogin,
    onSuccess: () => {
        sendEmailOTPMutation.mutate();
    },
    onError: (error) => {
        console.error(error.response?.data.res_message || error.message);
        dialogStore.openDialog( error.response?.data.res_message || error.message , {status: 'error'});
    },
})

//login with OTP
const handleLogin = () => {
    if(!form.value.otp) return dialogStore.openDialog('กรอกหมายเลข OTP ให้ครบถ้วน', {status: 'warning'});
    const {TempToken , RefCode} = OTPdata.value;
    const payload:Payload = {
        otp: form.value.otp,
        TempToken: TempToken,
        RefCode: RefCode,
    }
    PostLoginMutation.mutate(payload);
}

const PostLogin = async (payload:Payload) => {
    
    const apiUrl = '/token/login/verify/otp';
    const res:AxiosResponse<baseResponse<extendTime>> = await apiClient.post(apiUrl , payload );
    return res.data;
}

const PostLoginMutation = useMutation<baseResponse<extendTime>,AxiosError<baseResponse<void>>,Payload>({
    mutationFn: PostLogin,
    onSuccess: (data) => {
        setupLoginSuccess(data.res_data);
    },
    onError: (error) => {
        dialogStore.openDialog(error.response?.data.res_message || error.message , {status: 'error'});
    }
})

//OTP sending
const sendEmailOTP = async () => {
    delete form.value.otp;
    const payload = form.value;
    const apiUrl = '/twofa/login/request/otp/Email';
    const res:AxiosResponse<baseResponse<OTP_Response>> = await apiClient.post(apiUrl , payload );
    return res.data;
}

const sendEmailOTPMutation = useMutation<baseResponse<OTP_Response>,AxiosError<baseResponse<void>>>({
    mutationFn:sendEmailOTP,
    onSuccess: (data) => {
        OTPdata.value = data.res_data
        isdelayOTPTimerFinish.value = false;
        isOTPTimerFinish.value = false;
    },
    onMutate: () => {
        isOTPTimerFinish.value = true;
    },
    onError: (error) => {
        console.error(error.response?.data.res_message || error.message);
        dialogStore.openDialog( error.response?.data.res_message || error.message , {status: 'error'});
    },
    onSettled: () => {
        authCompleted.value = true;
    }
})

//fill OTP completed
const handleOtpCompleted = (otp: string) => {
    console.log('กรอก OTP สมบูรณ์:', otp);
    form.value.otp = otp;
};

//after login successfully
const setupLoginSuccess = async (res:extendTime) => {
    localStorage.setItem('isLoggedIn' , 'active');
    localStorage.setItem('extendTime', JSON.stringify(res.FormatingTime.extendTime.asiaBangkok.unixTimestamp));
    await queryClient.invalidateQueries({queryKey: ['userInfo']})
    return route.replace('/dashboard');
}

</script>
<template>
    <div class="flex flex-col lg:flex-row-reverse min-h-screen container mx-auto">
       <div class="flex-1 text-center flex flex-col justify-end lg:justify-center lg:text-left">
           <h1 class="text-5xl font-semibold">{{ $t('login_title') }}</h1>
           <p class="py-6">{{ $t('login_subtitle') }}</p>
       </div>
       <div class="flex-1 flex flex-col justify-center items-center">
           <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
               <!-- login Form -->
               <form v-if="!authCompleted" class="card-body" @submit.prevent="handleSubmit">
                   <div class="form-control">
                       <label class="label text-base-content">
                           <span class="label-text">{{ $t('login_email') }}</span>
                       </label>
                       <input type="text" :placeholder="$t('login_email_placeholder')" class="input input-bordered w-full" required v-model="form.Email"/>
                   </div>
                   <div class="form-control">
                       <label class="label text-base-content">
                           <span class="label-text">{{ $t('login_password') }}</span>
                       </label>
                       <input type="Password" :placeholder="$t('login_password_placeholder')" class="input input-bordered w-full" required v-model="form.Password"/>
                       <label class="label text-base-content">
                           <a href="#" class="label-text-alt link link-hover">{{ $t('login_forgot_password') }}</a>
                       </label>
                   </div>
                   <div class="form-control mt-6">
                       <button type="submit" class="btn btn-primary w-full" :disabled="PostIdentityLoginMutation.isPending.value || sendEmailOTPMutation.isPending.value">{{ $t('login_submit') }}<span v-if="PostIdentityLoginMutation.isPending.value || sendEmailOTPMutation.isPending.value" className="loading loading-spinner loading-xs ml-2"></span></button>
                   </div>
               </form>
               <!-- OTP Form -->
               <div v-else class="card-body gap-6">
                   <h1 class="text-center text-xl font-semibold uppercase">{{ $t('login_otp_title') }}</h1>
                   <OTPinput :length="6" @otp-completed="handleOtpCompleted"/>
                   <div class="flex">
                       <div class="flex-1 flex gap-1">
                           {{ $t('login_otp_left') }}: <p class="text-error" v-if="isOTPTimerFinish">{{$t('login_otp_expired')}}</p><CountdownTimer v-else
                                           :startTimeMillis="OTPdata.OtpExpireIn"
                                           @countdown-finished="isOTPTimerFinish = $event"
                                           class="text-primary"
                                           />
                       </div>
                       <div class="flex-1">
                           {{ $t('login_ref_code') }}: <span class="text-primary">{{OTPdata.RefCode}}</span>
                       </div>
                   </div>
                   <div class="card-actions">
                       <button @click="handleLogin" class="btn w-full disabled:btn-error" :disabled="PostLoginMutation.isPending.value || sendEmailOTPMutation.isPending.value">{{ $t('submit') }}<span v-if="PostLoginMutation.isPending.value || sendEmailOTPMutation.isPending.value" className="loading loading-spinner loading-xs ml-2"></span></button>
                       <span v-if="isdelayOTPTimerFinish" class="flex items-center gap-2">
                           <p>{{ $t('login_delay_otp_timeout') }}</p>
                           <button class="text-primary cursor-pointer hover:underline" @click="sendEmailOTPMutation.mutate()">{{ $t('login_resend') }}</button>
                       </span>
                       <span v-else class="flex gap-2 self-center">
                           <p>{{ $t('login_delay_wait_1') }}</p>
                           <CountdownTimer :startTimeMillis="OTPdata.RemainingTime"
                           @countdown-finished="isdelayOTPTimerFinish = $event"
                           class="text-primary"
                           />
                           <p>{{ $t('login_delay_wait_2') }}</p>
                       </span>
                   </div>
               </div>
           </div>
       </div>
    </div>
</template>

