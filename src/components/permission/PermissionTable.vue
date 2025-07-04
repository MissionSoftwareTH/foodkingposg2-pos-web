<script setup lang="ts">
import { computed } from 'vue';
import type { Ability } from '../../types/permission';


interface Props {
    data?: Ability[];
    loading?: boolean;
    error?: boolean;
}

const props = defineProps<Props>();

defineEmits<{(e: 'data-update', dataUpdate: any[]):void}>();

const handleChange = (event:Event , dataValue:any) => {
    const target = event.target as HTMLInputElement;
    console.log(target.checked)
    console.log(dataValue)
}

const permissionMethod = computed(() => {
   const result = props.data?.reduce((acc, item) => {
    // 1. ดึงคำแรกจาก SidebarName ใน Permissions ของ item หลัก
    item.Permissions.forEach(permission => {
      const firstWord = permission.SidebarName.split(' ')[0]; // แยกสตริงด้วยช่องว่างและเอาคำแรก
      if (!acc.includes(firstWord)) {
        acc.push(firstWord);
      }
    });

    // 2. ดึงคำแรกจาก SidebarName ใน Permissions ที่อยู่ใน SubMenu
    item.SubMenu.forEach(sub => {
      sub.Permissions.forEach(permission => {
        const firstWord = permission.SidebarName.split(' ')[0]; // แยกสตริงด้วยช่องว่างและเอาคำแรก
        if (!acc.includes(firstWord)) {
          acc.push(firstWord);
        }
      });
    });
    return acc;
}, [] as string[]) || [];
  return result;
});

</script>
<template>
    <div class="grid bg-base-200 px-4 py-8 rounded-box mb-4" :style="`grid-template-columns: repeat(${permissionMethod.length+1}, minmax(0, 1fr));`">
        <h1 class="col-span-1">Permission Name</h1>
        <h1 v-for="method in permissionMethod" class="col-span-1">
            {{ method }}
        </h1>
    </div>
    <div v-for="d in data" :key="`d-${d.SidebarId}`" class="p-4 flex items-center">
        <!-- permission with no children -->
        <div v-if="d.SubMenu.length > 0" class="w-full">
            <div  class="collapse collapse-arrow">
                <input type="checkbox" className="peer z-20" />
                <div class="collapse-title p-0">
                    <div class="grid " :style="`grid-template-columns: repeat(${permissionMethod.length+1}, minmax(0, 1fr));`">
                        <div class="col-span-1 h-full flex items-center">
                            {{ d.SidebarName }}
                        </div>
                        <div v-for="pm in permissionMethod" :key="`pm-${pm}`" class="col-span-1">
                            <div class="flex flex-col w-fit gap-1">
                                <h1>Select All</h1>
                                <!-- select all checkbox -->
                                <input 
                                    type="checkbox" 
                                    class="z-30 toggle toggle-success"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="collapse-content p-0 mt-6 text-base-content/60">
                    <div class="grid " :style="`grid-template-columns: repeat(${permissionMethod.length+1}, minmax(0, 1fr));`" v-for="sub in d.SubMenu" :key="`sub-${sub.SupSidebarMenuId}`">
                        <div class="col-span-1 flex items-center pl-4">
                            {{sub.SidebarName}}
                        </div>
                        <div v-for="sp in sub.Permissions" class="col-span-1 ">
                            <div class="flex flex-col w-fit gap-1 my-4">
                                <h1>{{ sp.SidebarName }}</h1>
                                <input 
                                    type="checkbox" 
                                    class="toggle toggle-success"
                                    :checked="sp.Status === 'ON'"
                                    @change="handleChange($event , sp)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- permission with children -->
        <div v-else class="w-full">
            <div class="grid pb-4" :style="`grid-template-columns: repeat(${permissionMethod.length+1}, minmax(0, 1fr));`">
                <div class="col-span-1 h-full flex items-center">
                    {{ d.SidebarName }}
                </div>
                <div v-for="dp in d.Permissions" class="col-span-1">
                    <div class="flex flex-col w-fit gap-1">
                        <h1>{{ dp.SidebarName }}</h1>
                        <input 
                            type="checkbox" 
                            class="toggle toggle-success"
                            :checked="dp.Status === 'ON'"
                            @change="handleChange($event , dp)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>