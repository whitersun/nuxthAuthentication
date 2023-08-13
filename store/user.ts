import {defineStore} from 'pinia'
import { useLocalStorage } from '@vueuse/core'


export const useUser = defineStore('user', () => {
    const currentUser = ref(
        useLocalStorage('VueUseUser', null)
    );

    const switchToForm = ref('login');

    const saveUser = (user: any) => {
        currentUser.value = user;
        return currentUser.value;
    }

    const getSwitchChange = computed(() => switchToForm.value);

    return {
        currentUser,
        switchToForm,

        // Actions
        saveUser
    }
})