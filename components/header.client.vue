<script setup lang="ts">
import { useUiStore } from '~/stores/ui';
const uiStore = useUiStore();
</script>

<template>
    <header>
        <button type="button" title="Click to open the menu" @click="uiStore.menuOpened = !uiStore.menuOpened">
            <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
        <OrganismProfile />
    </header>
</template>

<style lang="scss" scoped>
header {
    background-color: var(--clr-white);
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;

    button {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        font-size: 1.3rem;
        display: none;
        @media screen and (max-width: 768px) {
            display: inline-block;
        }
    }
}
</style>