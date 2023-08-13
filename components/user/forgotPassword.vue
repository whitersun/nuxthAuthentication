<script setup lang="ts">
import { object, string, InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxthq/ui/dist/runtime/types'

const email = ref('');
const formGroupLabelUI = 'block text-2xl uppercase mb-2 font-medium text-gray-700 dark:text-gray-200';

type Schema = InferType<typeof schema>

const state = ref({
    email: undefined,
})

const schema = object({
    email: string().email('Invalid email').required('Required').test((value) => {
        console.log(value);
    }),
})

const emits = defineEmits<{ (e: 'changeToLogin'): void }>();
const switchUserToLogin = () => emits('changeToLogin');


async function submit (event: FormSubmitEvent<Schema>) {
    // Do something with event.data

    console.log(event);
}

</script>


<style lang="scss" scoped>

.containerWrapper {
    .forgotPasswordFormHeaderTitle {
        font-size: 42px;
        font-weight: 400;
        margin-bottom: 2px;

        text-transform: uppercase;
        line-height: 62px;

        @media screen and (width < 768px) {
            font-size: 42px;
            line-height: 52px;
        }
    }

    .forgotPasswordFormHeaderSubtitle {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 32px;

        @media screen and (width < 576px) {
            font-size: 18px;
            line-height: 22px;
        }
    }

    .forgotPasswordFormBodyInput {
        label {
            font-size: 18px;
        }
    }
}

</style>

<template>
    <div class="containerWrapper w-full">
        <UButton @click="switchUserToLogin" class="mb-3" icon="i-mdi-chevron-left" size="sm" color="primary" variant="solid" label="Return Login" :trailing="false" />

        <div class="forgotPasswordFormHeader">
            <h1 class="forgotPasswordFormHeaderTitle">Forgot Password</h1>
            <p class="forgotPasswordFormHeaderSubtitle">Enter your email address to reset your password</p>
        </div>

        <div class="block mt-4">            
            <UForm
                    :schema="schema"
                    :state="state"
                    @submit.prevent="submit"
                >
                    <UFormGroup
                        size="xl"
                        label="Email"
                        name="email"
                        color="green"
                        class="forgotPasswordFormBodyInput mb-5"
                        help="This is a nice email!"
                        :ui="{ 'label': { 'base': formGroupLabelUI } }"
                    >
                        <UInput 
                            v-model="email"
                            type="email"
                            color="green" variant="outline" size="xl"
                            placeholder="you@example.com"
                            icon="i-mdi-email-arrow-right" />


                    </UFormGroup>


                    <UButton
                        block
                        color="green"
                        label="Send verification email"
                        size="xl"
                        type="submit"
                        class="forgotPasswordFormBodyButton uppercase"
                        :ui="{ 'font': 'font-medium' }"
                        :loading="false">
                    </UButton>
            </UForm>
        </div>
    </div>
</template>
