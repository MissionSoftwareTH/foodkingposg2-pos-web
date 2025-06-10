<script setup lang="ts">
import { useAbility } from '@casl/vue';
import { useDialogStore, type DialogStatus } from '../store/dialogStore';
import Table from '../components/Table.vue';
import type { HeadersTable } from '../types';
import { IconPencil, IconTrash } from '@tabler/icons-vue';

// You can add your logic here
const {can: $can} = useAbility();
const dialogStore = useDialogStore();
const handleClick = (clickStatus: DialogStatus , message:string , type?:string , link?: string ) => {
    dialogStore.openDialog( message , {status: clickStatus, type: type , link: link} );
}

const headers:HeadersTable[] = [
    {
        key: 'id',
        title: 'Id',
    },
    {
        key: 'firstname',
        title: 'FirstName',
    },
    {
        key: 'lastname',
        title: 'LastName',
    },
    {
        key: 'age',
        title: 'Age',
    },
    {
        key: 'email',
        title: 'Email',
    },
    {
        key: 'birth_date',
        title: 'Birth date',
    },
    {
        key: 'department',
        title: 'Department',
    },
    {
        key: 'address',
        title: 'Address',
    },
    {
        key: 'role',
        title: 'Role',
    },
    {
        key: 'actions',
        title: 'Actions',
        type: 'actions',
    }
]

const items = [
    { 
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        birth_date: '1/1/2000',
        department: 'engineer',
        address: 'bangkok samphan kratumlom phutamonthon sai 4',
        role: 'Admin'
    },
    { 
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        birth_date: '1/1/2000',
        department: 'engineer',
        address: 'bangkok samphan kratumlom phutamonthon sai 4',
        role: 'Admin'
    },
    { 
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        birth_date: '1/1/2000',
        department: 'engineer',
        address: 'bangkok samphan kratumlom phutamonthon sai 4',
        role: 'Admin'
    },
    { 
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        birth_date: '1/1/2000',
        department: 'engineer',
        address: 'bangkok samphan kratumlom phutamonthon sai 4',
        role: 'Admin'
    },
    { 
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        birth_date: '1/1/2000',
        department: 'engineer',
        address: 'bangkok samphan kratumlom phutamonthon sai 4',
        role: 'Admin'
    },
    { 
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        birth_date: '1/1/2000',
        department: 'engineer',
        address: 'bangkok samphan kratumlom phutamonthon sai 4',
        role: 'Admin'
    },
    { 
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        birth_date: '1/1/2000',
        department: 'engineer',
        address: 'bangkok samphan kratumlom phutamonthon sai 4',
        role: 'Admin'
    },
    { 
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        birth_date: '1/1/2000',
        department: 'engineer',
        address: 'bangkok samphan kratumlom phutamonthon sai 4',
        role: 'Admin'
    },
];

</script>

<template>
    <div class="flex flex-col p-2">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Example Card -->
            <div v-if="$can('read','Post')" class="card bg-base-300 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">View Card</h2>
                    <p>this card for viewer</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-success" @click="handleClick('success','view card details')">view</button>
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
        <Table :headers="headers" :items="items" class="my-10 rounded-xl shadow-lg">
            <template #actions="items">
                <button class="btn btn-circle btn-soft btn-sm bg-info text-info-content mr-2" @click="handleClick('success', `edit this: ${items.item.firstname} ${items.item.lastname}`)"><IconPencil class="size-5"/></button>
                <button class="btn btn-circle btn-soft btn-sm bg-error text-error-content" @click="handleClick('success', `remove this id: ${items.item.id}`)"><IconTrash class="size-5"/></button>
            </template>
        </Table>
        
    </div>
</template>