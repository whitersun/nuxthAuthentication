import {defineStore} from 'pinia'

export const useUser = defineStore({
    id: 'user-store',
    state: () => {
        return {
            currentUser: null,
            // currentUser: {
            //     id: '',
            //     email: '',
            //     username: '',
            //     avatar: '',
            //     created_at: '',
            //     updated_at: ''
            // },

            switchToForm: false 
        }
    },
    actions: {
        setUser(user: any) {

        }
    },
    getters: {
        getUser: state => state.currentUser
    }
})