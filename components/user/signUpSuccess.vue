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
                Register Success
            </h2>

            <p class="text-base mb-8">
                Please check your email to verify your account <br>
                We will redirect you to login page in {{ count }} seconds
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

    console.log(anim.value);

    setTimeout(() => {
        open.value = false;
        router.go(0);
    }, 5000);

    setInterval(() => {
        count.value--;
    }, 1000);
}


</script>