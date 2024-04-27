<script setup lang="ts">
const opened = ref(false);
</script>

<template>
    <div class="collapse">
        <div class="header">
            <slot name="header" />
            <button class="clean" @click="opened = !opened">
                <font-awesome-icon v-if="!opened" icon="fa-solid fa-plus" />
                <font-awesome-icon v-else icon="fa-solid fa-minus" />
            </button>
        </div>
        <div class="content" :class="{ opened }">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.collapse {
    padding: 1rem;
    border-radius: var(--base-radius);
    border: 1px solid var(--clr-accent);
    margin-bottom: 1rem;
    .header {
        font-weight: bold;
        font-size: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--clr-neutral-gray-blue);
    }
    .content {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 500ms;
        &:slotted(> *) {
            overflow: hidden;
        }

        &.opened {
            grid-template-rows: 1fr;
        }
    }
}
</style>