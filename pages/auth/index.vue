<style lang="scss" scoped>

.formContainer {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    width: 100%;
    height: 100%;

    --animation-duration: 300ms;
    --animation-timing-function: ease-in-out;

    @mixin fadeAnimation () {
        position: absolute;
        top: 50%;
        left: 50%;

        width: 100%;
        transform: translate(-50%, -50%);
    }

    .fadeCustomIn {
        @include fadeAnimation();
    
        animation: fadeInCustom var(--animation-duration) var(--animation-timing-function);
        @keyframes fadeInCustom {
            0% {
                opacity: 0;
                filter: blur(1rem);
                transform: translate(10rem, -50%);
            }
            100% {
                opacity: 1;
                filter: blur(0rem);
                transform: translate(-50%, -50%)
            }
            
        }
    }

    .fadeCustomOut {

        @include fadeAnimation();

        animation: fadeOutCustom var(--animation-duration) var(--animation-timing-function);
        @keyframes fadeOutCustom {
            0% {
                opacity: 1;
                filter: blur(0rem);
                transform: translate(-50%, -50%);
            }
            100% {
                opacity: 0;
                filter: blur(1rem);
                transform: translate(-100%, -50%);
            }
            
        }
    }
}

</style>

<template>
    <Container>
        <div class="sectionContainer w-full h-screen">
            <div class="flex justify-center h-full">
                <div class="container mt-5" v-if="user">
                    <h1 class="text-xl">Page: <strong>index</strong></h1>
                    <h2 class="text-xl">
                        <strong>
                            {{ user.username }}
                            {{ user.email }}
                        </strong>
                    </h2>
                </div>

                <!-- <div class="grid place-items-center w-full h-[100svh] py-8" v-else> -->
                <div ref="formElement" class="flex items-start justify-start w-full h-screen" v-else>
                    <div class="formContainer max-w-lg w-full mx-auto relative">
                        <transition enter-active-class="fadeCustomIn" leave-active-class="fadeCustomOut">
                            <LazyUserLogin v-if="!stateSwitch" @changeTo="switchUserForm" />
                            <LazyUserRegister v-else @changeTo="switchUserForm" />
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </Container>
</template>

<script lang="ts" setup>
import { stateStore } from '@/utils/hookStore'

useHead({
    title: 'Auth Page'
})

const currentUser: any = ref({});
const user = computed(() => {
    if (Object.keys(currentUser.value).length !== 0) {
        return currentUser.value
    } else {
        return null
    }
});

const { stateSwitch } = stateStore();

const switchUserForm = () => {
    stateSwitch.value = !stateSwitch.value;
    return stateSwitch.value;
}

</script>
