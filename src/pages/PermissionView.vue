<script setup lang="ts">
import { ref } from 'vue';
import PermissionTable from '../components/permission/PermissionTable.vue';
import type { RoleListResponse } from '../types/permission';
import type { baseResponse } from '../types';
import apiClient from '../services/api/apiService';
import type { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/vue-query';
import { IconPlugConnectedX } from '@tabler/icons-vue';

const activeTab = ref(1);

const fetchRoleList = async ():Promise<RoleListResponse[]> => {
    const apiUrl = 'role/list';
    const res:AxiosResponse<baseResponse<RoleListResponse[]>> = await apiClient.get(apiUrl);
    return res.data.res_data
}

const { data: roleList , isPending , isError } = useQuery({
    queryKey: ['roleList'],
    queryFn: fetchRoleList,
})

</script>
<template>
    <div class="h-full w-full">
        <div class="w-full p-6 min-h-[120px] bg-base-100 rounded-box">
            <h1 class="text-3xl font-bold">Permission</h1>
            <select name="" id="" class="select select-bordered w-full max-w-xs mt-4">
                <option value="" class="">select option</option>
                <option value="1" class="">Option 1</option>
            </select>
        </div>
        <div class="mt-4">
            <div class="w-full min-h-[500px] skeleton" v-if="isPending" >
            </div>
            <div class="w-full" v-else-if="isError">
                <div class="flex flex-col justify-center items-center gap-2 my-10">
                  <div class="rounded-full bg-base-content size-60 flex justify-center items-center">
                    <IconPlugConnectedX class="size-40 text-base-100"/>
                  </div>
                  <h1>Lost Connection</h1>
                </div>
            </div>
            <div v-else role="tablist" class="w-full tabs tabs-lift" >
                <template v-for="(role, index) in roleList" :key="index">
                    <input
                        type="radio" 
                        name="my_tabs"
                        class="tab" 
                        :aria-label="`Role ${role.RoleName}`"
                        :id="`tab-${index+1}`"
                        :checked="activeTab === index+1"
                        @change="activeTab = index+1"
                        defaultChecked
                    />
                    <div class="tab-content border-base-300 bg-base-100 p-10" >
                        <PermissionTable :data="role.Abilities"/>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>