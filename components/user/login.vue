<style lang="scss" scoped>
.otherwise span {
    display: block;
    width: 100%;

    position: relative;

    &::before,
    &::after {
        content: '';
        display: block;
        width: 40%;
        height: 1px;

        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        background: #888888;
    }

    &::before {
        left: 0;
        margin-right: 1rem;
    }

    &::after {
        right: 0;
        margin-left: 1rem;
    }
}
</style>

<template>
    <div class="containerWrapper w-full">
        <div class="block mt-4 ps-0 sm:ps-3">
            <h3 class="text-4xl sm:text-3xl text-center sm:text-start mt-2 mb-8 sm:mb-9 capitalize">Please login to continue</h3>
            
            <form method="POST" @submit.prevent="handleLogin">
                <UFormGroup
                    label="Email"
                    class="mb-3"
                    size="md"
                    help="We will never share your email with anyone else."
                    :error="errorEmail ? 'Not a valid email address.' : false"
                    :ui="{ 'label': { 'base': formGroupLabelUI } }">
                    <UInput type="email" v-model:model-value="login.email" color="green" variant="outline" size="xl" placeholder="you@gmail.com" />
                </UFormGroup>

                <UFormGroup
                    label="Password"
                    class="mb-3"
                    size="md"
                    help="Please Enter Your Password."
                    :error="errorPassword ? 'Not a valid password' : false"
                    :ui="{ 'label': { 'base': formGroupLabelUI } }">
                    <UInput ref="inputPassword" v-model:model-value="login.password" class="relative" type="password" color="green" variant="outline" size="xl" placeholder="********">
                        <button class="block absolute top-1/2 -translate-y-1/2 right-3" @click="showPassword">
                            <svg class="icon close" :class="showPw ? 'hidden' : 'block'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22.295 6.31a.75.75 0 0 1 .394.986L22 7l.69.296v.001l-.002.003l-.003.007l-.01.024l-.039.084a13.858 13.858 0 0 1-.727 1.321a15.053 15.053 0 0 1-1.846 2.394l.968.969a.75.75 0 0 1-1.06 1.06l-1.001-1a11.548 11.548 0 0 1-2.274 1.497l.934 1.435a.75.75 0 1 1-1.258.818l-1.089-1.674c-.78.255-1.623.428-2.532.49V16.5a.75.75 0 0 1-1.5 0v-1.775a10.46 10.46 0 0 1-2.46-.466l-1.074 1.65a.75.75 0 1 1-1.258-.818l.913-1.402a11.503 11.503 0 0 1-2.293-1.49l-.96.96a.75.75 0 0 1-1.061-1.06l.924-.924A15.03 15.03 0 0 1 1.514 7.72a9.524 9.524 0 0 1-.188-.388l-.01-.025l-.004-.007v-.003H1.31L2 7l-.69.296a.75.75 0 0 1 1.379-.592v.002l.007.014l.029.063a12.39 12.39 0 0 0 .65 1.177c.475.76 1.197 1.747 2.18 2.662c.867.805 1.928 1.546 3.197 2.034A8.97 8.97 0 0 0 12 13.25a8.963 8.963 0 0 0 3.312-.619c1.262-.497 2.316-1.243 3.175-2.049a13.303 13.303 0 0 0 2.789-3.8l.028-.063l.006-.013v-.001m.985-.394a.75.75 0 0 0-.984.394l.984-.394ZM2.69 6.704Z" clip-rule="evenodd"/></svg>
                            <svg class="icon open" :class="!showPw ? 'hidden' : 'block'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M10 22c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 18.771 2 15m20 0c0 3.771 0 4.657-1.172 5.828C19.657 22 17.771 22 14 22m0-20c3.771 0 5.657 0 6.828 1.172C22 4.343 22 5.229 22 9M10 2C6.229 2 4.343 2 3.172 3.172C2 4.343 2 5.229 2 9"/><path d="M5.892 14.06C5.297 13.37 5 13.025 5 12c0-1.025.297-1.37.892-2.06C7.08 8.562 9.072 7 12 7c2.927 0 4.92 1.562 6.108 2.94c.595.69.892 1.035.892 2.06c0 1.025-.297 1.37-.892 2.06C16.92 15.438 14.928 17 12 17c-2.927 0-4.92-1.562-6.108-2.94Z"/><circle cx="12" cy="12" r="2"/></g></svg>
                        </button>
                    </UInput>
                </UFormGroup>

                <div class="flex flex-row items-center justify-between w-full mb-3">
                    <UCheckbox
                        color="green"
                        label="Remember me"
                        v-model:model-value="login.remember"
                        name="remember"
                        :ui="{ 'label': { 'base': 'text-gray-700 dark:text-gray-200' } }"
                    />

                    <UButton to="" variant="link">Forget Password?</UButton>
                </div>

                <UButton
                    block
                    color="green"
                    label="Login"
                    size="xl"
                    type="submit"
                    :ui="{ 'block': true }">
                
                    <template #trailing>
                        <UIcon name="i-heroicons-arrow-right-20-solid" />
                    </template>
                </UButton>

                <div class="otherwise my-5 text-center">
                    <span>Or</span>
                </div>

                <!-- Social Login -->
                <div class="socialLogin grid grid-cols-1 sm:grid-cols-3 items-center gap-2 sm:gap-5">
                    <UButton
                        block
                        color="white"
                        label="Facebook"
                        size="xl"
                        :ui="{ 'block': true }"
                        @click="loginWithFacebook">
                    
                        <template #leading>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.307 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.347-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.958 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165h29.825"/></svg>
                        </template>
                    </UButton>

                    <UButton
                        block
                        color="white"
                        label="Google"
                        size="xl"
                        :ui="{ 'block': true,}">
                    
                        <template #leading>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 128 128"><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38z"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21z"/><path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9z"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4z"/></svg>
                        </template>
                    </UButton>

                    <UButton
                        block
                        color="black"
                        label="Github"
                        size="xl"
                        :ui="{ 'block': true,}"
                        class="text-white"
                        @click="githubLogin">
                    
                        <template #leading>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#161616" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
                        </template>
                    </UButton>
                </div>

                <div class="flex flex-row items-center justify-center mt-3">
                    <span class="text-gray-700 dark:text-gray-200 mr-2">Don't have an account?</span>
                    <UButton @click="changeToRegister" variant="link">Create an account</UButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUser } from '@/store/user'
import { storeToRefs } from 'pinia';

const store = useUser();

const { currentUser } = storeToRefs(store);

const errorEmail = ref();
const errorPassword = ref();
const emit =  defineEmits(['changeTo']);

const changeToRegister = () => {
    emit('changeTo');
}

const login = ref({
    email: '',
    password: '',
    remember: false,
})

const formGroupLabelUI = 'block text-lg font-medium text-gray-700 dark:text-gray-200';


const showPw = ref(false);
const inputPassword  = ref();
const showPassword = () => {

    showPw.value = !showPw.value;

    if (showPw.value) {
        inputPassword.value
            ?.input.setAttribute('type', 'text');
    } else {
        inputPassword.value
            ?.input.setAttribute('type', 'password');
    }
}

const handleLogin = async () => {
    const response = useFetch('/api/auth/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login.value)
    });

    const result = await response.data;
    console.log('result: ', result.value);
    
}

const loginWithFacebook = async () => {
}

const githubLogin = async () => {
}
</script>

<style lang="scss" scoped>

</style>