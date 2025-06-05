<template>
    <div class="min-h-screen bg-base-200">
        <div class="flex flex-col lg:flex-row-reverse min-h-screen">
            <div class="flex-1 text-center flex flex-col justify-end lg:justify-center lg:text-left">
                <h1 class="text-5xl font-bold">Login now!</h1>
                <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div class="flex-1 flex justify-center items-center">
                <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form class="card-body" @submit.prevent="handleSubmit">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" class="input input-bordered" required v-model="form.email"/>
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" class="input input-bordered" required v-model="form.password"/>
                            <label class="label">
                                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div class="form-control mt-6">
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { updateAbility } from '../services/plugin/permissions';

const route = useRouter();

interface LoginForm {
    email: string;
    password: string;
}

const form = ref<LoginForm>({
    email: '',
    password: '',
})

const userinfo = {
    userId: 1,
    username: 'thanat.r',
    roles: ['admin'],
}

const handleSubmit = () => {
    const {email, password} = form.value;
    if(!email || !password) return;
    try {
       if(email && password) {
            const data = userinfo
            updateAbility(data.roles);
            localStorage.setItem('isLoggedIn' , 'active');
            return route.replace('/dashboard');
       }
    } catch (error) {
        console.log(error);
    }
}

</script>
