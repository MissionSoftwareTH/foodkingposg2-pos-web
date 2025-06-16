<script setup lang="ts">
import { useAbility } from '@casl/vue';
import { useDialogStore, type DialogStatus } from '../store/dialogStore';
import { getApiHeaders } from '../services/api/apiHeader';
import apiClient from '../services/api/apiService';

// You can add your logic here
const {can: $can} = useAbility();
const dialogStore = useDialogStore();
const handleClick = (clickStatus: DialogStatus , message:string , type?:string , link?: string ) => {
    dialogStore.openDialog( message , {status: clickStatus, type: type , link: link} );
}
interface Test {
    TestTopic: string;
    TestMessage: string;
}

const test = async () => {
    try {
        const headers = getApiHeaders();
        const payload:Test = {    
            TestTopic: "Test Topic1",
            TestMessage: "Test Message"
        };
        const apiUrl = '/rabbitmq/test/message';
        await apiClient.post(apiUrl , payload , {headers});
        
        dialogStore.openDialog('send message successfully' , {status: 'success'})

    } catch (error:any) {
       dialogStore.openDialog(error?.response?.data?.res_message || error , {status: 'error'});
    }
}

</script>

<template>
    <div class="flex flex-col p-2">
        <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Example Card -->
            <div v-if="$can('read','Post')" class="card bg-base-300 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Sending Message</h2>
                    <p>sending message to RabbitMQ</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-success" @click="test">Send Message</button>
                    </div>
                </div>
            </div>

            <!-- Example Card -->
            <div v-if="$can('edit','all')" class="card bg-base-300 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Link Card</h2>
                    <p>Another card example.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-warning" @click="handleClick('warning', 'link card details' , 'link', '/not-found')">Action</button>
                    </div>
                </div>
            </div>

            <!-- Example Card -->
            <div v-if="$can('manage','all')" class="card bg-base-300 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Force logout Card</h2>
                    <p>A third card for your dashboard.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-error" @click="handleClick('error', 'force logout card details' , 'force')">Action</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>