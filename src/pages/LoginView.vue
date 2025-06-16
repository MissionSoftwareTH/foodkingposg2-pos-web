<template>
         <div class="flex flex-col lg:flex-row-reverse min-h-screen bg-base-100 container mx-auto">
            <div class="flex-1 text-center flex flex-col justify-end lg:justify-center lg:text-left">
                <h1 class="text-5xl font-semibold">Login now!</h1>
                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div class="flex-1 flex flex-col justify-center items-center">
                <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
                    <!-- login Form -->
                    <form v-if="!authCompleted" class="card-body" @submit.prevent="handleSubmit">
                        <div class="form-control">
                            <label class="label text-base-content">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" class="input input-bordered w-full" required v-model="form.email"/>
                        </div>
                        <div class="form-control">
                            <label class="label text-base-content">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" class="input input-bordered w-full" required v-model="form.password"/>
                            <label class="label text-base-content">
                                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">Login<span v-if="isLoading" className="loading loading-spinner loading-xs ml-2"></span></button>
                        </div>
                    </form>
                    <!-- OTP Form -->
                    <div v-else class="card-body gap-6">
                        <h1 class="text-center text-xl font-semibold uppercase">Enter OTP </h1>
                        <OTPinput :length="6" @otp-completed="handleOtpCompleted"/>
                        <div class="flex">
                            <div class="flex-1 flex gap-1">
                                OTP timeleft: <p class="text-error" v-if="isOTPTimerFinish">OTP expired</p><CountdownTimer v-else
                                                :startTimeMillis="OTPdata.OtpExpireIn"
                                                @countdown-finished="isOTPTimerFinish = $event"
                                                class="text-primary"
                                                />
                            </div>
                            <div class="flex-1">
                                Ref Code: <span class="text-primary">{{OTPdata.RefCode}}</span>
                            </div>
                        </div>
                        <div class="card-actions">
                            <button @click="login" class="btn w-full" :disabled="isLoading">Submit<span v-if="isLoading" className="loading loading-spinner loading-xs ml-2"></span></button>
                            <span v-if="isdelayOTPTimerFinish" class="flex items-center gap-2">
                                <p>ยังไม่ได้ OTP ?</p>
                                <button class="text-primary cursor-pointer hover:underline" @click="sendEmailOTP()">Click here</button>
                            </span>
                            <span v-else class="flex gap-2 self-center">
                                <p>กรุณารอ</p>
                                <CountdownTimer :startTimeMillis="OTPdata.RemainingTime"
                                @countdown-finished="isdelayOTPTimerFinish = $event"
                                class="text-primary"
                                />
                                <p>ก่อนขอรหัส OTP อีกครั้ง</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { updateAbility } from '../services/plugin/permissions';
import { useDialogStore } from '../store/dialogStore';
import OTPinput from '../components/OTPinput.vue';
import type { baseResponse, extendTime, Payload, OTP_Response, formData } from '../types';
import CountdownTimer from '../components/CountdownTimer.vue';
import { getApiHeaders } from '../services/api/apiHeader';
import apiClient from '../services/api/apiService';
import type { AxiosResponse } from 'axios';
import { getInfo } from '../services/utils';
import appController from '../services/utils/appController';

const route = useRouter();
const dialogStore = useDialogStore();
const authCompleted = ref<boolean>(false);
const isOTPTimerFinish = ref<boolean>(false);
const isdelayOTPTimerFinish = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const OTPdata = ref<OTP_Response>({
    TempToken: '',
    RefCode: '',
    RequestTime: '',
    RemainingTime: 10,
    OtpExpireIn: 10,
})


watch(() =>  isdelayOTPTimerFinish.value ,() => {
    console.log(isdelayOTPTimerFinish.value)
})

const form = ref<formData>({
    email: '',
    password: '',
})


const handleSubmit = async () => {
    const {email, password} = form.value;
    if(!email || !password) return;
    try {
        isLoading.value = true;
        const headers = getApiHeaders();
        const payload:Payload = {
             Email: email,
             Password: password
            };
            const api = '/token/login';
            const res = await apiClient.post(api,payload , {headers});
            const resData:baseResponse<object> = res?.data
            if(resData.res_type !== 'success') return dialogStore.openDialog('login failed' , {status: 'warning'});
            await sendEmailOTP();
            authCompleted.value = true;
    } catch (error:any) {
        console.error(error);
    dialogStore.openDialog( error?.response?.data?.res_message || error , {status: 'error'});
    } finally {
        isLoading.value = false;
    }
}

const login = async () => {
    if(!form.value.otp) return dialogStore.openDialog('กรอกหมายเลข OTP ให้ครบถ้วน', {status: 'warning'});
    try {
        isLoading.value = true;
        const {TempToken , RefCode} = OTPdata.value;
        const headers = getApiHeaders();
        const payload:Payload = {
            otp: form.value.otp,
            TempToken: TempToken,
            RefCode: RefCode,
        }
        const apiUrl = '/token/login/verify/otp';
        const res = await apiClient.post(apiUrl , payload , {headers});

        // mock user
        handleLogin(res);
        
    } catch (error:any) {
        console.error(error);
        dialogStore.openDialog( error?.response?.data?.res_message || error , {status: 'error'})
    } finally {
        isLoading.value = false;
    }
}

const handleOtpCompleted = (otp: string) => {
    console.log('กรอก OTP สมบูรณ์:', otp);
    form.value.otp = otp;
};

const sendEmailOTP = async () => {
    try {
        isLoading.value = true;
        isOTPTimerFinish.value = true;
        const {email ,password} = form.value;

        const headers = getApiHeaders();
        const payload:Payload = {Email: email , Password: password};
        const apiUrl = '/twofa/login/request/otp/email';
        const res = await apiClient.post(apiUrl , payload , {headers});
        const resData:baseResponse<OTP_Response> = res?.data ;
            
        OTPdata.value = resData?.res_data;
        isdelayOTPTimerFinish.value = false;
        isOTPTimerFinish.value = false;

    } catch (error: any) {
        console.error(error);
        dialogStore.openDialog( error?.response?.data?.res_message || error , {status: 'error'})
    } finally {
        isLoading.value = false;
    }
}

const handleLogin = async (res:AxiosResponse<baseResponse<extendTime>>) => {
    const resData = res.data?.res_data
    const info = await getInfo();
    appController.setup();
    localStorage.setItem('extendTime', JSON.stringify(resData.FormatingTime.extendTime.asiaBangkok.unixTimestamp));
    localStorage.setItem('isLoggedIn' , 'active');
    updateAbility(info?.Roles || []);
    return route.replace('/dashboard');
}
</script>
