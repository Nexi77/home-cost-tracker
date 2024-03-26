<script setup lang="ts">
interface  Props {
    variant: 'success' | 'accent'
}

withDefaults(defineProps<Props>(), {
    variant: 'success',
});
</script>

<template>
    <div class="alert" :class="variant">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.alert {
    --border-color: '';
    --bg-color: '';
    border: 3px solid var(--border-color);
    background-color: var(--bg-color);
    padding: 0.5rem 0.8rem;
    &.success {
        --border-color: var(--clr-primary-green);
        --bg-color: var(--clr-primary-green-alpha);
    }
    &.accent {
        --border-color: var(--clr-accent);
        --bg-color: var(--clr-accent-alpha);
    }
}
</style>