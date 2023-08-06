<script setup lang="ts">
import { stateStore } from '@/utils/hookStore';
const { user } = stateStore();

const decidedLayout = () => {
    if (user.value) {
        return 'dashboard'
    } else {
        return 'authentication'
    }
}

const layout = decidedLayout();

const LazyAuthentication = defineAsyncComponent(() => import('@/pages/auth/index.vue'));
const LazyDashboard = defineAsyncComponent(() => import('@/pages/dashboard/index.vue'));

</script>

<template>
    <ClientOnly>
        <template #fallback>
            <div class="flex justify-center relative h-screen">
                <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Loading...</h1>
            </div>
        </template>

        <LazyAuthentication v-if="layout === 'authentication'" />
        <LazyDashboard v-if="layout === 'dashboard'" />
        
    </ClientOnly>
</template>

<style scoped>

</style>