<template>
    <UModal v-model:modelValue="isOpen">
        <UCard class="relative block" :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            
            <UButton color="gray" variant="ghost" class="absolute top-6 right-6 -my-1" @click="closeError">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.586l4.95-4.95l1.415 1.415l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.95 4.95l-1.413-1.415l4.95-4.95l-4.95-4.95L7.05 5.638l4.95 4.95Z"/></svg>
            </UButton>


            <div class="errorContainer flex flex-col p-5 text-center">
                <LottieAnimation
                    ref="anim"
                    :animation-data="ErrorAnimation"
                    :loop="true"
                    :auto-play="true"
                    :speed="1"
                    style="width: 100%; height: 420px"
                />
    
                <h2 class="text-4xl text-green-500 uppercase mb-5">
                    Oops!
                </h2>
    
                <p class="text-base mb-8">
                    Email or password is incorrect <br>
                </p>
            </div>
        </UCard>

    </UModal>
</template>

<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import ErrorAnimation from '@/assets/lottie/error.json'

const isOpen = ref(true);
const anim = ref();


const emit = defineEmits<{ (e: 'closeError', isOpen: boolean): void }>();
const closeError = () => {
    isOpen.value = false
    emit('closeError', isOpen.value)
}
</script>