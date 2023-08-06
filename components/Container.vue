<template>
    <UContainer :ui="{ constrained: maxWidth }">
        <slot />
    </UContainer>
</template>

<script setup lang="ts">


defineProps({
    maxWidth: {
        type: String,
        default: 'max-w-5xl',
    }
})
</script>

<style scoped>

</style>