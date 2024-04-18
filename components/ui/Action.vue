<script setup lang="ts">
interface Props {
    type?: "button" | "submit" | "reset"
    variant?: "primary" | "accent" | "error",
    kind?: "button" | "link",
    href?: string;
    isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {
    variant: 'primary',
    kind: 'button',
    isLoading: false
});
</script>

<template>
    <button :type="type" class="action" :class="variant" v-if="kind === 'button'">
        <AtomsLoader v-if="isLoading" />
        <slot v-else />
    </button>
    <NuxtLink v-else :to="href" class="action" :class="variant">
        <AtomsLoader v-if="isLoading" />
        <slot v-else />
    </NuxtLink>
</template>

<style lang="scss" scoped>
.action {
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: inset 0px -16px 14px -22px rgb(0, 0, 0);
    text-align: center;
    color: var(--clr-white);
    transition: transform .2s ease-in-out;
    font-weight: 500;
    border: 0;
    border-radius: var(--base-radius);
    padding: 1rem;
    cursor: pointer;
    display: flex;
    white-space: nowrap;
    gap: 10px;
    align-items: center;
    justify-content: center;

    &.primary {
        background-color: var(--clr-primary-green);
    }

    &.accent {
        background-color: var(--clr-accent);
    }

    &.error {
        background-color: var(--clr-primary-red);
    }
    
    &:focus, &:hover {
        box-shadow: 0 0 4px var(--clr-neutral-blue) inset;
        transform: translateY(-0.1em);
        outline-color: var(--clr-neutral-blue);
    }
}
</style>