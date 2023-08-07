<template>
    <UModal v-model:modelValue="open" :transition="false" prevent-close>
        <div class="registerSuccessContainer flex flex-col p-5 text-center">
            <LottieAnimation
                ref="anim"
                :animation-data="SuccessAnimation"
                :loop="false"
                :auto-play="true"
                :speed="1"
                @complete="lottieComplete" />

            <h2 class="text-4xl text-green-500 uppercase mb-5">
                Login Success
            </h2>

            <p class="text-base mb-8">
                We will redirect you to dashboard page in {{ count }} seconds
            </p>
        </div>
    </UModal>
</template>

<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import SuccessAnimation from '@/assets/lottie/success.json'

const open = ref(true);
const anim = ref();

const router = useRouter();
const count = ref(5);

const lottieComplete = () => {
    setTimeout(async () => {
        open.value = false;
        await navigateTo('/dashboard')

        await refreshNuxtData()
    }, 5000);

    setInterval(() => {
        count.value--;
    }, 1000);
}


</script>