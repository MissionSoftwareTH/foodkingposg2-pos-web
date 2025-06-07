<template>
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-sm text-sm w-28">
            {{ selectedLanguage }}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-down"
            >
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </label>
        <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
            <li v-for="lang in languages" :key="lang.value">
                <input type="radio" name="theme" :value=lang.value :aria-label=lang.label class="theme-controller btn btn-sm justify-start mb-2" @click="changeLanguage(lang)"></input>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import controllerUI from '../services/utils/controllerUI.ts'
import { languages, type LanguageCode } from "../constants/language.ts";
import { useAppSetupStore } from "../store/appSetupStore.ts";

const UIStore = useAppSetupStore();
const getLanguageDetail = (code:LanguageCode) => {
    if(code === "th") return languages.th;
    if(code === "en") return languages.en;
    return undefined;
}

const selectedLanguage = ref<string>(getLanguageDetail(UIStore.locale as LanguageCode)?.label || '');

const changeLanguage = (lang: { label: string, value: string }) => {
    selectedLanguage.value = lang.label
    // TODO: Implement i18n logic here, e.g., using vue-i18n
    console.log(`Language changed to ${lang.value}`);
    controllerUI.setLocale(lang.value)
};

onMounted(() => {
    controllerUI.setLocale(UIStore.locale)
})

</script>
