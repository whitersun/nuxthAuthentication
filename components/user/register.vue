import { LazyUserRegisterSuccess } from '../../.nuxt/components';
<style lang="scss" scoped>
.otherwise span {
    display: block;
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
            <h3 class="text-4xl text-center sm:text-start mt-2 mb-8 sm:mb-9 capitalize">Create your account now</h3>
            <UForm
                ref="form"
                method="POST"
                :schema="schema"
                :state="state"
                @submit.prevent="callBackSubmit()"
            >
                <div class="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-3">
                    <UFormGroup
                        name="fullname"
                        label="Fullname"
                        class="mb-3"
                        size="md"
                        :error="error.email"
                        :ui="{ 'label': { 'base': formGroupLabelUI } }">
                        <UInput
                            size="xl"
                            type="text"
                            color="green"
                            variant="outline"
                            placeholder="Sunwoo Jun"
                            v-model:model-value="state.fullname"
                            trailing-icon="i-heroicons-exclamation-triangle-20-solid"
                        />
                    </UFormGroup>

                    <UFormGroup
                        name="username"
                        label="Username"
                        class="mb-3"
                        size="md"
                        :ui="{ 'label': { 'base': formGroupLabelUI } }">
                        <UInput type="text" v-model:model-value="state.username" color="green" variant="outline" size="xl" placeholder="Sunwoo Jun" />
                    </UFormGroup>
                </div>

                <UFormGroup
                    name="email"
                    label="Email"
                    class="mb-3"
                    size="md"
                    help="Please Enter Your Email."
                    :error="error.email"
                    :ui="{ 'label': { 'base': formGroupLabelUI } }">
                    <UInput type="email" v-model:model-value="state.email" color="green" variant="outline" size="xl" placeholder="you@example.com" />
                </UFormGroup>

                <UFormGroup
                    name="password"
                    label="Password"
                    class="mb-3"
                    size="md"
                    help="Please Enter Your Password."
                    :ui="{ 'label': { 'base': formGroupLabelUI } }">
                    <UInput ref="passwordInput" v-model:model-value="state.password" class="relative" type="password" color="green" variant="outline" size="xl" placeholder="********">
                        <button type="button" class="block absolute top-1/2 -translate-y-1/2 right-3" @click.prevent="callBackShowHidePassword">
                            <svg class="icon close" :class="showPassword ? 'hidden' : 'block'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M22.295 6.31a.75.75 0 0 1 .394.986L22 7l.69.296v.001l-.002.003l-.003.007l-.01.024l-.039.084a13.858 13.858 0 0 1-.727 1.321a15.053 15.053 0 0 1-1.846 2.394l.968.969a.75.75 0 0 1-1.06 1.06l-1.001-1a11.548 11.548 0 0 1-2.274 1.497l.934 1.435a.75.75 0 1 1-1.258.818l-1.089-1.674c-.78.255-1.623.428-2.532.49V16.5a.75.75 0 0 1-1.5 0v-1.775a10.46 10.46 0 0 1-2.46-.466l-1.074 1.65a.75.75 0 1 1-1.258-.818l.913-1.402a11.503 11.503 0 0 1-2.293-1.49l-.96.96a.75.75 0 0 1-1.061-1.06l.924-.924A15.03 15.03 0 0 1 1.514 7.72a9.524 9.524 0 0 1-.188-.388l-.01-.025l-.004-.007v-.003H1.31L2 7l-.69.296a.75.75 0 0 1 1.379-.592v.002l.007.014l.029.063a12.39 12.39 0 0 0 .65 1.177c.475.76 1.197 1.747 2.18 2.662c.867.805 1.928 1.546 3.197 2.034A8.97 8.97 0 0 0 12 13.25a8.963 8.963 0 0 0 3.312-.619c1.262-.497 2.316-1.243 3.175-2.049a13.303 13.303 0 0 0 2.789-3.8l.028-.063l.006-.013v-.001m.985-.394a.75.75 0 0 0-.984.394l.984-.394ZM2.69 6.704Z" clip-rule="evenodd"/></svg>
                            <svg class="icon open" :class="!showPassword ? 'hidden' : 'block'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M10 22c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 18.771 2 15m20 0c0 3.771 0 4.657-1.172 5.828C19.657 22 17.771 22 14 22m0-20c3.771 0 5.657 0 6.828 1.172C22 4.343 22 5.229 22 9M10 2C6.229 2 4.343 2 3.172 3.172C2 4.343 2 5.229 2 9"/><path d="M5.892 14.06C5.297 13.37 5 13.025 5 12c0-1.025.297-1.37.892-2.06C7.08 8.562 9.072 7 12 7c2.927 0 4.92 1.562 6.108 2.94c.595.69.892 1.035.892 2.06c0 1.025-.297 1.37-.892 2.06C16.92 15.438 14.928 17 12 17c-2.927 0-4.92-1.562-6.108-2.94Z"/><circle cx="12" cy="12" r="2"/></g></svg>
                        </button>
                    </UInput>
                </UFormGroup>

                <UButton
                    block
                    color="green"
                    label="Register"
                    size="xl"
                    type="submit"
                    :ui="{ 'block': true }">
                
                    <template #trailing>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="m15.06 5.283l5.657 5.657a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 0 1-2.122-2.122l3.096-3.096H4.5a1.5 1.5 0 0 1 0-3h11.535L12.94 7.404a1.5 1.5 0 0 1 2.122-2.121Z"/></g></svg>
                    </template>
                </UButton>

                <div class="otherwise my-5 text-center">
                    <span>Or</span>
                </div>

                <div class="flex flex-row items-center justify-center mt-3">
                    <span class="text-gray-700 dark:text-gray-200 mr-2">You have an account?</span>
                    <UButton @click="emitSwitchTo" variant="link">Login now</UButton>
                </div>
            </UForm>
        </div>

        <template v-if="registerSuccess === true">
            <LazyUserSignUpSuccess />
        </template>
    </div>
</template>

<script setup lang="ts">
import { 
    formValidate,
    registerTypes, 
    showHidePassword, 
    loginWithFacebook, 
    signUpHandler,
} from './handlerRegister';

const formGroupLabelUI = 'block text-lg font-medium text-gray-700 dark:text-gray-200';

// TODO: declare types for emit
const emit = defineEmits(['changeTo']);
const emitSwitchTo = () => emit('changeTo');

// TODO: declare types for state models
const { state, form, error, registerSuccess } = registerTypes();

// TODO: declare types for form validate
const { schema } = formValidate();


// TODO: show/hide password
const passwordInput = ref();
const showPassword = ref(false);

const callBackShowHidePassword = () => {
    return showHidePassword(passwordInput, showPassword);
}

const callBackSubmit = async () => {
    const response: any = await signUpHandler(form);
    if (response.register === 'success') {
        registerSuccess.value = response.modal;
    }
}


</script>

<style lang="scss" scoped>

</style>